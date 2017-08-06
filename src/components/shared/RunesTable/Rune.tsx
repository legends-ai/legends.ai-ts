import * as React from 'react'
import * as styles from './RunesTable.css'

import * as staticUrl from '~utils/staticUrl'

interface Props {
  id: string,
  version: string,
  count: number,
  name: string,
  description: string
}

const Rune = ({ id, version, count, name, description }: Props) => (
  <div key={id} className={styles.rune}>
    <img src={staticUrl.rune(id, version)} />
    <b>{count}x</b>
    <div className={styles.content}>
      <span>{name}</span>
      <span className={styles.description}>{description}</span>
    </div>
  </div>
)

export default Rune