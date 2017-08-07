import * as React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import environment from '~src/environment'

import LoadingSpinner from '~components/shared/LoadingSpinner'
import Summoner from './Summoner'

export default (
  <QueryRenderer
      environment={environment}
      query={graphql`
        query SummonerQuery {
          summoner(account_id: 202610818, region: NA) {
            ...Profile_meta
            ...Profile_overview
          }
        }
      `}
      variables={{}}
      render={({ error, props }: any) => {
        if (error)
          return <div>{error.message}</div>
        
        if (props)
          return <Summoner />

        return <LoadingSpinner />
      }}
    />
) 

