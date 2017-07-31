import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as maxmind from 'maxmind'
import * as path from 'path'
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { DEFAULT_REGION, GEOLITE_PATH, PORT } from '~src/config'
import geomap from '~src/geomap'
import universalRouter from '~src/router'

import App from '~components/App'
import Html from '~components/Html'

import { Style } from 'isomorphic-style-loader/lib/withStyles'

// import client assets
let assets = require('./assets') as any

const app = express()
const geolite = maxmind.openSync(GEOLITE_PATH)

app.get('/ping', (req, res) => res.status(200))

app
  .use(express.static(path.resolve(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

app.get("*", async (req, res, next) => {
    const css = new Set()

    // Only needed for isomorphic-style-loader
    const context = {
      insertCss: (...styles: Style[]) => {
        styles.forEach(style => css.add(style._getCss()))
      },
    }

    const geo = geolite.get(req.ip.split(':').slice(-1)[0])
    let region = (geo && geo.country && geomap[geo.country.iso_code]) || DEFAULT_REGION

    const route = await universalRouter.resolve({
      path: req.path, query: req.query, region
    })

    const data = {
      ...route,
      script: assets.js,
      children: ReactDOM.renderToString(
        <App context={context}>{route.component}</App>
      ),
      style: [...css].join(''),
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

    res.status(200)
    res.send(`<!doctype html>${html}`)
  })

let moduleAny = module as any
if (!moduleAny.hot)
  app.listen(PORT, () => console.log(`The server is running at http://localhost:${PORT}/`))
else {
  (app as any).hot = moduleAny.hot
  moduleAny.hot.accept('./router')
}

export default app