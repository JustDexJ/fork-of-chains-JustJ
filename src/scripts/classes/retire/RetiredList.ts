// special. Will be assigned to State.variables.retiredlist

import { TwineClass } from "../_TwineClass";
import type { Unit } from "../unit/Unit";
import type { Living, LivingKey } from "./Living";

export class RetiredList extends TwineClass {
  /**
   * dictionary of unit keys to their living
   */
  unit_key_to_living_key: { [k in UnitKey]?: LivingKey } = {};

  constructor() {
    super();
  }

  isRetired(unit: Unit): boolean {
    return unit.key in this.unit_key_to_living_key;
  }

  /** When calling this, unit MUST be retired. */
  getLiving(unit: Unit): Living {
    if (!unit.isRetired())
      throw new Error(
        `Can only get living of retired units, not ${unit.getName()}!`,
      );
    return setup.living[this.unit_key_to_living_key[unit.key]!];
  }

  getUnits(): Unit[] {
    return objectKeys(this.unit_key_to_living_key).map(
      (key) => State.variables.unit[key],
    );
  }

  retire(unit: Unit): void {
    if (unit.isRetired())
      throw new Error(`Unit ${unit.getName()} already retired!`);
    if (unit.getJob() != setup.job.slaver)
      throw new Error(`Can only retire slavers, not ${unit.getName()}!`);

    // first remove from company
    State.variables.company.player.removeUnit(unit);

    // then retire properly by giving them a living
    const living = setup.Living.getLiving(unit);
    this.unit_key_to_living_key[unit.key] = living.key;

    // finally, add history
    unit.addHistory("retired.");
    unit.resetCache();
  }

  /**
   * Remove unit from retired list. Can go in two ways. If not followed up, unit is just gone. Otherwise,
   * can put unit to slaver pool back, for example.
   */
  unretire(unit: Unit) {
    if (!unit.isRetired())
      throw new Error(
        `Cannot retire ${unit.getName()} because they are not retired`,
      );
    delete this.unit_key_to_living_key[unit.key];
    unit.checkDelete();
  }

  /**
   * Returns the maximum number of units that your guest rooms can track
   */
  getMaxTrackedUnits(): number {
    let level;
    if (State.variables.fort.player.isHasBuilding(setup.buildingtemplate.inn)) {
      level = State.variables.fort.player
        .getBuilding(setup.buildingtemplate.inn)!
        .getLevel()!;
    } else {
      level = 0;
    }
    return level * setup.FORT_GUEST_ROOM_CAPACITY_PER_LEVEL;
  }

  /**
   * Whether this particular unit can be retired
   */
  isCanRetire(unit: Unit): boolean {
    if (unit.isRetired()) {
      // already retired
      return false;
    }

    if (unit.isInjured()) {
      // injured unit cannot retire
      return false;
    }

    if (this.getUnits().length >= this.getMaxTrackedUnits()) {
      // already too many retirees
      return false;
    }

    if (!unit.isHasTrait(setup.trait.join_senior)) {
      // only senior slavers can retire
      return false;
    }

    return unit.isCanBeDismissed();
  }
}
