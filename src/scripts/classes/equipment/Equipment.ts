import { Constants, type NumericConstant } from "../../constants";
import type { EQUIPMENT_DEFINITIONS } from "../../data/equipments/_index";
import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { SkillValuesArray, SkillValuesInit } from "../Skill";
import type { TraitKey } from "../trait/Trait";
import type { EquipmentSlot, EquipmentSlotKey } from "./EquipmentSlot";

const FRACTION_CHARACTERS = ["½", "⅓", "¼", "⅕", "⅙", "⅐", "⅛", "⅑"];

export interface EquipmentDefinition {
  name: string;
  slot: EquipmentSlotKey;
  tags: string[];
  value: number | NumericConstant;
  sluttiness: number;
  skillmods: SkillValuesInit;
  /** {eq_gagged: 3} means need 3 of these kind of items to get this trait. */
  traits: { [k in TraitKey]?: number };
  restrictions: Restriction[];
  icon: { image?: string; colorize?: boolean | string };
  texts: EquipmentTexts;
}

interface EquipmentTexts {
  description: string;
  flavor: string;
}

//export type EquipmentKey = BrandedType<string, "EquipmentKey">;
export type EquipmentKey = keyof typeof EQUIPMENT_DEFINITIONS;

export class Equipment extends TwineClass {
  static NONSEX_URL = "img/special/equipment_nonsex.svg";
  static SEX_URL = "img/special/equipment_sex.svg";

  static repNonSexIcon(): DOM.Node {
    return setup.repImgIconJSX(
      setup.Equipment.NONSEX_URL,
      "Equipments unrelated to sexual intercourse",
    );
  }

  static repSexIcon(): DOM.Node {
    return setup.repImgIconJSX(
      setup.Equipment.SEX_URL,
      "Sex toys and sex-related equipments",
    );
  }

  static keygen = 1;

  key: EquipmentKey;
  order_key: number;

  name: string;
  slot_key: EquipmentSlotKey;
  tags: string[];
  value: number;
  sluttiness: number;
  skillmods: SkillValuesArray;
  trait_key_mods: Record<TraitKey, number>;
  unit_restrictions: Restriction[];
  icon_settings: { image?: string; colorize?: boolean | string };
  texts: EquipmentTexts;

  constructor(key: string, def: Readonly<EquipmentDefinition>) {
    super();

    this.key = key as EquipmentKey;
    this.order_key = Equipment.keygen++;

    this.name = def.name;
    this.slot_key = def.slot;
    this.tags = def.tags;
    this.value =
      typeof def.value === "string" ? Constants[def.value] : def.value;
    this.sluttiness = def.sluttiness;
    this.skillmods = setup.Skill.translate(def.skillmods);
    this.texts = def.texts;
    if (!def.texts) {
      throw new Error(`Text object for equipment ${this.key} is missing.`);
    }

    this.icon_settings = def.icon || {};

    if (def.icon !== undefined && def.icon instanceof Array) {
      throw new Error(`Invalid icon_settings for '${key}', expected an object`);
    }

    this.trait_key_mods = def.traits as Record<TraitKey, number>;
    if (!def.traits || typeof def.traits !== "object") {
      throw new Error(`Trait key mods must be objects for ${this.key}`);
    }
    for (const trait_key of objectKeys(def.traits)) {
      if (!setup.trait[trait_key]) {
        throw new Error(
          `Could not find trait with key ${trait_key} for equipment ${this.key}`,
        );
      }
    }

    if (!Array.isArray(def.restrictions)) {
      throw new Error(`Unit restrictions must be an array for ${this.key}`);
    }
    if (def.restrictions) {
      this.unit_restrictions = def.restrictions;
    } else {
      this.unit_restrictions = [];
    }

    if (key in setup.equipment)
      throw new Error(`Equipment ${key} already exists`);

    setup.equipment[key as EquipmentKey] = this;
  }

  getSkillMods(): SkillValuesArray {
    return this.skillmods;
  }

  getSkillMod(skill: Skill): number {
    return this.getSkillMods()[skill.key];
  }

  getDefaultImageForSlot(): string {
    switch (this.slot_key) {
      case "weapon":
        return "weapon_sword";

      case "eyes":
        return "eyes_mask";
      case "mouth":
        return "mouth_bandana";
      case "head":
        return "head_helm";
      case "neck":
        return "neck_cloak";
      case "arms":
        return "arms_gloves";
      case "torso":
        return "torso_shirt";
      case "nipple":
        return "nipple_clamps";
      case "rear":
        return "rear_underwear";
      case "genital":
        return "arms_ring";
      case "legs":
        return "legs_pants";
      case "feet":
        return "feet_boots";
    }
  }

  getRarity(): Rarity {
    const value = this.getValue();
    if (value >= setup.EQUIPMENT_PRICE_MASTER) return setup.rarity.legendary;
    else if (value >= setup.EQUIPMENT_PRICE_GOODMASTER)
      return setup.rarity.epic;
    else if (value >= setup.EQUIPMENT_PRICE_GOOD) return setup.rarity.rare;
    else if (value >= setup.EQUIPMENT_PRICE_NORMAL)
      return setup.rarity.uncommon;
    else return setup.rarity.common;
  }

