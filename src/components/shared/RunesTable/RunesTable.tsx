import * as React from 'react'
import * as styles from './RunesTable.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Rune from './Rune'

interface Props {
  idToNum: {[key: string]: number},
  version: string,
  staticRunes: any,
}

const RunesTable = ({ idToNum, version, staticRunes }: Props) => (
  <div className={styles.runes}>
    {Object.keys(idToNum).map(id => (
      Rune({
        id,
        version,
        count: idToNum[id],
        name: staticRunes[id].name,
        description: staticRunes[id].description.sanitized,
      })
    ))}
  </div>
)

export default withStyles<Props>(styles)(RunesTable)