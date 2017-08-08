import * as React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import * as styles from './Participants.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Participant from './Participant'

type Props = {
  championId: any,
  participants: any,
};

const Participants = ({ championId, participants }: Props) => {
  return (
    <div className={styles.participants}>
      {[100, 200].map(team =>
        <div key={team} className={styles.team}>
          {participants
            .filter((x: any) => x.team_id === team)
            .map((participant: any) => (
              <Participant participant={participant} isSelected={participant.champion_id === championId} />
            )
          )}
        </div>,
      )}
    </div>
  )
}

export default createFragmentContainer(
  withStyles<Props>(styles)(Participants),
  {
    participants: graphql`
      fragment Participants_participants on ParticipantInfoOverview @relay(plural: true) {
        champion_id
        team_id
        ...Participant_participant
      }
    `,
  },
)