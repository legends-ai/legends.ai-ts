import { Tier, Division } from "~src/enums"

export const Rank = (tier: Tier, division: Division) => {
  if (tier) {
    if (division > 0) {
      return `https://static.asuna.io/league/icons/ranked/tier/${tier}_${division}.png`;
    }
    return `https://static.asuna.io/league/icons/ranked/base/${tier}.png`;
  }
  return 'https://static.asuna.io/league/icons/ranked/base/provisional.png';
}