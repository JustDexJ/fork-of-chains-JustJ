import "../util/SetupUtil.js";

// load SVG as raw string (cannot be loaded at runtime from localhost...)
import worldmap_regions_svg from "../../assets/worldmap-regions.svg?raw";
import { isDefinitionArgs } from "../util/TypeUtil.js";
import { TwineClass } from "./_TwineClass.js";

export type LoreKey = BrandedType<string, "LoreKey">;

export interface LoreDefinition {
  key: string;
  name: string;
  tags?: string[];
  restrictions?: Restriction[];
  text?: string;
}

/**
 * Describes a piece of game lore, such as location, region, or an important person.
 */
export class Lore extends TwineClass {
  key: LoreKey;
  text_passage: string;
  text: string | undefined;
  name: string;
  tags: readonly string[];
  restrictions: readonly Restriction[];

  constructor(
    ...args:
      | [Readonly<LoreDefinition>]
      | [key: string, name: string, tags: string[], restrictions: Restriction[]]
  ) {
    super();

    let def: Readonly<LoreDefinition>;
    if (isDefinitionArgs(args)) {
      def = args[0];
    } else {
      const [key, name, tags, restrictions] = args;
      def = { key, name, tags, restrictions };
    }

    const key = def.key as LoreKey;

    this.key = key;
    this.name = def.name;
    this.tags = def.tags ?? [];
    this.restrictions = def.restrictions ?? [];
    this.name = def.name;
    if (def.text) {
      if (def.text.startsWith("::")) {
        this.text_passage = def.text.substring(2).trim();
      } else {
        this.text = def.text;
        this.text_passage = "";
      }
    } else {
      this.text_passage = `LORE_${key}`;
    }

    if (!Story.has(this.text_passage)) {
      throw new Error(
        `Passage ${this.text_passage} not found for lore ${key}!`,
      );
    }

    if (key in setup.lore) {
      throw new Error(`Duplicate lore ${key}`);
    }
    setup.lore[key] = this;
  }

  getName(): string {
    return this.name;
  }

  getTags(): readonly string[] {
    return this.tags;
  }

  getLoreText(): string {
    return this.text ?? Story.get(this.text_passage)?.text ?? "";
  }

  getRestrictions(): readonly Restriction[] {
    return this.restrictions;
  }

  /**
   * Is this piece of lore visible in the Library?
   */
  isVisible(): boolean {
    return setup.RestrictionLib.isPrerequisitesSatisfied(
      /* object = */ null,
      this.getRestrictions(),
    );
  }

  getRepMacro() {
    return "lorecardkey";
  }

  rep(is_uppercase?: boolean): string {
    if (!is_uppercase) {
      return setup.repMessage(this);
    } else {
      return setup.repMessage(
        this,
        undefined,
        undefined,
        this.getName().toUpperFirst(),
      );
    }
  }

  /**
   * Returns lore.rep() if the lore exists, or an error message if it does not.
   */
  static repLore(lore_key: LoreKey, is_uppercase?: boolean): string {
    const lore = setup.lore[lore_key];
    if (!lore) throw new Error(`Lore ${lore_key} not found!`);
    return lore.rep(is_uppercase);
  }

  static WORLDMAP_REGIONS_SVG = worldmap_regions_svg
    .replace("EDITOR_STYLES", "EDITOR_STYLES_DISABLED")
    .replace(
      'xlink:href="..%5C..%5Cdist%5Cimg%5Cnoembed%5Cmap.jpg"',
      `xlink:href="${setup.escapeHtml(setup.resolveImageUrl("img/noembed/map.jpg"))}"`,
    );
}
