import * as React from 'react'
import * as styles from './Metadata.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Profile from './Profile'

interface Props {}

const Metadata = ({}: Props) => (
  <div className={`col-12 ${styles.metadata}`}>
    <Profile />
  </div>
)

export default withStyles<Props>(styles)(Metadata)