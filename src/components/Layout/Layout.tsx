import * as React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import * as styles from './Layout.css'

interface LayoutProps {
  children: [React.Component],
  params: {[key: string]: string},
  appError?: string
}

const Layout = ({ children, params, appError = undefined }: LayoutProps) => (
  <div>
    {appError && <h1 styleName="error">Oops! Looks like something went wrong. Try refreshing the browser.</h1>}
    {React.Children.only(children)}
  </div>
)

export default withStyles<LayoutProps>(styles as any)(Layout)