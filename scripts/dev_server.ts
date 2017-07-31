/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */

import * as path from 'path'
import * as browserSync from 'browser-sync'
import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfigFunc from '../webpack.config'

const webpackConfig = webpackConfigFunc({ DEBUG: true })

const watchOptions = {}

const format = (time: Date) => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')

const createCompilationPromise =
  (name: string , compiler: webpack.Compiler, config: webpack.Configuration) => {
    return new Promise((resolve, reject) => {
      let timeStart = new Date()
      compiler.plugin('compile', () => {
        timeStart = new Date()
        console.info(`[${format(timeStart)}] Compiling '${name}'...`)
      })
      compiler.plugin('done', stats => {
        console.info(stats.toString(config.stats))
        const timeEnd = new Date()
        const time = timeEnd.getTime() - timeStart.getTime()
        if (stats.hasErrors()) {
          console.info(
            `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
          )
          reject(new Error('Compilation failed!'))
        } else {
          console.info(
            `[${format(
              timeEnd,
            )}] Finished '${name}' compilation after ${time} ms`,
          )
          resolve(stats)
        }
      })
    })
  }

async function start() {
  const server = express()
  server.use(express.static(path.resolve(__dirname, '../public')))

  // Configure client-side hot module replacement
  const clientConfig: webpack.Configuration = webpackConfig.find(config => config.name === 'client') || {}
  let ce: any = clientConfig.entry
  ce.client = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=client&reload=true',
      ce.client
  ]

  let use = (clientConfig as any).module.rules[0].use
  use = ['react-hot-loader/webpack'].concat(use || []);

  if (!clientConfig.plugins)
    clientConfig.plugins = []

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  )

  // Configure server-side hot module replacement
  const serverConfig: webpack.Configuration = webpackConfig.find(config => config.name === 'server') || {}
  if (!serverConfig.output)
    serverConfig.output = {}

  serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
  serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

  if (!serverConfig.plugins)
    serverConfig.plugins = []

  serverConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  )

  // Configure compilation
  const multiCompiler: any = webpack(webpackConfig)
  const clientCompiler: webpack.Compiler = multiCompiler.compilers.find(
    (compiler: webpack.Compiler) => compiler.name === 'client',
  )
  const serverCompiler: webpack.Compiler = multiCompiler.compilers.find(
    (compiler: webpack.Compiler) => compiler.name === 'server',
  )
  const clientPromise = createCompilationPromise(
    'client',
    clientCompiler,
    clientConfig,
  )
  const serverPromise = createCompilationPromise(
    'server',
    serverCompiler,
    serverConfig,
  )

  server.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: (clientConfig.output && clientConfig.output.publicPath) || '',
      quiet: true,
      watchOptions
    }),
  )

  // https://github.com/glenjamin/webpack-hot-middleware
  server.use(webpackHotMiddleware(clientCompiler, { log: false }))

  let appPromise: any
  let appPromiseResolve: any
  let appPromiseIsResolved = true
  serverCompiler.plugin('compile', () => {
    if (!appPromiseIsResolved) return
    appPromiseIsResolved = false
    appPromise = new Promise(resolve => (appPromiseResolve = resolve))
  })

  let app: any
  server.use((req, res) => {
    appPromise
      .then(() => app.handle(req, res))
      .catch((error: Error) => console.error(error))
  })

  function checkForUpdate(fromUpdate: boolean) {
    const hmrPrefix = '[\x1b[35mHMR\x1b[0m] '
    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`)
    }
    if (app.hot.status() !== 'idle') {
      return Promise.resolve()
    }
    return app.hot
      .check(true)
      .then((updatedModules: any) => {
        if (!updatedModules) {
          if (fromUpdate) {
            console.info(`${hmrPrefix}Update applied.`)
          }
          return
        }
        if (updatedModules.length === 0) {
          console.info(`${hmrPrefix}Nothing hot updated.`)
        } else {
          console.info(`${hmrPrefix}Updated modules:`)
          updatedModules.forEach((moduleId: string) =>
            console.info(`${hmrPrefix} - ${moduleId}`),
          )
          checkForUpdate(true)
        }
      })
      .catch((error: Error) => {
        if (['abort', 'fail'].includes(app.hot.status())) {
          console.warn(`${hmrPrefix}Cannot apply update - ${app.hot}`)
          delete require.cache[require.resolve('../build/server')]
          // eslint-disable-next-line global-require, import/no-unresolved
          app = require('../build/server').default
          console.warn(`${hmrPrefix}App has been reloaded.`)
        } else {
          console.warn(
            `${hmrPrefix}Update failed: ${error.stack || error.message}`,
          )
        }
      })
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      checkForUpdate(false).then(() => {
        appPromiseIsResolved = true
        appPromiseResolve()
      })
    }
  })

  // Wait until both client-side and server-side bundles are ready
  await clientPromise
  await serverPromise

  const timeStart = new Date()
  console.info(`[${format(timeStart)}] Launching server...`)

  // Load compiled src/server.js as a middleware
  // eslint-disable-next-line global-require, import/no-unresolved
  app = require('../build/server').default
  appPromiseIsResolved = true
  appPromiseResolve()

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) =>
    (browserSync as any).create().init({
        // https://www.browsersync.io/docs/options
        server: 'src/server.tsx',
        middleware: [server],
      },
      (error: Error, bs: browserSync.BrowserSyncInstance) => (error ? reject(error) : resolve(bs)),
    ),
  )

  const timeEnd = new Date()
  const time = timeEnd.getTime() - timeStart.getTime()
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`)
}

function run(fn: () => Promise<any>) {
  const start = new Date();
  console.info(`[${format(start)}] Starting dev_server...`)

  return fn().then((resolution: any) => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.info(`[${format(end)}] Finished dev_server after ${time} ms`)
    return resolution
  });
}

run(start).catch((err: Error) => {
  console.error(err.stack)
  process.exit(1)
});