  renderIcon(skip_tooltip?: boolean): HTMLElement {
    let classes = "";

    const has_custom_image = this.icon_settings.image;
    const imagepath = `img/equipment/${
      has_custom_image
        ? this.icon_settings.image
        : this.getDefaultImageForSlot()
    }.svg`;

    if (this.icon_settings.colorize !== false) {
      if (typeof this.icon_settings.colorize === "string") {
        classes = "colorize-" + this.icon_settings.colorize;
      } else {
        let max_val = 0;
        let max_i = 0;
        for (let i = 0; i < this.skillmods.length; ++i) {
          if (this.skillmods[i] > max_val) {
            max_val = this.skillmods[i];
            max_i = i;
          }
        }

        if (max_val > 0) classes = "colorize-" + setup.skill[max_i].keyword;
        else classes = "colorize-white";
      }
    }

    classes += ` ${this.getRarity().getIconTriangleClass()}`;

    return setup.DOM.span(
      {
        class: `trait ${classes}`,
        "data-tooltip": skip_tooltip
          ? undefined
          : `<<equipmentcard '${this.key}'>>`,
      },
      setup.DOM.create("img", { src: setup.resolveImageUrl(imagepath) }),
    );
  }

  getRepMacro() {
    return "equipmentcard";
  }

  getRepRarity() {
    return this.getRarity();
  }

  rep(): string {
    return setup.repMessageDict({
      instance: this,
      icontext: setup.DOM.toString(this.renderIcon()),
      text_class: this.getRarity().getTextColorClass(),
    });
  }
  repJSX(): DOM.Node {
    return setup.repObjectJSX(this, {
      icon: this.renderIcon(),
      text_class: this.getRarity().getTextColorClass(),
    });
  }

  repFull(): DOM.Node {
    const fragment = document.createDocumentFragment();
    fragment.append(this.repJSX());
    const explanation = setup.SkillHelper.explainSkillMods(this.getSkillMods());
    if (explanation) {
      fragment.append(" ", explanation);
    }
    const traits = this.repTraits();
    if (traits) {
      fragment.append(" ", traits);
    }
    return fragment;
  }

  repTraits(): DOM.Node | null {
    const inner_fragments_front: DOM.Node[] = [];
    const inner_fragments_back: DOM.Node[] = [];
    const trait_mods = this.getTraitMods();
    for (const [trait_key, mod] of objectEntries(trait_mods)) {
      const trait = setup.trait[trait_key];
      if (mod == 1) {
        inner_fragments_front.push(trait.repJSX());
      } else {
        const fract =
          mod >= 2 && mod <= 9 ? FRACTION_CHARACTERS[mod - 2] : `1/${mod}`;
        inner_fragments_back.push(
          document.createTextNode("["),
          setup.DOM.span(
            {
              "data-tooltip":
                "You need at least ${mod} pieces of equipment with this to get the trait",
            },
            `${fract} of`,
          ),
          trait.repJSX(),
          document.createTextNode("]"),
        );
      }
    }

    if (!inner_fragments_front.length && !inner_fragments_back.length) {
      return null;
    }
    const fragment = document.createDocumentFragment();
    fragment.append(...inner_fragments_front);
    fragment.append(...inner_fragments_back);
    return fragment;
  }

  getTraitMods(): Record<TraitKey, number> {
    return this.trait_key_mods;
  }

  getTags(): string[] {
    return this.tags;
  }

  getValue(): number {
    return this.value;
  }

  getSellValue(): number {
    return Math.floor(this.getValue() * setup.MONEY_SELL_MULTIPLIER);
  }

  getSluttiness(): number {
    return this.sluttiness;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    const texts = this.getTexts();
    return texts.description || "";
  }

  getSlot(): EquipmentSlot {
    return setup.equipmentslot[this.slot_key];
  }

  getEquippedNumber(): number {
    let sets = State.variables.armory.getEquipmentSets();
    let slot = this.getSlot();
    let count = 0;
    for (let i = 0; i < sets.length; ++i) {
      if (sets[i].getEquipmentAtSlot(slot) == this) ++count;
    }
    return count;
  }

  getSpareNumber(): number {
    return State.variables.armory.getEquipmentCount(this);
  }

  getUnitRestrictions(): Restriction[] {
    return this.unit_restrictions;
  }

  isCanEquip(unit: Unit): boolean {
    return setup.RestrictionLib.isUnitSatisfy(unit, this.getUnitRestrictions());
  }

  /**
   * Whether the equipment renders the bodypart useless
   */
  isMakeBodypartUseless(): boolean {
    return this.getTags().includes("banuse");
  }

  /**
   * Whether this equipment covers the bodypart
   */
  isCovering(): boolean {
    return this.getTags().includes("covering");
  }

  isSpecial(): boolean {
    // whether has any special, non-job requirements
    for (const requirement of this.getUnitRestrictions()) {
      if (!(requirement instanceof setup.qresImpl.Job)) {
        return true;
      }
    }
    return false;
  }

  text(): EquipmentTexts {
    return this.texts;
  }

  getTexts(): EquipmentTexts {
    return this.texts;
  }

  isBasic(): boolean {
    return this.getTags().includes("basic");
  }

  static cmp(equipment1: Equipment, equipment2: Equipment): number {
    return equipment1.order_key - equipment2.order_key;
  }
}
