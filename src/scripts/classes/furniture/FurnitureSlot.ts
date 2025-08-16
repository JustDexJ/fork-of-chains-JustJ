import type { FURNITURE_SLOT_DEFINITIONS } from "../../data/furnitureslots";
import { TwineClass } from "../_TwineClass";
import type { ItemKey } from "../inventory/Item";
import type { Furniture } from "./Furniture";

export interface FurnitureSlotDefinition {
  key: string;
  name: string;
}

export type FurnitureSlotKey = keyof typeof FURNITURE_SLOT_DEFINITIONS;

export class FurnitureSlot extends TwineClass {
  key: FurnitureSlotKey;
  name: string;

  constructor(def: FurnitureSlotDefinition) {
    super();

    const key = def.key as FurnitureSlotKey;

    this.key = key;
    this.name = def.name;

    if (key in setup.furnitureslot) {
      throw new Error(`Furniture Slot ${key} already exists`);
    }
    setup.furnitureslot[key] = this;
  }

  getName(): string {
    return this.name;
  }

  getImage(): string {
    return `img/furnitureslot/${this.key}.svg`;
  }

  getImageRep(): string {
    const img = `<img src="${setup.escapeHtml(setup.resolveImageUrl(this.getImage()))}" />`;
    return `<span class='trait colorize-white' data-tooltip="${setup.capitalize(this.getName())}">${img}</span>`;
  }

  rep(): string {
    return this.getImageRep();
  }

  getBasicFurniture(): Furniture {
    const key = `f_${this.key}_none` as ItemKey;
    return setup.item[key] as unknown as Furniture;
  }
}
