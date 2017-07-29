import * as koa from 'koa'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaRouter from 'koa-router'
import * as koaServe from 'koa-static'
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { port } from '~src/config'

import App from '~components/App'
import Html from '~components/Html'

const app = new koa()
const router = new koaRouter()

router.get('/ping', ctx => ctx.response.status = 200)

app
  .use(koaServe(__dirname + '/public'))
  .use(koaBodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx, next) => {
    const data = {
      title: 'Legends.ai',
      description: 'The Most Advanced League Analytics Platform',
      children: ReactDOM.renderToString(<App />),
    }
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

    ctx.status = 200
    ctx.body = `<!doctype html>${html}`
  })

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`)
})