import type { MenuKey } from "../filter/_filter";

export interface TagMetadata {
  type: string;
  title?: string;
  description: string;
  hide?: true;
}

/**
 * Static class to help tag related stuffs
 */
export class TagHelper {
  static TAG_INFO = {
    quest: {
      img_folder: "tag_quest",
    },
    opportunity: {
      img_folder: "tag_quest",
    },
    buildingtemplate: {
      img_folder: "tag_building",
    },
    buildinginstance: {
      img_folder: "tag_building",
    },
    room: {
      img_folder: "tag_room",
    },
    unitaction: {
      img_folder: "tag_unitaction",
    },
    lore: {
      img_folder: "tag_lore",
    },
    sexaction: {
      img_folder: "tag_sexaction",
    },
    trait: {
      img_folder: "tag_trait",
    },
  };

  static getTagsMap(menu: MenuKey): Record<string, TagMetadata> {
    const TAGS_map = {
      quest: setup.QUESTTAGS,
      opportunity: setup.QUESTTAGS,
      buildingtemplate: setup.BUILDING_TAGS,
      buildinginstance: setup.BUILDING_TAGS,
      unitaction: setup.TAG_UNITACTION,
      lore: setup.TAG_LORE,
      sexaction: setup.TAG_SEXACTION,
      trait: setup.TAG_TRAIT,
      room: setup.TAG_ROOM,
    } satisfies Record<string, Record<string, TagMetadata>>;
    if (!(menu in TAGS_map))
      throw new Error(`Unrecognized menu in tags: ${menu}`);
    return TAGS_map[menu as keyof typeof TAGS_map];
  }

  static getAllTagsOfType(menu: MenuKey, tag_type: string): string[] {
    const result = [];
    const all_tags = setup.TagHelper.getTagsMap(menu);
    for (const tag in all_tags) {
      if (all_tags[tag].type == tag_type) result.push(tag);
    }
    return result;
  }

  static tagRep(menu: MenuKey, tag: string, force?: boolean): string {
    const tag_map = setup.TagHelper.getTagsMap(menu);
    if (!(tag in tag_map)) throw new Error(`Unknown ${menu} tag: ${tag}`);

    const tagobj = tag_map[tag];
    if (!force && tagobj.hide) return "";

    const folder =
      setup.TagHelper.TAG_INFO[menu as keyof typeof setup.TagHelper.TAG_INFO]
        .img_folder;

    return setup.repImgIcon(`img/${folder}/${tag}.svg`, tagobj.description);
  }

  static tagRepLong(menu: MenuKey, tag: string): string {
    const tag_map = setup.TagHelper.getTagsMap(menu);
    if (!(tag in tag_map)) throw new Error(`Unknown ${menu} tag: ${tag}`);

    const tagobj = tag_map[tag];
    return `${setup.TagHelper.tagRep(menu, tag)}<span data-tooltip="${tagobj.description}">${tagobj.title}</span>`;
  }

  static getTagsRep(menu: MenuKey, tags: readonly string[]): string {
    const tag_map = setup.TagHelper.getTagsMap(menu);
    const taglist = Object.keys(tag_map);
    const tag_copy = tags.filter((tag) => true);
    tag_copy.sort((tag1, tag2) => {
      const idx1 = taglist.indexOf(tag1);
      const idx2 = taglist.indexOf(tag2);
      return idx1 - idx2;
    });
    return tag_copy.map((tag) => setup.TagHelper.tagRep(menu, tag)).join("");
  }

  static getQuestCardClass(tags: readonly string[]): string {
    let panorama = setup.QUESTTAGS_DEFAULT_PANORAMA;
    let border = "";
    for (const tag of tags) {
      if (tag in setup.QUESTTAGS_PANORAMA) {
        panorama =
          setup.QUESTTAGS_PANORAMA[
            tag as keyof typeof setup.QUESTTAGS_PANORAMA
          ];
      }
      if (tag in setup.QUESTTAGS_BORDER) {
        border =
          setup.QUESTTAGS_BORDER[tag as keyof typeof setup.QUESTTAGS_BORDER];
      }
    }
    return "questcardbase " + panorama + " " + border;
  }
}
