import * as React from 'react'
import * as styles from './MasteriesGraph.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as staticUrl from '~utils/staticUrl'

interface Props {
  id: number,
  rank: number,
  version: string,
}

/**
 * Represents a node in the masteries graph.
 * TODO(igm): use sprites
 */
export const MasteryNode = withStyles<Props>(styles)(({ id, rank, version, }: Props) => (
  <div className={styles.item}>
    <img className={rank ? '' : styles.disabled} src={staticUrl.mastery(id.toString(), version)} />
    <span className={rank ? '' : styles.hidden}>{rank}</span>
  </div>
))

export const EmptyMasteryNode = withStyles<{}>(styles)(
  () => <div className={styles.item} />
)
