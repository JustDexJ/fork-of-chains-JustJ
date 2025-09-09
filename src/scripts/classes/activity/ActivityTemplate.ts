import {
  ContentTemplate,
  type ActorUnitgroupsInit,
} from "../content/ContentTemplate";
import type { Rarity, RarityKey } from "../deck/Rarity";
import type { QuestDifficultyKey } from "../quest/QuestDifficulty";
import type { RoomInstance } from "../room/RoomInstance";
import type { RoomTemplate, RoomTemplateKey } from "../room/RoomTemplate";
import type { TraitKey } from "../trait/Trait";
import type { ActivityInstance } from "./ActivityInstance";

export const activitytemplate: Registry<ActivityTemplate> = {};

export type ActivityTemplateKey = BrandedType<string, "ActivityTemplateKey">;

export interface ActivityTemplateDefinition {
  key: string;
  name: string;
  /** who wrote this quest? */
  author: AuthorInfo;
  /** list of tags to filter content. See list of available tags at src/scripts/classes/quest/questtags.js */
  tags: string[];
  /**
   * {actorname: unitgroup.x, actorname: 'x', actorname: [res1, res2]}, unit generated/randomly taken
   *  - if unitgroup: will be taken from there.
   *  - if [res1, res2], will be taken from your slavers that satisfy these
   * the first entry will be considered the primary actor
   */
  actors: ActorUnitgroupsInit;
  /** units with this traits would prefer this activity, increasing chance */
  critical_traits: TraitKey[];
  /** units with this traits would not prefer this activity, reducing chance */
  disaster_traits: TraitKey[];
  /** list that governs whether quest can be generated or not, if any. E.g., NeedItem(xxx) */
  restrictions: Restriction[];
  rarity: RarityKey;
  dialogues: DialogueRaw[];
  /** list of room templates this can take place in */
  room_templates: RoomTemplateKey[];

  /** used only for temporary activites created using the devtool */
  devtool?: boolean;
}

export class ActivityTemplate extends ContentTemplate<ActivityTemplateKey> {
  critical_trait_keys: TraitKey[];
  disaster_trait_keys: TraitKey[];
  restrictions: Restriction[];
  rarity: Rarity;
  dialogues: Dialogue[];
  room_template_keys: RoomTemplateKey[];

