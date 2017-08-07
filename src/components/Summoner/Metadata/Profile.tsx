import * as React from 'react'
import * as styles from './Metadata.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { graphql, createFragmentContainer } from 'react-relay'

import LoadingSpinner from '~components/shared/LoadingSpinner'
import { ProfileImage } from '~components/shared/images'
import WithTooltip from '~components/shared/WithTooltip'
import * as staticUrl from '~utils/staticUrl'

interface Props {
  meta: {
    profileIconId: number,
    name: string,
  },
  overview: {
    numForSeason: number,
    numNotFetched: number,
  },
  version: string,
}

const Profile = ({ meta, overview, version }: Props) => {
  const { numForSeason, numNotFetched } = overview
  const { profileIconId, name } = meta
  return (
    <div className={styles.profile}>
      <div className={styles.image}>
        <ProfileImage
          url={staticUrl.profile(profileIconId || 1400, version)}
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
      }
    `,
  },
)