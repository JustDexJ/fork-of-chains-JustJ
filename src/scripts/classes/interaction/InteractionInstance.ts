import { TwineClass } from "../_TwineClass";
import type { Unit, UnitKey } from "../unit/Unit";
import type {
  InteractionTemplate,
  InteractionTemplateKey,
} from "./InteractionTemplate";

export class InteractionInstance extends TwineClass {
  interaction_key: InteractionTemplateKey;
  unit_key: UnitKey;

  constructor(interaction: InteractionTemplate, unit: Unit) {
    super();

    if (!interaction) {
      throw new Error(`Interaction cannot be null`);
    }

    this.interaction_key = interaction.key;
    this.unit_key = unit.key;

    if (unit.isSlaver()) {
      State.variables.statistics.add("interactions_slaver", 1);
    } else if (unit.isSlave()) {
      State.variables.statistics.add("interactions_slave", 1);
    }
  }

  getName(): string {
    return this.getInteraction().getName();
  }

  getInteraction(): InteractionTemplate {
    return setup.interaction[this.interaction_key];
  }

  getTemplate(): InteractionTemplate {
    return this.getInteraction();
  }

  getUnit(): Unit {
    return State.variables.unit[this.unit_key];
  }

  applyCosts() {
    setup.RestrictionLib.applyAll(this.getInteraction().getCosts(), this);
  }

  applyRewards() {
    setup.RestrictionLib.applyAll(this.getInteraction().getRewards(), this);
  }

  getActorsList(): ActorUnitList {
    // return [['actor1', unit], ['actor2', unit], ...]
    return [["target", this.getUnit()]];
  }

  /** Returns object where object.actorname = unit, if any. */
  getActorObj(): ActorUnitMap {
    return Object.fromEntries(this.getActorsList()) as ActorUnitMap;
  }

  getActorUnit(actor_name: string): Unit {
    if (actor_name == "target") return this.getUnit();
    throw new Error(`Unrecognized actor ${actor_name}`);
  }

  debugKillActors() {
    setup.QuestInstance.debugKillActorsDo(this.getActorsList());
  }
}
