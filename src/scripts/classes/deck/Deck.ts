// Types for Twine SugarCube v2 global objects (minimal, for this file)

import { TwineClass } from "../_TwineClass";

// Type for rarity, assuming it has isForced() and getFrequency() methods
interface DeckRarity {
  isForced(): boolean;
  getFrequency(): number;
}

interface DeckCardInfo<T> {
  rarity: DeckRarity;
  object: T;
}

// Deck class definition
export class Deck<T = any> extends TwineClass {
  cards: T[];

  constructor() {
    super();
    this.cards = [];
  }

  isEmpty(): boolean {
    return !this.cards.length;
  }

  regenerateDeck(objects: DeckCardInfo<T>[]): void {
    const subdecks: T[][] = [];
    for (let i = 0; i < setup.DECK_SUBDECKS; ++i) {
      subdecks.push([]);
    }

    for (const card of objects) {
      setup.rng.shuffleArray(subdecks);
      const rarity = card.rarity;
      if (rarity.isForced())
        throw new Error(`Forced rarities cannot be made into deck cards!`);
      for (let j = 0; j < rarity.getFrequency(); ++j) {
        subdecks[j % setup.DECK_SUBDECKS].push(card.object);
      }
    }

    for (const subdeck of subdecks) {
      setup.rng.shuffleArray(subdeck);
    }
    setup.rng.shuffleArray(subdecks);
    this.cards = subdecks.flat(1);
  }

  drawCard(): T {
    if (this.isEmpty()) throw new Error(`Cannot draw from an empty deck!`);
    return this.cards.pop()!;
  }

  static get<T>(key: string): Deck<T> {
    if (!(key in State.variables.deck)) {
      State.variables.deck[key] = new setup.Deck();
    }
    return State.variables.deck[key];
  }
}
