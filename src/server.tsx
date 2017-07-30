import * as koa from 'koa'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import * as koaServe from 'koa-static'
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { port } from '~src/config'
import universalRouter from '~src/router'

import App from '~components/App'
import Html from '~components/Html'

// import type
import { Style } from 'isomorphic-style-loader/lib/withStyles'

// import client assets
let assets = require('./assets') as any

const app = new koa()
const router = new koaRouter()

router.get('/ping', ctx => ctx.response.status = 200)

app
  .use(koaServe(__dirname + '/public'))
  .use(koaBodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const css = new Set()

    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles: Style[]) => {
        styles.forEach(style => css.add(style._getCss()))
      },
    }

    const route = await universalRouter.resolve({ path: ctx.path, query: ctx.query })
    const data = {
      ...route,
      style: [...css].join(''),
      script: assets.js,
      children: ReactDOM.renderToString(
        <App context={context}>{route.component}</App>
      ),
    }
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

    ctx.status = 200
    ctx.body = `<!doctype html>${html}`
  })

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`)
})