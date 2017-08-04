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

  if (tier == Tier.UNRANKED || division == Division.UNDEFINED_DIVISION)
    return (
      <div className={styles.rank}>
        <div className={styles.image}>
          <img src={staticUrl.rank()} />
          <h1>{queueMeta.short}</h1>
        </div>
        <div className={styles.container}>
          <h1 className={styles.unranked}>UNRANKED</h1>
        </div>
      </div>
    )

  return (<div></div>)
}

export default withStyles<Props>(styles)(Rank)
