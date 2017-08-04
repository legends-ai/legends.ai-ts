import * as React from 'react'
import * as styles from './Rank.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { queueMetaMap } from '~constants'
import { Tier, Division, Queue } from '~enums'
import * as staticUrl from '~utils/staticUrl'
import * as format from '~utils/format'

interface Props {
  queue?: Queue
  tier?: Tier,
  division?: Division,
  leaguePoints: number,
  wins: number,
  losses: number,
}

const Rank = ({
  queue = Queue.UNDEFINED_QUEUE,
  tier = Tier.UNRANKED,
  division = Division.UNDEFINED_DIVISION,
  leaguePoints, wins, losses
}: Props) => {
  const queueMeta = queueMetaMap[Queue[queue]] || {}

  // fucking rip, I wish javascript allowed if/else to be used as rhs expressions
  let image, details
  const isRankDefined = tier !== Tier.UNRANKED && division !== Division.UNDEFINED_DIVISION

  // This is pretty cancer because image/details are technically mutable
  if (!isRankDefined) {
    image = staticUrl.rank({ tier: Tier.UNRANKED, division: Division.UNDEFINED_DIVISION })
    details = (
      <div className={styles.container}>
        <h1 className={styles.unranked}>UNRANKED</h1>
      </div>
    )
  } else {
    image = staticUrl.rank({ tier, division })
    // TODO(p): handle case where wins and losses are both 0
    details = (
      <div className={styles.container}>
        <h1>{format.rank({ tier, division })}</h1>
        <div className={styles.description}>
          <h3>{leaguePoints}</h3>
          <span>LP</span>
        </div>
        <div className={styles.description}>
          <h3>{wins && losses && format.percent(wins / (wins + losses))}</h3>
          <span>winrate</span>
        </div>
        <div className={styles.description}>
          <h3>{wins} - {losses}</h3>
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

export default withStyles<Props>(styles)(Rank)
