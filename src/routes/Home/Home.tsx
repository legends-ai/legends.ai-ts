import * as React from 'react';
import * as styles from './Home.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <div className="container" styleName="home">
      <div className="row">
        Legends.ai
      </div>
    </div>
  )
}

export default withStyles<HomeProps>(styles as any)(Home)