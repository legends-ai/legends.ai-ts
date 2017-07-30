import * as React from 'react'
import Layout from '~components/Layout'

interface ActionArgs {
  next: () => Promise<any>,
  query: {[key: string]: string},
  params: {[key: string]: string},
}

// The top-level (parent) route
export default {
  path: [
    '/:region',
    '/',
  ],

  async action({ next, query, params }: ActionArgs) {
    const route = await next();

    route.title = `${route.title || ''} | Legends.ai`
    route.description = route.description || ''
    route.component = (
      <Layout params={params}>
        {route.component}
      </Layout>
    )

    return route;
  },

  // Keep in mind, routes are evaluated in order
  children: [
    require('./Home').default,
  ],
  
}

