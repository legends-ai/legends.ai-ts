export namespace Static {

  export interface TextPair {
    raw: string,
    sanitized: string
  }

  export interface Image {
    full: string,
    sprite: string,
    group: string,
    x: number,
    y: number,
    w: number,
    h: number,
  }

  export interface Item {
    id: number,
    name: string,
    description: TextPair,
    plaintext: string,
    gold: {
      base: number,
      purchasable: boolean,
      sell: number,
      total: number
    },
  }

  export interface Spell {
    id: number,
    name: string,
    description: TextPair,
    cooldownBurn: string,
    rangeBurn: string,
  }

  export interface Mastery {
    id: number,
    name: string,
    description: TextPair[],
  }

  export interface SkillVar {
    coeff: number[],
    dyn: string,
    key: string,
    link: string,
    ranksWith: string
  }

  export interface Skill {
    id: number,
    name: string,
    description: TextPair,
    tooltip: TextPair,
    costBurn: string,
    cooldownBurn: string,
    rangeBurn: string,
    effectBurn: string[],
    vars: SkillVar[]
  }

}