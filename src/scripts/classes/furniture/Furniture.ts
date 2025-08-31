import type { NumericConstant } from "../../constants.js";
import type { FURNITURE_DEFINITIONS } from "../../data/items/furnitures/_index.js";
import type { Rarity } from "../deck/Rarity.js";
import { Item } from "../inventory/Item.js";
import type { Skill, SkillValuesArray, SkillValuesInit } from "../Skill.js";
import type { FurnitureSlot, FurnitureSlotKey } from "./FurnitureSlot.js";

export interface FurnitureDefinition {
  name: string;
  description: string;
  value: number | NumericConstant;
  slot: FurnitureSlotKey;
  tags: string[];
  skillmods: SkillValuesInit<number | NumericConstant>;
  texts: FurnitureTexts;
}

export interface FurnitureTexts {
  bedchamber?: string;
  ambience?: string[];
}

export type FurnitureKey = keyof typeof FURNITURE_DEFINITIONS;

export class Furniture extends Item {
  slot_key: FurnitureSlotKey;
  skillmods: SkillValuesArray;
  texts: FurnitureTexts;

  constructor(key: string, def: FurnitureDefinition) {
    super(key, {
      ...def,
      item_class: setup.itemclass.furniture,
    });

    this.skillmods = setup.Skill.translateAndResolveConstants(def.skillmods);
    this.slot_key = def.slot;
    this.texts = def.texts;
    if (!def.texts) throw new Error(`Missing text for furniture: ${this.key}`);
  }

  getTexts(): FurnitureTexts {
    return this.texts;
  }

  getBedchamberText(): string {
    return this.getTexts()?.bedchamber || "";
  }

  getSlot(): FurnitureSlot {
    return setup.furnitureslot[this.slot_key];
  }

  getSkillMods(): SkillValuesArray {
    return this.skillmods;
  }

  getSkillMod(skill: Skill): number {
    return this.getSkillMods()[skill.key];
  }

  getMainSkill(): Skill | null {
    const skill_mods = this.getSkillMods();
    const max_value = Math.max(...skill_mods);
    if (max_value <= 0) {
      return null;
    }
    const index = skill_mods.indexOf(max_value);
    return setup.skill[index];
  }

  override getRarity(): Rarity {
    const value = this.getValue() ?? 0;
    if (value >= setup.FURNITURE_PRICE_MASTER) return setup.rarity.legendary;
    else if (value >= setup.FURNITURE_PRICE_GOODMASTER)
      return setup.rarity.epic;
    else if (value >= setup.FURNITURE_PRICE_GOOD) return setup.rarity.rare;
    else if (value >= setup.FURNITURE_PRICE_NORMAL)
      return setup.rarity.uncommon;
    else return setup.rarity.common;
  }

  override renderIcon(skip_tooltip?: boolean): HTMLElement {
    const image_path_raw = this.getSlot().getImage();
    const main_skill = this.getMainSkill();

    let classes = "";
    if (main_skill) {
      classes = `colorize-${main_skill.keyword}`;
    } else {
      classes = "colorize-white";
    }

    classes += ` ${this.getRarity().getIconTriangleClass()}`;

    return setup.DOM.span(
      {
        class: `trait ${classes}`,
        "data-tooltip": skip_tooltip ? undefined : `<<itemcard '${this.key}'>>`,
      },
      setup.DOM.create("img", {
        src: setup.resolveImageUrl(image_path_raw),
      }),
    );
  }

  repFull(): string {
    let basic = this.rep();
    const explanation = setup.SkillHelper.explainSkills(this.getSkillMods());
    if (explanation) {
      basic += " " + setup.DOM.toString(explanation);
    }
    return basic;
  }

  repFullJSX(): DOM.Node {
    let basic = this.repJSX();
    const explanation = setup.SkillHelper.explainSkills(this.getSkillMods());
    if (explanation) {
      return setup.DOM.createFragment(basic, explanation);
    }
    return basic;
  }

  isBasic(): boolean {
    return this.getTags().includes("basic");
  }
}
