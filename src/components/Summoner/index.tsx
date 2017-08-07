import * as React from 'react'
import { graphql, QueryRenderer } from 'react-relay'

import environment from '~src/environment'

import LoadingSpinner from '~components/shared/LoadingSpinner'
import Summoner from './Summoner'

interface Props {
  region: string
}

export default ({ region }: Props) => (
  <QueryRenderer
      environment={environment}
      query={graphql`
        query SummonerQuery {
          summoner(account_id: 202610818, region: NA) {
            meta {
              ...Profile_meta
            }
            overview(season: SEASON2017) {
              ...Profile_overview
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }: any) => {
        if (error)
          return <div>{error.message}</div>
        
        if (props) {
          const { meta, overview } = props.summoner
          console.log(props)
          return <Summoner region={region} meta={meta} overview={overview} />
        }

        return <LoadingSpinner />
      }}
    />
) 

