/**
 * ContentTemplate.ts
 * ------------------
 * This module defines the ContentTemplate class, which provides a base for content/quest templates in the game.
 * It handles validation, author info parsing, tag management, actor unit group mapping, and difficulty assignment.
 *
 * Key Responsibilities:
 * - Validate and initialize all template properties.
 * - Parse and normalize author info.
 * - Validate, sort, and manage tags.
 * - Map actor names to unit group keys/objects.
 * - Provide extensibility for subclasses (event, quest, etc.).
 *
 * Best Practices:
 * - Use explicit type annotations for all parameters and properties.
 * - Throw clear errors for invalid input.
 * - Keep all validation and parsing logic encapsulated in the constructor.
 * - Document all public methods and properties.
 */

import { TwineClass } from "../_TwineClass";
import type { ContactKey } from "../contact/Contact";
import type { ContactTemplate } from "../contact/ContactTemplate";
import type { QuestDifficulty } from "../quest/QuestDifficulty";
import { TraitHelper, type TraitKey } from "../trait/Trait";
import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

/**
 * {actorname: unitgroup.x, actorname: 'x', actorname: [res1, res2]}, unit generated/randomly taken
 *  - if unitgroup: will be taken from there.
 *  - if [res1, res2], will be taken from your slavers that satisfy these
 * the first entry will be considered the primary actor
 */
export type ActorUnitgroupsInit = {
  [actorname in string]?:
    | UnitGroup
    | UnitGroupKey
    | { type: "unitgroup"; key: UnitGroupKey }
    | ContactTemplate
    | { type: "contact"; key: ContactKey }
    | Restriction[]
    | null;
};

export type ActorUnitgroupKeyMap = {
  [actorname in string]?:
    | {
        type: "unitgroup";
        key: UnitGroupKey;
      }
    | {
        type: "contact";
        key: ContactKey;
      }
    | {
        type: "companyunit";
        val: Restriction[];
      }
    | null;
};

export type ResolvedActorUnitgroupKeyMap = {
  [actorname in string]?: ContactTemplate | UnitGroup | Restriction[] | null;
};

/**
 * Base class of QuestTemplate, OpportunityTemplate and other content types.
 *
 * ContentTemplate defines the structure and behavior of a content/quest template,
 * including tags, author, actor unit groups, and difficulty.
 */
export abstract class ContentTemplate<
  K extends string = string,
> extends TwineClass {
  key: K;
  name: string;
  author: AuthorInfo;
  tags: string[];
  actor_unitgroup_key_map: ActorUnitgroupKeyMap;
  difficulty: QuestDifficulty;

  /**
   * Constructs a new ContentTemplate instance, validates input, and initializes all properties.
   * Throws if required fields are missing or invalid.
   *
   * @param key - Unique key for this template.
   * @param name - Display name for the template.
   * @param author - Author info (string or {name, url}).
   * @param tags - Array of tags for this template.
   * @param actor_unitgroups - Actor-to-unitgroup mapping.
   * @param difficulty - Difficulty level for the template.
   */
  constructor(
    key: string,
    name: string,
    author: AuthorInfo | string,
    tags: string[],
    actor_unitgroups: ActorUnitgroupsInit | undefined,
    difficulty: QuestDifficulty,
  ) {
    super();
    if (!key) throw new Error("quest key cannot be null");
    this.key = key as K;
    if (name === null || name === undefined)
      throw new Error(`Name of quest ${key} cannot be null`);
    this.name = name;
    // Defensive: ensure author is string or {name, url}
    this.author = setup.QuestTemplate.parseAuthorInfo(author);
    if (!Array.isArray(tags))
      throw new Error(
        `Tags of quest ${key} must be an array. E.g., ['transformation']. Put [] for no tags.`,
      );
    // Cache tag keys for performance
    const questTagKeys = Object.keys(setup.QUESTTAGS);
    // Validate and sort tags in a single pass
    this.tags = tags.slice(); // avoid mutating input
    for (let i = 0; i < this.tags.length; ++i) {
      if (!questTagKeys.includes(this.tags[i])) {
        throw new Error(
          `${i}-th tag (${this.tags[i]}) of quest ${key} not recognized. Please check spelling and compare with the tags in src/scripts/classes/quest/questtags.js`,
        );
      }
    }
    this.tags.sort((a, b) => questTagKeys.indexOf(a) - questTagKeys.indexOf(b));
    if (actor_unitgroups) {
      this.actor_unitgroup_key_map =
        setup.ActorHelper.parseMap(actor_unitgroups);
    } else {
      this.actor_unitgroup_key_map = {};
    }
    this.difficulty = difficulty;
  }

  get TYPE(): ContentType {
    throw Error("unreachable");
  }

  /**
   * Returns the template object (to be overridden by subclasses).
   */
  getTemplate(): null {
    return null;
  }

  /**
   * Returns the parsed author info object.
   */
  getAuthor(): { name: string; url?: string } {
    return this.author;
  }

  /**
   * Returns the tags associated with this template.
   */
  getTags(): string[] {
    return this.tags;
  }

  /**
   * Returns the difficulty level for this template.
   */
  getDifficulty(): QuestDifficulty {
    return this.difficulty;
  }

  /**
   * Returns the display name for this template.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the actor unit groups for this template, parsed from the key map.
   */
  getActorUnitGroups(): Record<string, any> {
    return setup.ActorHelper.parseUnitGroups(this.actor_unitgroup_key_map);
  }

  /**
   * Returns the subraces directly involved in this quest, based on actor unit groups.
   */
  getActorSubraces(): Trait[] {
    const subraces = TraitHelper.getAllTraitsOfTags(["subrace"]);
    const unit_groups = this.getActorUnitGroups();
    const found: { [k in TraitKey]?: boolean } = {};
    for (const group of Object.values(unit_groups)) {
      if (group instanceof setup.UnitGroup) {
        const pools_objs = group.getUnitPools();
        const races: { [k in TraitKey]?: boolean } = {};
        for (const pool_obj of pools_objs) {
          const pool = Array.isArray(pool_obj) ? pool_obj[0] : pool_obj;
          let subrace = null;
          for (const subrace_test of subraces) {
            if (pool.key.startsWith(subrace_test.key)) {
              subrace = subrace_test;
              break;
            }
          }
          if (subrace) {
            races[subrace.key] = true;
          }
        }
        if (Object.keys(races).length == 1) {
          found[objectKeys(races)[0]] = true;
        }
      }
    }
    return objectKeys(found).map((key) => setup.trait[key]);
  }

  /**
   * Returns the result job for a given actor name (to be implemented in subclasses).
   */
  getActorResultJob(actor_name: string): any {
    return null;
  }

  getWeeks?(): number;
}
