import { BUILDING_TAGS } from "./tag_building";
import type { TagMetadata } from "./TagHelper";

export const TAG_ROOM = {
  /* =========== */
  /* Hidden tags */
  /* =========== */
  hidename: {
    type: "hidden",
    title: "Hide name",
    description: "Hide name",
    hide: true,
  },

  hideskill: {
    type: "hidden",
    title: "Hide skills",
    description: "Hide skills",
    hide: true,
  },

  /* =========== */
  /* Differentiating tags */
  /* =========== */
  indoors: {
    type: "location",
    title: "Indoors",
    description: "Must be build indoors",
  },

  outdoors: {
    type: "location",
    title: "Indoors",
    description: "Must be build outdoors",
  },

  nodoor: {
    type: "unique",
    title: "Object",
    description: "Not a room and does not have an entrance",
  },

  passable: {
    type: "unique",
    title: "Passable",
    description: "Act like an empty space and can be a part of a path",
  },

  optional: {
    type: "unique",
    title: "Optional",
    description: "Can be optionally removed from your fort",
  },

  fixed: {
    type: "unique",
    title: "Fixed",
    description: "Cannot be moved",
  },
} satisfies Record<string, TagMetadata>;

// attach type tags from building tags
for (const [building_tag, tag_obj] of objectEntries(BUILDING_TAGS)) {
  if (tag_obj.type == "type") {
    if (building_tag in TAG_ROOM) {
      throw new Error(`Duplicated room/building tag: ${building_tag}`);
    }
    (TAG_ROOM as any)[building_tag] = tag_obj;
  }
}
