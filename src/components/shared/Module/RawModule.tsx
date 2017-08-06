import * as React from 'react'
import * as styles from './Module.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface Props {
  title?: string,
  children?: React.ReactNode
}

const RawModule = ({ title, children }: Props) => (
  <div className={`${styles.module}`}>
    {title &&
    <div className={styles.title}>
      <h1>{title}</h1>
    </div>}
    <div>{children}</div>
  </div>
)

export default withStyles<Props>(styles)(RawModule)