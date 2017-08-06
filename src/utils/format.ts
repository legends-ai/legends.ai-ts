import { Tier, Division } from '~enums'
import { Rank } from '~src/types'

export const percent = (n: number, fractionDigits: number = 2) => {
  if (n == 1)
    return '100'
  else
    return (n * 100).toFixed(fractionDigits)
}

export const tier = (tier: Tier) => tier.toLowerCase()

export const division = (division: Division) => division.split('_')[1]

export const rank = (rank: Rank) => `${tier(rank.tier)} ${division(rank.division)}`
