/**
 * Will be assigned to $leave.
 * Tracks units that are "on leave" or "away" from your company for
 * personal or custom reasons.
 */

import { TwineClass } from "./_TwineClass";
import type { UnitKey } from "./unit/Unit";

export class Leave extends TwineClass {
  /**
   * unit_key: {duration_left: int, reason: string}
   */
  unit_leave_map: {
    [k in UnitKey]?: { duration_left?: number; reason: string };
  } = {};

  constructor() {
    super();
  }

  /**
   * deletes a unit completely from the records.
   */
  deleteUnit(unit: Unit) {
    if (unit.key in this.unit_leave_map) delete this.unit_leave_map[unit.key];
  }

  /**
   * Marks that this unit is on leave. Duration can be left empty, which means that
   * the unit will remain on leave until $leave.return(unit) is called.
   * @param reason The reason. <<The unit>> {insert reason here}.
   * @param duration How long will this unit be gone? 1 means will return end of the week. Omitted = infinite
   */
  leave(unit: Unit, reason: string, duration?: number) {
    if (unit.key in this.unit_leave_map) {
      throw new Error(`Unit ${unit.key} is already on leave!`);
    }
    if (duration !== undefined && duration <= 0)
      throw new Error(`duration of leave cannot be 0 or negative`);

    this.unit_leave_map[unit.key] = {
      duration_left: duration,
      reason: reason,
    };
    if (unit.isYourCompany()) {
      let base = "";
      const parsed_reason = this.getLeaveReason(unit);
      if (duration) {
        base = `a|Rep ${parsed_reason}, and will be unavailable for ${duration} weeks.`;
      } else {
        base = `a|Rep ${parsed_reason}, and will be unavailable for some time.`;
      }
      setup.notify(base, { a: unit });
    }
  }

  /**
   * Forcefully return this unit to your company.
   */
  return(unit: Unit) {
    if (unit.key in this.unit_leave_map) {
      delete this.unit_leave_map[unit.key];
      if (unit.isYourCompany()) {
        setup.notify(`a|Rep a|is now available again.`, { a: unit });
      }
    }
  }

  /**
   * Is the unit on leave right now?
   */
  isOnLeave(unit: Unit): boolean {
    return unit.key in this.unit_leave_map;
  }

  isLeaveDurationUnknown(unit: Unit): boolean {
    if (!(unit.key in this.unit_leave_map)) {
      return false;
    }
    return !this.unit_leave_map[unit.key]!.duration_left;
  }

  getRemainingLeaveDuration(unit: Unit): number {
    if (!(unit.key in this.unit_leave_map)) {
      return 0;
    }
    if (this.isLeaveDurationUnknown(unit)) {
      throw new Error(`remaining duration unknown`);
    }
    return this.unit_leave_map[unit.key]!.duration_left ?? 0;
  }

  /**
   * Why is the unit busy? "The unit" (insert return value here).
   */
  getLeaveReason(unit: Unit): string {
    if (!(unit.key in this.unit_leave_map))
      throw new Error(`unit not on leave and has no reason`);
    const reason = this.unit_leave_map[unit.key]!.reason;
    return setup.Text.replaceUnitMacros(reason, {
      a: unit,
    });
  }

  /**
   * Do end of week updates
   */
  advanceWeek() {
    for (const [unit_key, record] of objectEntries(this.unit_leave_map)) {
      if (record && record.duration_left) {
        record.duration_left -= 1;
        if (record.duration_left <= 0) {
          this.return(State.variables.unit[unit_key as UnitKey]);
        }
      }
    }
  }
}
