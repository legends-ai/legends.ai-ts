import * as React from 'react'
import * as styles from './Home.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface Props {
  region: string
}

const Home = (props: Props) => (
  <div className={`container ${styles.home}`}>
    <div className="row">
      Legends.ai - {props.region}
    </div>
  </div>
)

export default withStyles<Props>(styles)(Home)
