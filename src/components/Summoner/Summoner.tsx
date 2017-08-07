import * as React from 'react'
import * as styles from './Summoner.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import Metadata from './Metadata'

interface Props {}

interface State {}

class Summoner extends React.Component<Props, State> {

  render() {
    return (
      <div className={styles.summoner}>
        <div className="row">
          <Metadata />
        </div>
      </div>
    )
  }

}

export default withStyles<Props>(styles)(Summoner)