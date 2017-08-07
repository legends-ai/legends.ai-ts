import * as React from 'react'
import * as styles from './LoadingSpinner.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface Props {}

const LoadingSpinner = (props: Props) => (
  <div className={styles.skFoldingCube}>
    <div className={styles.skCube} />
    <div className={`${styles.skCube2} ${styles.skCube}`} />
    <div className={`${styles.skCube4} ${styles.skCube}`} />
    <div className={`${styles.skCube3} ${styles.skCube}`} />
  </div>
)

export default withStyles<Props>(styles)(LoadingSpinner)