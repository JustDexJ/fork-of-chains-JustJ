import { TwineClass } from "./_TwineClass";
import type { Unit, UnitKey } from "./unit/Unit";

/**
 * Will be assigned to $bodyshift
 * Tracks units that occupies two bodies or more. This is handled using bodyswaps.
 */
export class Bodyshift extends TwineClass {
  /**
   * Mapping of: unit_key -> unit_key
   */
  unit_bodyswap_map: Record<UnitKey, UnitKey> = {};

  constructor() {
    super();
  }

  /**
   * Deletes a unit completely from the records.
   */
  deleteUnit(unit: Unit) {
    if (unit.key in this.unit_bodyswap_map) {
      // also delete the other body
      const target = this.getBody(unit);
      delete this.unit_bodyswap_map[unit.key];
      target.checkDelete();
    }
  }

  /**
   * Registers a bodyshifter
   */
  registerBodyshifter(unit: Unit, body: Unit) {
    if (unit.key in this.unit_bodyswap_map)
      throw new Error(`unit ${unit.key} is already a bodyshifter!`);
    this.unit_bodyswap_map[unit.key] = body.key;

    // grant the unit bodyshifter perk
    setup.qc
      .PerkChoice(
        "unit",
        setup.trait.perk_unstable_bodyshifter,
        /* no learn = */ true,
      )
      .apply(setup.costUnitHelper(unit));
  }

  /**
   * Get the unit's other body
   */
  getBody(unit: Unit) {
    if (!(unit.key in this.unit_bodyswap_map))
      throw new Error(`unit ${unit.key} is not a bodyshifter!`);
    return State.variables.unit[this.unit_bodyswap_map[unit.key]];
  }

  /**
   * Do a bodyshifting
   */
  bodyshift(unit: Unit) {
    if (!(unit.key in this.unit_bodyswap_map))
      new Error(`unit ${unit.key} is not a bodyshifter!`);
    const target = this.getBody(unit);
    State.variables.notification.disable();
    setup.qcImpl.Bodyswap.doBodySwap(unit, target);
    State.variables.notification.enable();
  }

  isBodyshifter(unit: Unit): boolean {
    return unit.key in this.unit_bodyswap_map;
  }

  /**
   * Is this unit the spare body of another unit?
   */
  isSpareBody(unit: Unit): boolean {
    return Object.values(this.unit_bodyswap_map).includes(unit.key);
  }
}
