import "../util/common.js";

// load SVG as raw string (cannot be loaded at runtime from localhost...)
import worldmap_regions_svg from "../../assets/worldmap-regions.svg";
import { TwineClass } from "./_TwineClass.js";

export type LoreKey = BrandedType<string, "LoreKey">;

/**
 * Describes a piece of game lore, such as location, region, or an important person.
 */
export class Lore extends TwineClass {
  key: LoreKey;
  description_passage: string;

  constructor(
    key: string,
    public name: string,
    public tags: string[],
    public restrictions: Restriction[],
  ) {
    super();

    this.key = key as LoreKey;
    this.description_passage = `LORE_${key}`;

    if (!Story.has(this.description_passage)) {
      throw new Error(
        `Passage ${this.description_passage} not found for lore ${key}!`,
      );
    }

    if (key in setup.lore) {
      throw new Error(`Duplicate lore ${key}`);
    }
    setup.lore[key as LoreKey] = this;
  }

  getName(): string {
    return this.name;
  }

  getTags(): string[] {
    return this.tags;
  }

  getDescriptionPassage(): string {
    return this.description_passage;
  }

  getRestrictions(): Restriction[] {
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

  rep(is_uppercase?: boolean): string {
    if (!is_uppercase) {
      return setup.repMessage(this, "lorecardkey");
    } else {
      return setup.repMessage(
        this,
        "lorecardkey",
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
