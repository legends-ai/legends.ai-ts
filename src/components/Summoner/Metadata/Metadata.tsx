import * as React from 'react'
import * as styles from './Metadata.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Profile from './Profile'

interface Props {
  meta: any,
  overview: any
}

const Metadata = ({ meta, overview }: Props) => (
  <div className={`col-12 ${styles.metadata}`}>
    <Profile meta={meta} overview={overview} version="7.14.1"/>
  </div>
)

export default withStyles<Props>(styles)(Metadata)