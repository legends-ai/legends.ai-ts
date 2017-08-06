import * as React from 'react'
import * as styles from './Runes.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import * as classNames from 'classnames'
import { Riot } from '~types'

interface Props {
  onClick: (id: number, type?: string) => void,
  version: string,
  staticData: any,
  summoner: any,
}

interface State {
  selectedMasteryPage: number,
  selectedRunePage: number,
}

class Runes extends React.Component<Props, State> {

  onRunesClick = (id: number) => this.setState({ selectedRunePage: id })
  onMasteriesClick = (id: number) => this.setState({ selectedRunePage: id })

  render() {
    const { version, summoner, staticData } = this.props
    const { selectedRunePage, selectedMasteryPage } = this.state

    const runePages: Riot.RunePage[] = JSON.parse(summoner.runes).pages
    const masteryPages: Riot.MasteryPage[] = JSON.parse(summoner.masteries).pages
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
                onClick={() => this.onRunesClick(item.id)}
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
                onClick={() => this.onMasteriesClick(item.id)}
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
)
