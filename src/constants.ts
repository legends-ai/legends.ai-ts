import { Queue } from '~enums'

export const CLASS_BADGE_THRESHOLD = 0.2

export const classMap: {[key: string]: string} = {
  NO_CLASS: 'NO_CLASS',
  ASSASSIN: 'ASSASSIN',
  FIGHTER: 'FIGHTER',
  MAGE: 'MAGE',
  MARKSMAN: 'MARKSMAN',
  SUP: 'SUPPPORT',
  TANK: 'TANK',
}

type QueueMeta = {
  key: string,
  name: string,
  short: string,
  map: string
}

// TODO(p): Once regression is fixed, convert this to key by enum
// https://github.com/Microsoft/TypeScript/issues/13042
export const queueMetaMap: {[key: string]: QueueMeta} = {
  RANKED_SOLO_5x5: {
    key: 'RANKED_SOLO_5x5',
    name: 'Ranked Solo/Duo',
    short: 'Solo/Duo',
    map: 'Summoner\'s Rift',
  },
  RANKED_FLEX_TT: {
    key: 'RANKED_FLEX_TT',
    name: 'Ranked Flex 3v3',
    short: 'Flex 3v3',
    map: 'Twisted Treeline',
  },
  TEAM_BUILDER_DRAFT_RANKED_5x5: {
    key: 'TEAM_BUILDER_DRAFT_RANKED_5x5',
    name: 'Ranked Dynamic',
    short: 'Dynamic',
    map: 'Summoner\'s Rift',
  },
  RANKED_FLEX_SR: {
    key: 'RANKED_FLEX_SR',
    name: 'Ranked Flex 5v5',
    short: 'Flex 5v5',
    map: 'Summoner\'s Rift',
  },
  TEAM_BUILDER_RANKED_SOLO: {
    key: 'TEAM_BUILDER_RANKED_SOLO',
    name: 'Ranked Solo/Duo',
    short: 'Solo/Duo',
    map: 'Summoner\'s Rift',
  },
  NORMAL_5x5_BLIND: {
    key: 'NORMAL_5x5_BLIND',
    name: 'Normal Blind 5x5',
    short: 'Blind 5x5',
    map: 'Summoner\'s Rift',
  },
  NORMAL_5x5_DRAFT: {
    key: 'NORMAL_5x5_DRAFT',
    name: 'Normal Draft 5x5',
    short: 'Draft 5x5',
    map: 'Summoner\'s Rift',
  },
  TEAM_BUILDER_DRAFT_UNRANKED_5x5: {
    key: 'TEAM_BUILDER_DRAFT_UNRAKED_5x5',
    name: 'Normal Draft 5x5',
    short: 'Draft 5x5',
    map: 'Summoner\'s Rift',
  },
  BOT_5x5: {
    key: 'BOT_5x5',
    name: 'Bot 5x5',
    short: 'Bot 5x5',
    map: 'Summoner\'s Rift',
  },
  BOT_5x5_INTRO: {
    key: 'BOT_5x5_INTRO',
    name: 'Bot 5x5 (Intro)',
    short: 'Intro Bot 5x5',
    map: 'Summoner\'s Rift',
  },
  BOT_5x5_BEGINNER: {
    key: 'BOT_5x5_BEGINNER',
    name: 'Beginner Bot 5x5',
    short: 'Beg Bot 5x5',
    map: 'Summoner\'s Rift',
  },
  BOT_5x5_INTERMEDIATE: {
    key: 'BOT_5x5_INTERMEDIATE',
    name: 'Intermediate Bot 5x5',
    short: 'Inter Bot 5x5',
    map: 'Summoner\'s Rift',
  },
  BOT_TT_3x3: {
    key: 'Bot_TT_3x3',
    name: 'Bot 3x3',
    short: 'Bot 3x3',
    map: 'Twisted Treeline',
  },
  ARAM_5x5: {
    key: 'ARAM_5x5',
    name: 'ARAM',
    short: 'ARAM',
    map: 'Howling Abyss',
  },
  KING_PORO_5x5: {
    key: 'KING_PORO_5x5',
    name: 'Legend of the Poro King',
    short: 'Poro King',
    map: 'Howling Abyss'
  }
}
