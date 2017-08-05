import * as React from 'react'
import * as styles from './Runes.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as classNames from 'classnames'
import { Riot } from '~types'

interface Props {
  masteryPages: Riot.MasteryPage[],
  selectedMasteryPage: number,
  runePages: Riot.RunePage[],
  selectedRunePage: number,
  onClick: (id: number, type?: string) => void,
  version: string,
  staticData: any,
}

const Runes = ({
  masteryPages,
  selectedMasteryPage,
  runePages,
  selectedRunePage,
  onClick,
  version,
  staticData
}: Props) => {
  const activeRunePage = runePages.find((page: Riot.RunePage) => page.id == selectedRunePage)
  const activeMasteryPage = masteryPages.find((page: Riot.MasteryPage) => page.id == selectedMasteryPage)

  return (
    <div className={styles.runes}>
      <div className={styles.section}>
        <div className={styles.part}>
          {runePages.map((item, i) =>
            <div
              key={i}
              className={classNames({
                [styles.btn]: true,
                [styles.selected]: selectedRunePage === item.id,
              })}
              onClick={() => onClick(item.id, 'runes')}
            >
              <span>{i}</span> | {item.name}
            </div>,
          )}
        </div>
        <div className={styles.part}>
          {masteryPages.map((item, i) =>
            <div
              key={i}
              className={classNames({
                [styles.btn]: true,
                [styles.selected]: selectedMasteryPage === item.id,
              })}
              onClick={() => onClick(item.id, 'masteries')}
            >
              <span>{i}</span> | {item.name}
            </div>,
          )}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.part}>
        </div>
      </div>
    </div>
  )
}

export default withStyles<Props>(styles)(Runes)
