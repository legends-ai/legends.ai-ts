import * as React from 'react'
import * as styles from './Summoner.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import Metadata from './Metadata'

interface Props {
  region: string,
  meta: any,
  overview: any
}

interface State {}

class Summoner extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div className={`page-wrapper ${styles.summoner}`}>
        <div className="row">
          <Metadata meta={this.props.meta} overview={this.props.overview}/>
        </div>
      </div>
    )
  }

}

export default withStyles<Props>(styles)(Summoner)