import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { RoomInstance, RoomInstanceKey } from "../room/RoomInstance";
import type { UnitKey } from "../unit/Unit";
import type { ActivityInstance, ActivityInstanceKey } from "./ActivityInstance";
import type { ActivityTemplate } from "./ActivityTemplate";

/**
 * Singleton at $activitylist
 */
export class ActivityList extends TwineClass {
  room_instance_key_to_activity_key: Record<
    RoomInstanceKey,
    ActivityInstanceKey
  > = {};

  unit_key_to_activity_key: Record<UnitKey, ActivityInstanceKey> = {};

  constructor() {
    super();
  }

  getAllActivityTemplateOfRarity(rarity: Rarity): ActivityTemplate[] {
    return Object.values(setup.activitytemplate).filter(
      (template) => template.getRarity() == rarity,
    );
  }

  generateActivity(unit: Unit): ActivityInstance | null {
    // How this works: pick a rarity, then find a random eligible activity with this rarity.
    // If doesnt exist, drop to a lower rarity and repeat.
    const rarities_to_try = setup.Rarity.getRandomRarityOrderWeighted();

    for (const rarity of rarities_to_try) {
      let acts = this.getAllActivityTemplateOfRarity(rarity)
        .filter((act) =>
          setup.RestrictionLib.isUnitSatisfy(
            unit,
            act.getPrimaryActorRestrictions(),
          ),
        )
        .map((act): [ActivityTemplate, number] => [
          act,
          act.computeWeight(unit),
        ])
        .filter((act) => act[1] > 0);
      let attempts = setup.ACTIVITY_MAX_ATTEMPT_PER_RARITY;
      while (acts.length && attempts) {
        attempts -= 1;
        const act = setup.rng.sampleArray(acts, /* normalize = */ true)!;
        acts = acts.filter((t) => t[0] != act);
        if (act.isCanGenerateFor(unit)) {
          // Try to generate this activity
          const instance = act.makeInstance(unit);
          if (instance) {
            return instance;
          }
        }
      }
    }
    return null;
  }

  deleteAllActivities() {
    for (const activity of Object.values(State.variables.activityinstance)) {
      activity.delete();
    }
  }

  advanceWeek() {
    this.deleteAllActivities();

    for (const unit of State.variables.company.player.getUnits({
      job: setup.job.slaver,
    })) {
      if (
        Math.random() < setup.ACTIVITY_CHANCE &&
        unit.isHome() &&
        !this.getActivityOf(unit)
      ) {
        this.generateActivity(unit);
      }
    }
  }

  removeUnitActivity(unit: Unit) {
    const activity = this.getActivityOf(unit);
    if (activity) {
      activity.delete();
    }
  }

  registerActivity(activity: ActivityInstance) {
    const room_key = activity.getRoomInstance().key;
    if (room_key in this.room_instance_key_to_activity_key) {
      throw new Error(`Duplicated activity on room ${room_key}`);
    }
    this.room_instance_key_to_activity_key[room_key] = activity.key;

    const units = activity.getActorsList();
    for (const [actor_name, unit] of units) {
      const unit_key = unit.key;
      if (this.unit_key_to_activity_key[unit_key]) {
        throw new Error(`Unit ${unit_key} already on an activity!`);
      }
      this.unit_key_to_activity_key[unit_key] = activity.key;
    }
  }

  unregisterActivity(activity: ActivityInstance) {
    const units = activity.getActorsList();
    for (const [actor_name, unit] of units) {
      const unit_key = unit.key;
      delete this.unit_key_to_activity_key[unit_key];
    }

    const room_key = activity.getRoomInstance().key;
    delete this.room_instance_key_to_activity_key[room_key];
  }

  _validateActivity(
    activity: ActivityInstance | null,
  ): ActivityInstance | null {
    if (activity) {
      // check all the slaver actors are still available
      const groups = activity.getTemplate().getActorUnitGroups();
      for (const [actorname, unit] of activity.getActorsList()) {
        if (Array.isArray(groups[actorname])) {
          if (!unit.isHome() && !unit.isRetired()) {
            activity.delete();
            return null;
          }
        }
      }
    }
    return activity || null;
  }

  getActivityOf(unit: Unit): ActivityInstance | null {
    return this._validateActivity(
      State.variables.activityinstance[this.unit_key_to_activity_key[unit.key]],
    );
  }

  getActivityAt(room: RoomInstance): ActivityInstance | null {
    return this._validateActivity(
      State.variables.activityinstance[
        this.room_instance_key_to_activity_key[room.key]
      ],
    );
  }
}
