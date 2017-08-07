import * as React from 'react'
import * as styles from './Metadata.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import { CLASS_BADGE_THRESHOLD, classMap } from '~constants'
import { ChampionClass } from '~enums'
import * as staticUrl from '~utils/staticUrl'

import LoadingSpinner from '~components/shared/LoadingSpinner'
import { ProfileImage } from '~components/shared/images'
import WithTooltip from '~components/shared/WithTooltip'

interface Props {
  meta: {
    profile_icon_id: number,
    name: string,
  },
  overview: {
    numForSeason: number,
    numNotFetched: number,
    class_distribution: {
      class: ChampionClass,
      value: number
    }[],
  },
  version: string,
}

const Profile = ({ meta, overview, version }: Props) => {
  const { numForSeason, numNotFetched, class_distribution } = overview
  const { profile_icon_id, name } = meta
  return (
    <div className={styles.profile}>
      <div className={styles.image}>
        <ProfileImage
          url={staticUrl.profile(profile_icon_id || 1400, version)}
          isSquare
        />
        {numNotFetched > 0 && <div className={styles.loader}>
          <div className={styles.progress} style={{ height: `${numNotFetched / numForSeason * 100}%` }} />
          <LoadingSpinner />
        </div>}
      </div>
      <div className={styles.content}>
        {numNotFetched > 0 ?
          <WithTooltip tooltip="not all matches fetched, information may be inaccurate">
            <h1>{name || '-'} <span>*</span></h1>
          </WithTooltip>
          :
          <h1>{name || '-'}</h1>
        }
        <h2>
          {class_distribution[0] &&
          <span className={styles.badge}>
            {classMap[class_distribution[0].class]}
          </span>}
          {
            class_distribution.length > 1 &&
            class_distribution[1].value > class_distribution.reduce(
              (acc, { value }) => acc + value, 0
            ) * CLASS_BADGE_THRESHOLD &&
            <span className={styles.badge}>
              {classMap[class_distribution[1].class]}
            </span>
          }
        </h2>
      </div>
    </div>
  )
}

export default createFragmentContainer(
  withStyles<Props>(styles)(Profile),
  {
    meta: graphql`
      fragment Profile_meta on SummonerMeta {
        profile_icon_id
        name
      }
    `,
    overview: graphql`
      fragment Profile_overview on SummonerOverview {
        numForSeason
        numNotFetched
        class_distribution {
          class
          value
        }
      }
    `,
  },
)