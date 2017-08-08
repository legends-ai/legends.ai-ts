import * as React from 'react'
import * as classnames from 'classnames'
import { graphql, createFragmentContainer } from 'react-relay'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as styles from './Participants.css'
import SpriteImage from '~components/shared/images/SpriteImage'

type Props = {
  isSelected: boolean,
  participant: any,
}

const Participant = ({ isSelected, participant }: Props) => {
  return (
    <div className={classnames({
      [styles.participant]: true,
      [styles.selected]: isSelected,
    })}>
      <div className={styles.img}>
        <SpriteImage image={participant.champion_static.image} size="small" />
      </div>}
      <h1>
        {
          participant.summoner_name !== ""
          ? participant.summoner_name
          : participant.champion_static.name
        }
      </h1>
    </div>
  )
}

export default createFragmentContainer(
  withStyles<Props>(styles)(Participant),
  {
    participantInfos: graphql`
      fragment Participant_participantInfos on ParticipantInfoOverview {
        summoner_name
        champion_static(locale: en_US, version: "7.14.1", region: NA) {
          image {
            x
            y
          }
          name
        }
      }
    `,
  },
)