  constructor(def: ActivityTemplateDefinition) {
    super(
      def.key,
      def.name,
      def.author,
      def.tags,
      def.actors,
      setup.qdiff["normal40" as QuestDifficultyKey],
    );

    // append not on activity on the unit groups
    for (const group of Object.values(this.actor_unitgroup_key_map)) {
      if (group && group.type == "companyunit") {
        if (!def.devtool) {
          group.val.push(setup.qres.NotYou(), setup.qres.NotOnActivity());
          if (
            !setup.Living.isRestrictionsAllowRetired(group.val) &&
            group.val.filter((res) => res instanceof setup.qresImpl.IsInjured)
              .length == 0
          ) {
            group.val.push(setup.qres.Available());
          }
        } else {
          group.val = group.val.filter(
            (res) =>
              !(res instanceof setup.qresImpl.Home) &&
              !(res instanceof setup.qresImpl.NotYou) &&
              !(res instanceof setup.qresImpl.NotOnActivity) &&
              !(res instanceof setup.qresImpl.Available),
          );
        }
      }
    }

    if (!Array.isArray(this.getPrimaryActorRestrictions())) {
      throw new Error(
        `First actor for activity ${this.key} must be a company unit!`,
      );
    }

    if (!Object.keys(def.actors).length) {
      throw new Error(`Activity ${this.key} missing actor!`);
    }
    if (!Array.isArray(Object.values(def.actors)[0])) {
      throw new Error(`Primary actor for ${this.key} must be a slaver!`);
    }

    if (!Array.isArray(def.critical_traits)) {
      throw new Error(
        `Critical Traits must be an array for Activity ${this.key}`,
      );
    }
    if (!Array.isArray(def.disaster_traits)) {
      throw new Error(
        `Critical Traits must be an array for Activity ${this.key}`,
      );
    }

    this.critical_trait_keys = def.critical_traits;
    if (this.critical_trait_keys.filter((key) => !key).length) {
      throw new Error(`Undefined critical trait for Activity ${this.key}`);
    }

    this.disaster_trait_keys = def.disaster_traits;
    if (this.disaster_trait_keys.filter((key) => !key).length) {
      throw new Error(`Undefined disaster trait for Activity ${this.key}`);
    }

    this.restrictions = def.restrictions;
    if (!Array.isArray(def.restrictions)) {
      throw new Error(`Restrictions must be an array for Activity ${this.key}`);
    }

    for (const restriction of def.restrictions) {
      if (!(restriction instanceof setup.Restriction)) {
        throw new Error(`Restriction ${restriction} isnt' a restriction`);
      }
    }

    this.rarity = setup.rarity[def.rarity];
    if (!(this.rarity instanceof setup.Rarity)) {
      throw new Error(`Rarity for ${this.key} must be a Rarity`);
    }

    if (!Array.isArray(def.dialogues)) {
      throw new Error(`Dialogue must be an array`);
    }
    for (let i = 0; i < def.dialogues.length; ++i) {
      const dialogue = def.dialogues[i];
      if (Array.isArray(dialogue.texts)) {
        // same text for all.
        const texts_base = dialogue.texts;
        dialogue.texts = {
          friendly: texts_base,
          bold: texts_base,
          cool: texts_base,
          witty: texts_base,
          debauched: texts_base,
        };
      } else {
        if (
          Object.values(dialogue.texts).length !=
          Object.values(setup.speech).length
        ) {
          throw new Error(`Missing speech type in dialogue!`);
        }
        for (const text of Object.keys(dialogue.texts)) {
          if (!(text in setup.speech)) {
            throw new Error(
              `Missing speech type ${text} in dialogue for Activity ${this.key}`,
            );
          }
        }
        if (!(dialogue.actor in this.actor_unitgroup_key_map)) {
          throw new Error(
            `Missing dialogue actor ${dialogue.actor} from Activity ${this.key}`,
          );
        }
      }
    }
    this.dialogues = def.dialogues as Dialogue[];

    if (!Array.isArray(def.room_templates)) {
      throw new Error(`Room Templates must be an array`);
    }
    this.room_template_keys = def.room_templates;

    if (def.key in setup.activitytemplate)
      throw new Error(`Activity Base ${def.key} already exists`);
    setup.activitytemplate[def.key as ActivityTemplateKey] = this;
  }

  override get TYPE() {
    return "activity" as const;
  }

  sanityCheck() {
    if (!this.name) return "Name cannot be null";

    //for (let i = 0; i < this.restrictions.length; ++i) {
    //  if (
    //    !setup.QuestTemplate.isCostActorIn(
    //      this.restrictions[i],
    //      { a: "" },
    //      this.actor_unitgroup_key_map,
    //    )
    //  ) {
    //    return `Actor ${this.restrictions[i].actor_name} not found in the ${i}-th quest restriction`;
    //  }
    //}

    if (!Object.keys(this.actor_unitgroup_key_map).length) {
      return `Must have at least one actor!`;
    }
    if (!Array.isArray(Object.values(this.actor_unitgroup_key_map)[0])) {
      return `Primary actor must be a slaver!`;
    }
    if (!this.dialogues.length) {
      return `Must have at least one line of dialogue!`;
    }

    return null;
  }

  rep() {
    return this.getName();
  }

  getDialogues(): Dialogue[] {
    return this.dialogues;
  }

  getDialoguesDevTool(): Dialogue[] {
    const dialogues = setup.deepCopy(this.getDialogues());
    for (const dialogue of dialogues) {
      const texts = dialogue.texts;
      const frend_string = JSON.stringify(texts.friendly);
      if (
        JSON.stringify(texts.bold) == frend_string &&
        JSON.stringify(texts.cool) == frend_string &&
        JSON.stringify(texts.witty) == frend_string &&
        JSON.stringify(texts.debauched) == frend_string
      ) {
        texts.bold = [""];
        texts.cool = [""];
        texts.witty = [""];
        texts.debauched = [""];
      }
    }
    return dialogues;
  }

