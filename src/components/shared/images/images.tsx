import * as React from 'react'
import * as styles from './images.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

interface ProfileImageProps {
  url: string,
  isSquare?: boolean,
  isZoomed?: boolean,
  alignRight?: boolean,
}

export const ProfileImage = withStyles<ProfileImageProps>(styles)(
  ({ url, isZoomed = false, alignRight = false, isSquare = false }: ProfileImageProps) => (
    <div
      className={`profileImage ${isSquare ? styles.square : ''} ${alignRight ? styles.right : ''} ${isZoomed ? styles.zoomed: ''}`}
      style={{ backgroundImage: `url(${url})` }}
    />
  )
)