import type { _equipmentslot } from "../../data/equipmentslot";
import { TwineClass } from "../_TwineClass";

//export type EquipmentSlotKey = BrandedType<string, 'EquipmentSlotKey'>
export type EquipmentSlotKey = keyof _equipmentslot;

export class EquipmentSlot extends TwineClass {
  key: EquipmentSlotKey;
  name: string;

  constructor(key: string, name: string) {
    super();

    this.key = key as EquipmentSlotKey;
    this.name = name;

    if (key in setup.equipmentslot) {
      throw new Error(`Equipment Slot ${key} already exists`);
    }
    setup.equipmentslot[key as EquipmentSlotKey] = this;
  }

  getName(): string {
    return this.name;
  }

  getImage(): string {
    return `img/equipmentslot/${this.key}.svg`;
  }

  getImageRep(): string {
    const img = `<img src="${setup.escapeHtml(setup.resolveImageUrl(this.getImage()))}" />`;
    return `<span class='trait colorize-white' data-tooltip="${setup.capitalize(this.getName())}">${img}</span>`;
  }

  rep(): string {
    return this.getImageRep();
  }
}
