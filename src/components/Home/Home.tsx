import * as React from 'react'
import * as styles from './Home.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Rank from '~components/Summoner/Rank'

const {
  QueryRenderer,
  graphql,
} = require('react-relay');
const environment = require('../environment');

interface Props {
  region: string
}

const Home = (props: Props) => (
  <div className={`container ${styles.home}`}>
    <div className="row">
      Legends.ai - {props.region}
    </div>
    <QueryRenderer
      environment={environment}
      query={graphql`
        query HomeQuery {
          summoner(account_id: 202610818, region: NA) {
            rankings {
              current_league_positions {
                ...Rank_position
              }
            }
          }
        }
      `}
      render={({error, props}: any) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return (
            <div>
              <Rank position={props.summoner.rankings.current_league_positions[0]} />
            </div>
          );
        }
        return <div>Loading</div>;
      }}
    />;
  </div>
)

export default withStyles<Props>(styles)(Home)