  makeProperFromDevTool(): void {
    for (const dialogue of this.getDialogues()) {
      for (const speech of Object.values(setup.speech)) {
        const speechKey = speech.key;
        const texts = dialogue.texts[speechKey];
        if (texts.length == 1 && texts[0] == "") {
          dialogue.texts[speechKey] = dialogue.texts.friendly;
        }
      }
    }
  }

  getRoomTemplates(): RoomTemplate[] {
    return this.room_template_keys.map((key) => setup.roomtemplate[key]);
  }

  getRarity(): Rarity {
    return this.rarity;
  }

  getPrerequisites(): Restriction[] {
    return this.restrictions;
  }

  getPrimaryActorRestrictions(): Restriction[] {
    return Object.values(this.getActorUnitGroups())[0];
  }

  getPrimaryActorName(): string {
    return Object.keys(this.getActorUnitGroups())[0];
  }

  getAvailableRoomIfAny(unit?: Unit): RoomInstance | null {
    const room_templates = this.getRoomTemplates();
    for (const template of room_templates) {
      const avail = State.variables.roomlist.getRoomInstances({
        template: template,
      });
      setup.rng.shuffleArray(avail);
      for (const test of avail) {
        if (!State.variables.activitylist.getActivityAt(test)) {
          return test;
        }
      }
    }
    return null;
  }

  isCanGenerateFor(unit: Unit): boolean {
    if (State.variables.settings.isBanned(this.getTags())) return false;

    if (State.variables.calendar.isOnCooldown(this)) return false;

    const primary_restrictions = this.getPrimaryActorRestrictions();
    if (!setup.RestrictionLib.isUnitSatisfy(unit, primary_restrictions)) {
      return false;
    }

    const actor_unit_groups = this.getActorUnitGroups();
    if (!setup.RestrictionLib.isActorUnitGroupViable(actor_unit_groups))
      return false;

    const restrictions = this.getPrerequisites();
    if (!setup.RestrictionLib.isPrerequisitesSatisfied(this, restrictions)) {
      return false;
    }

    if (!this.getAvailableRoomIfAny(unit)) {
      return false;
    }

    return true;
  }

  getCriticalTraits(): Trait[] {
    return this.critical_trait_keys.map((key) => setup.trait[key]);
  }

  getDisasterTraits(): Trait[] {
    return this.disaster_trait_keys.map((key) => setup.trait[key]);
  }

  computeWeight(unit: Unit): number {
    const crits = this.getCriticalTraits().filter((trait) =>
      unit.isHasTraitExact(trait),
    ).length;
    const disasters = this.getDisasterTraits().filter((trait) =>
      unit.isHasTraitExact(trait),
    ).length;
    const crit_mult = setup.ACTIVITY_CHANCE_MULTIPLIER_CRIT_TRAITS;
    const disaster_mult = setup.ACTIVITY_CHANCE_MULTIPLIER_DISASTER_TRAITS;
    return (
      crit_mult[Math.min(crits, crit_mult.length - 1)] *
      disaster_mult[Math.min(disasters, disaster_mult.length - 1)]
    );
  }

  getAllActorNames(): string[] {
    return Object.keys(this.getActorUnitGroups());
  }

  makeInstance(unit?: Unit): ActivityInstance | null {
    const room = this.getAvailableRoomIfAny(unit);
    if (!room) {
      // no room
      return null;
    }

    // generate actors for this
    const actor_name_primary = this.getPrimaryActorName();

    const default_actors: ActorUnitMap = {};
    if (unit) {
      default_actors[actor_name_primary] = unit;
    }

    const actors = setup.QuestPool.instantiateActors(this, default_actors);
    if (!actors) {
      // not found
      return null;
    }

    return new setup.ActivityInstance(this, actors, room);
  }

  debugMakeInstance(efficient_mode?: boolean) {
    State.variables.activitylist.deleteAllActivities();

    // try to make instance normally first
    const instance = this.makeInstance(undefined);
    if (instance) {
      return instance;
    }

    let room = this.getAvailableRoomIfAny(undefined);
    if (!room) {
      // force it
      room = setup.rng.choice(State.variables.roomlist.getRoomInstances());
    }

    // generate actors for this
    const actors = setup.DebugActor.getActors(
      this.getActorUnitGroups(),
      efficient_mode,
    );

    // instantiate the activity
    return new setup.ActivityInstance(this, actors, room);
  }
}
