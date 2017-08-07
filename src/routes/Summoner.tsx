import * as React from 'react'
import Summoner from '~components/Summoner'
import { ActionArgs } from '~src/router'

export default {

  path: '/',

  async action({ params, query, region }: ActionArgs) {
    return {
      title: 'Summoner',
      description: 'Summoner',
      component: <Summoner region={region} />,
    }
  },

}

