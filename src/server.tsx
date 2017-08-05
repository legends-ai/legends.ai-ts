import * as koa from 'koa'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import * as koaServe from 'koa-static'
import * as maxmind from 'maxmind'
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { DEFAULT_REGION, GEOLITE_PATH, PORT } from '~src/config'
import geomap from '~src/geomap'
import universalRouter from '~src/router'

import App from '~components/App'
import Html from '~components/Html'

// import type
import { Style } from 'isomorphic-style-loader/lib/withStyles'

// import client assets
let assets = require('./assets') as any

const app = new koa()
const router = new koaRouter()
const geolite = maxmind.openSync(GEOLITE_PATH)

router.get('/ping', ctx => ctx.response.status = 200)

app
  .use(koaServe(__dirname + '/public'))
  .use(koaBodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const css = new Set()

    // Only needed for isomorphic-style-loader
    const context = {
      insertCss: (...styles: Style[]) => {
        styles.forEach(style => css.add(style._getCss()))
      },
    }

    const geo = geolite.get(ctx.request.ip.split(':').slice(-1)[0])
    let region = (geo && geo.country && geomap[geo.country.iso_code]) || DEFAULT_REGION

    const route = await universalRouter.resolve({
      path: ctx.path, query: ctx.query, region
    })

    const data = {
      ...route,
      script: assets.client.js,
      children: ReactDOM.renderToString(
        <App context={context}>{route.component}</App>
      ),
      style: [...css].join(''),
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

    ctx.status = 200
    ctx.body = `<!doctype html>${html}`
  })

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/`)
})
