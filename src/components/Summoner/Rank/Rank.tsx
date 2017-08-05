import * as React from 'react'
import * as styles from './Rank.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { queueMetaMap } from '~constants'
import { Tier, Division, Queue } from '~enums'
import * as staticUrl from '~utils/staticUrl'
import * as format from '~utils/format'
const {graphql, createFragmentContainer} = require('react-relay')

interface Props {
  position: any,
}

const Rank = ({ position }: Props) => {
  const queueMeta = queueMetaMap[Queue[position.queue]] || {}

  // fucking rip, I wish javascript allowed if/else to be used as rhs expressions
  let image, details
  const isRankDefined = position.rank.tier !== Tier.UNRANKED && position.rank.division !== Division.UNDEFINED_DIVISION

  // This is pretty cancer because image/details are technically mutable
  if (!isRankDefined) {
    image = staticUrl.rank({ tier: Tier.UNRANKED, division: Division.UNDEFINED_DIVISION })
    details = (
      <div className={styles.container}>
        <h1 className={styles.unranked}>UNRANKED</h1>
      </div>
    )
  } else {
    image = staticUrl.rank(position.rank)
    // TODO(p): handle case where wins and losses are both 0
    details = (
      <div className={styles.container}>
        <h1>{format.rank(position.rank)}</h1>
        <div className={styles.description}>
          <h3>{position.league_points}</h3>
          <span>LP</span>
        </div>
        <div className={styles.description}>
          <h3>{position.wins && position.losses && format.percent(position.wins / (position.wins + position.losses))}</h3>
          <span>winrate</span>
        </div>
        <div className={styles.description}>
          <h3>{position.wins} - {position.losses}</h3>
          <span>record</span>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.rank}>
      <div className={styles.image}>
        <img src={image} />
        <h1>{queueMeta.short}</h1>
      </div>
      {details}
      {isRankDefined && <div className="clear" />}
    </div>
  )
}

export default createFragmentContainer(
  withStyles<Props>(styles)(Rank),
  {
    position: graphql`
      fragment Rank_position on LeaguePosition {
        rank {
          tier
          division
        }
        queue
        league_points
        wins
        losses
      }
    `
  },
)