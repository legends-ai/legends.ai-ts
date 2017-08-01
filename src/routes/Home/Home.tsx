import * as React from 'react';
import * as styles from './Home.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface Props {
  region: string
}

const Home = (props: Props) => {
  return (
    <div className="container" styleName="home">
      <div className="row">
        Legends.ai - {props.region}
      </div>
    </div>
  )
}

export default withStyles<Props>(styles as any)(Home)