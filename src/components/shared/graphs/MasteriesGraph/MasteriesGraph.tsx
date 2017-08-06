import * as React from 'react'
import * as styles from './MasteriesGraph.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { chain, sum } from 'ramda'
import { Riot } from '~types'

import { MasteryNode, EmptyMasteryNode } from './MasteryNode'

const TREES = ['ferocity', 'cunning', 'resolve'];
const treesStyles: {[key: string]: string} = {
  'ferocity': styles.ferocity,
  'cunning': styles.cunning,
  'resolve': styles.resolve,
}

const masteriesSum = (table: MasteriesTree, masteries: MasteriesRankMap): number => {
  return sum(
    chain(_ => _.entries, table).map(
      entry => masteries[entry.id] || 0));
}

type MasteriesRankMap = {[key: number]: number}

type MasteriesTree = Array<{
  entries: Array<{
    id: number,
    prereq: string,
  }>,
}>

type MasteryInfo = {
  description: Array<any>,
  id: number,
  image: any,
  name: string,
  ranks: number,
}

interface Props {
  masteries: Riot.Mastery[],
  staticMasteriesTrees: { [id: string]: MasteriesTree },
  staticMasteries: { [id: number]: MasteryInfo },
  version: string,
}

const MasteriesGraph = ({
  masteries,
  staticMasteriesTrees,
  staticMasteries,
  version,
}: Props) => {
  const rankMap = masteries.reduce(
    (acc: MasteriesRankMap, { id, rank }) => { return { ...acc, [id]: rank } }, {})

  return (
    <div className={styles.masteriesGraph}>
      {
        staticMasteriesTrees && staticMasteries && TREES.map(name => {
          return <div key={name} className={`${treesStyles[name]} ${styles.mastery}`}>
            <h1>{name} {masteriesSum(staticMasteriesTrees[name], rankMap)}</h1>
            {
              staticMasteriesTrees[name].map(({ entries }, idx) =>
                <div key={idx} className={styles.itemRow}>
                  {
                    entries.map(item => {
                      if (item) {
                        return <MasteryNode
                          key={item.id}
                          id={item.id}
                          rank={rankMap[item.id] || 0}
                          version={version} />
                      }
                      return <EmptyMasteryNode />;
                    })
                  }
                </div>
              )
            }
          </div>;
        })
      }
      <div className="clear" />
    </div>
  )
}

export default withStyles<Props>(styles)(MasteriesGraph);
