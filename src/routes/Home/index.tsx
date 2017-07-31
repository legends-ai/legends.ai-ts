import * as React from 'react';
import Home from './Home';
import { ActionArgs } from '~src/router'

export default {

  path: '/',

  async action({ params, query, region }: ActionArgs) {
    return {
      title: 'Home',
      description: 'League Analytics Platform',
      component: <Home region={region} />,
    }
  },

}

