import type { _furnitureslot } from "../../data/furnitureslot.js";
import type { Rarity } from "../deck/Rarity.js";
import { Item } from "../inventory/Item.js";
import type { Skill, SkillValuesArray, SkillValuesInit } from "../Skill.js";
import type { FurnitureSlot } from "./FurnitureSlot.js";

export type FurnitureSlotKey = keyof _furnitureslot;

interface FurnitureTexts {
  bedchamber?: string;
  ambience?: string[];
}

export class Furniture extends Item {
  slot_key: FurnitureSlotKey;
  skillmods: SkillValuesArray;
  texts: FurnitureTexts;

  constructor(
    key: string,
    name: string,
    description: string,
    value: number,
    slot: FurnitureSlot,
    tags: string[],
    skillmods: SkillValuesInit,
    texts: FurnitureTexts,
  ) {
    super({
      key: key,
      name: name,
      description: description,
      item_class: setup.itemclass.furniture,
      value: value,
      tags: tags,
    });

    this.skillmods = setup.Skill.translate(skillmods);
    this.slot_key = slot.key;
    this.texts = texts;
    if (!texts) throw new Error(`Missing text for furniture: ${this.key}`);
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

  override getImageRep(): string {
    const image_path_raw = this.getSlot().getImage();
    const main_skill = this.getMainSkill();

    let classes = "";
    if (main_skill) {
      classes = `colorize-${main_skill.keyword}`;
    } else {
      classes = "colorize-white";
    }

    classes += ` ${this.getRarity().getIconTriangleClass()}`;

    const tooltip = `<<itemcardkey '${this.key}'>>`;
    const url = setup.escapeHtml(setup.resolveImageUrl(image_path_raw));
    return `<span class="trait ${classes}" data-tooltip="${tooltip}"><img src="${url}"/></span>`;
  }

  repFull(): string {
    let basic = this.rep();
    const explanation = setup.SkillHelper.explainSkills(this.getSkillMods());
    if (explanation) {
      basic += " " + explanation;
    }
    return basic;
  }

  isBasic(): boolean {
    return this.getTags().includes("basic");
  }
}
