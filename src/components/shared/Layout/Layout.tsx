import * as React from 'react'
import * as styles from './Layout.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface Props {
  children: [React.Component],
  params: {[key: string]: string},
  appError?: boolean
}

const Layout = ({ children, params, appError = false }: Props) => (
  <div>
    {appError && <h1 className={styles.error}>Oops! Looks like something went wrong. Try refreshing the browser.</h1>}
    {React.Children.only(children)}
  </div>
)

export default withStyles<Props>(styles)(Layout)
