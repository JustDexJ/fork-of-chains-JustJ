import type { EQUIPMENT_SLOT_DEFINITIONS } from "../../data/equipmentslots";
import { TwineClass } from "../_TwineClass";

export interface EquipmentSlotDefinition {
  name: string;
}

//export type EquipmentSlotKey = BrandedType<string, 'EquipmentSlotKey'>
export type EquipmentSlotKey = keyof typeof EQUIPMENT_SLOT_DEFINITIONS;

export class EquipmentSlot extends TwineClass {
  key: EquipmentSlotKey;
  name: string;

  constructor(key_: string, def: Readonly<EquipmentSlotDefinition>) {
    super();

    const key = key_ as EquipmentSlotKey;

    this.key = key;
    this.name = def.name;

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

  renderIcon(): HTMLElement {
    return setup.DOM.span(
      {
        class: "icon colorize-white",
        "data-tooltip": setup.capitalize(this.getName()),
      },
      setup.DOM.create("img", {
        src: setup.resolveImageUrl(this.getImage()),
      }),
    );
  }

  rep(): string {
    return setup.DOM.toString(this.renderIcon());
  }
  repJSX(): DOM.Node {
    return this.renderIcon();
  }
}
