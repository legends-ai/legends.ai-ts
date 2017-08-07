import * as React from 'react'
import Layout from '~components/shared/Layout'
import { ActionArgs } from '~src/router'

// The top-level (parent) route
export default {
  path: [
    '/:region',
    '/',
  ],

  async action({ next, params }: ActionArgs) {
    const route = await next()

    route.title = `${route.title || ''} | Legends.ai`
    route.description = route.description || ''
    route.component = (
      <Layout params={params}>
        {route.component}
      </Layout>
    )

    return route
  },

  // Keep in mind, routes are evaluated in order
  children: [
    require('./Summoner').default,
  ],
  
}
