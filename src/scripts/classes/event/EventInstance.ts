import { TwineClass } from "../_TwineClass";
import type { Unit } from "../unit/Unit";
import type { EventTemplate, EventTemplateKey } from "./EventTemplate";

export class EventInstance extends TwineClass {
  event_key: EventTemplateKey;
  actor_unit_key_map: ActorUnitKeyMap = {};
  seed?: number;

  constructor(event: EventTemplate, actor_assignment: ActorUnitMap) {
    super();

    this.event_key = event.key;
    this.actor_unit_key_map = {};
    for (let actor_name in actor_assignment) {
      const unit = actor_assignment[actor_name];
      this.actor_unit_key_map[actor_name] = unit.key;

      if (unit) {
        unit.setDebugInfo(event);
      }
    }
  }

  getEvent(): EventTemplate {
    return setup.event[this.event_key];
  }
  getTemplate(): EventTemplate {
    return this.getEvent();
  }

  getName(): string {
    return this.getEvent().name;
  }

  /**
   * @returns like [['actor1', unit], ['actor2', unit], ...]
   */
  getActorsList(): ActorUnitList {
    const result: ActorUnitList = [];
    for (let actor_key in this.actor_unit_key_map) {
      let unit = State.variables.unit[this.actor_unit_key_map[actor_key]];
      result.push([actor_key, unit]);
    }
    return result;
  }

  /** Returns object where object.actorname = unit, if any. */
  getActorObj(): ActorUnitMap {
    return Object.fromEntries(this.getActorsList()) as ActorUnitMap;
  }

  getActorUnit(actor_name: string): Unit {
    return State.variables.unit[this.actor_unit_key_map[actor_name]];
  }

  applyRewards() {
    setup.RestrictionLib.applyAll(this.getEvent().getRewards(), this);
  }

  /**
   * Get a random number for this event that remains the same always.
   */
  getSeed(): number {
    if (this.seed) return this.seed;
    this.seed = 1 + Math.floor(Math.random() * 999999997);
    return this.seed;
  }

  debugKillActors() {
    setup.QuestInstance.debugKillActorsDo(this.getActorsList());
  }
}
