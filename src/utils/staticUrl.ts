import { Tier, Division } from "~src/enums"

export const rank = (tier: Tier = Tier.UNRANKED, division: Division = Division.UNDEFINED_DIVISION) => {
  if (tier !== Tier.UNRANKED) {
    if (division !== Division.UNDEFINED_DIVISION) {
      return `https://static.asuna.io/league/icons/ranked/tier/${tier}_${division}.png`
    }
    return `https://static.asuna.io/league/icons/ranked/base/${tier}.png`
  }
  return 'https://static.asuna.io/league/icons/ranked/base/provisional.png'
}
