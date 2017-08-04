import { STATIC_HOST } from '~src/config'
import { Tier, Division } from '~src/enums'
import { Rank } from '~types'
import * as format from '~utils/format'

export const rank = ({ tier = Tier.UNRANKED, division = Division.UNDEFINED_DIVISION }: Rank) => {
  if (tier !== Tier.UNRANKED) {
    const fTier = format.tier(tier)
    if (division !== Division.UNDEFINED_DIVISION) {
      return `${STATIC_HOST}/league/icons/ranked/tier/${fTier}_${format.division(division).toLowerCase()}.png`
    }
    return `${STATIC_HOST}/league/icons/ranked/base/${fTier}.png`
  }
  return `${STATIC_HOST}/league/icons/ranked/base/provisional.png`
}
