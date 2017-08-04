import { Tier, Division } from '~enums'
import { Rank } from '~src/types'

export const percent = (n: number, precision: number = 3) => {
  if (n == 1)
    return '100'
  else
    return (n * 100).toPrecision(precision)
}

export const tier = (tier: Tier) => Tier[tier].toLowerCase()

export const division = (division: Division) => Division[division].split('_')[1]

export const rank = (rank: Rank) => `${tier(rank.tier)} ${division(rank.division)}`
