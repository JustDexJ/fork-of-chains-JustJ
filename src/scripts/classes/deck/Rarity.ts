import { Constants } from "../../constants";
import { TwineClass } from "../_TwineClass";

//export type RarityKey = BrandedType<keyof typeof rarity, 'RarityKey'>
export type RarityKey = keyof typeof rarity;

interface RarityInit {
  key: string;
  name: string;
  description: string;
  frequency?: number;
  is_forced?: boolean;
}

export class Rarity extends TwineClass {
  key: RarityKey;
  name: string;
  description: string;
  frequency: number;
  is_forced?: boolean;

  constructor({ key, name, description, frequency, is_forced }: RarityInit) {
    super();

    if (!key) throw new Error(`null key for rarity`);
    this.key = key as RarityKey;

    if (!name) throw new Error(`null name for rarity ${key}`);
    this.name = name;

    this.description = description;
    this.frequency = frequency ?? 0;
    this.is_forced = is_forced;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  text(): string {
    return `setup.rarity.${this.key}`;
  }

  getIconTriangleClass(): string {
    return `rarity-${this.key}`;
  }

  getTextColorClass(): string {
    return `text-rarity-${this.key}`;
  }

  getBorderColorClass(): string {
    return `border-rarity-${this.key}`;
  }

  getImage(): string {
    return `img/rarity/${this.key}.svg`;
  }

  getImageRep(): string {
    const img = `<img src="${setup.escapeHtml(setup.resolveImageUrl(this.getImage()))}" />`;
    return `<span class='trait' data-tooltip="${this.getName()}">${img}</span>`;
  }

  rep(): string {
    return this.getImageRep();
  }

  getFrequency(): number {
    return this.frequency;
  }

  isForced(): boolean {
    return !!this.is_forced;
  }

  static getRandomRarityOrderWeighted(): Rarity[] {
    const rarities = Object.values(setup.rarity).filter(
      (rarity) => !rarity.isForced() && rarity.getFrequency(),
    );
    rarities.sort((a, b) => b.getFrequency() - a.getFrequency());

    const max_frequency = setup.rarity.rare.getFrequency();
    const rarity_sampled = setup.rng.sampleArray(
      rarities.map((rarity) => [
        rarity,
        Math.min(max_frequency, rarity.getFrequency()),
      ]),
      true,
    )!;

    rarities.splice(rarities.indexOf(rarity_sampled));
    return Object.values(setup.rarity)
      .filter((rarity: Rarity) => rarity.isForced())
      .concat(rarities);
  }

  static RarityCmp(rarity1: Rarity, rarity2: Rarity): number {
    const idx1 = Object.keys(setup.rarity).indexOf(rarity1.key);
    const idx2 = Object.keys(setup.rarity).indexOf(rarity2.key);
    return idx1 - idx2;
  }
}

export const rarity = {
  always: new Rarity({
    key: "always",
    name: "Always",
    description: `Will triggered/scouted whenever possible`,
    is_forced: true,
  }),

  common: new Rarity({
    key: "common",
    name: "Common",
    description: `1 every 2 quests/events`,
    frequency: Constants.RARITY_COMMON_FREQUENCY,
  }),

  uncommon: new Rarity({
    key: "uncommon",
    name: "Uncommon",
    description: `1 every 4 quests/events`,
    frequency: Constants.RARITY_UNCOMMON_FREQUENCY,
  }),

  rare: new Rarity({
    key: "rare",
    name: "Rare",
    description: `1 every 8 quests/events`,
    frequency: Constants.RARITY_RARE_FREQUENCY,
  }),

  epic: new Rarity({
    key: "epic",
    name: "Epic",
    description: `1 every 16 quests/events`,
    frequency: Constants.RARITY_EPIC_FREQUENCY,
  }),

  legendary: new Rarity({
    key: "legendary",
    name: "Legendary",
    description: `1 every 32 quests/events`,
    frequency: Constants.RARITY_LEGENDARY_FREQUENCY,
  }),

  never: new Rarity({
    key: "never",
    name: "Never",
    description: `Never gets scouted/triggered`,
    frequency: Constants.RARITY_NEVER_FREQUENCY,
  }),
};
