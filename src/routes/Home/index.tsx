import * as React from 'react';
import Home from './Home';

interface ActionArgs {
  next: () => Promise<any>,
  query: {[key: string]: string},
  params: {[key: string]: string},
}

export default {

  path: '/',

  async action({ params, query }: ActionArgs) {
    return {
      title: 'Home',
      description: 'League Analytics Platform',
      component: <Home {...params} {...query} />,
    }
  },

}

