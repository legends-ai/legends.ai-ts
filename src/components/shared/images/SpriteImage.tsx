import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as styles from './SpriteImage.css'
import * as classnames from 'classnames'

type Props = {
  image: any,
  size: string,
};

const SpriteImage = ({ size, image }: Props) => {
  const sizeString = (size === 'small' || size === 'large') ? size : '';
  if (!image) {
    return <div className={classnames({
      sprite: true,
      unknown: true,
      [sizeString]: true,
    })}>?</div>;
  }
  return (
    <div
      className={classnames({
        sprite: true,
        [sizeString]: true,
      })}
      style={{
        backgroundImage: image.sprite,
        backgroundPosition: `${-image.x || 0}px ${-image.y || 0}px`,
      }}
    />
  );
}

export default createFragmentContainer(
  withStyles<Props>(styles)(SpriteImage),
  {
    image: graphql`
      fragment SpriteImage_image on Image {
        sprite
        x
        y
      }
    `,
  },
)