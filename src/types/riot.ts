export namespace Riot {

  export interface Mastery {
    id: number,
    rank: number,
  }

  export interface MasteryPage {
    current: boolean,
    masteries: Mastery[],
    name: string,
    id: number,
  }

  export interface RuneSlot {
    runeSlotId: number,
    runeId: number,
  }

  export interface RunePage {
    current: boolean,
    slots: RuneSlot[],
    name: string,
    id: number,
  }

}
