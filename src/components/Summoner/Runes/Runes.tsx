import * as React from 'react'
import * as styles from './Runes.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import * as classNames from 'classnames'
import { Riot } from '~types'

interface Props {
  selectedMasteryPage: number,
  selectedRunePage: number,
  onClick: (id: number, type?: string) => void,
  version: string,
  staticData: any,
  summoner: any,
}

const Runes = ({
  selectedMasteryPage,
  selectedRunePage,
  onClick,
  version,
  staticData,
  summoner,
}: Props) => {
  const runes = JSON.parse(summoner.runes)
  const masteries = JSON.parse(summoner.masteries)
  const runePages = runes.pages
  const masteryPages = masteries.pages
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

export default createFragmentContainer(
  withStyles<Props>(styles)(Runes),
  {
    summoner: graphql`
      fragment Runes_summoner on Summoner {
        runes
        masteries
      }
    `
  }
);
