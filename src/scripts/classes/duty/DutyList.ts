import { TwineClass } from "../_TwineClass";
import { type DutyInstance } from "./DutyInstance";
import type { DutyTemplate, DutyTemplateKey } from "./DutyTemplate";

/**
 * Assigned to special variable $dutylist
 */
export class DutyList extends TwineClass {
  constructor() {
    super();
  }

  isHasDuty(template_or_key: DutyTemplate | DutyTemplateKey): boolean {
    return !!this.getDuty(template_or_key);
  }

  addDuty(duty_instance: DutyInstance): DutyInstance {
    if (!duty_instance) {
      throw new Error(`Duty instance must not be null`);
    }
    setup.notify(`New duty: ${duty_instance.rep()}`);
    return duty_instance;
  }

  /**
   * Deletes a duty. Will unassign it first, if necessary.
   */
  removeDuty(duty_instance: DutyInstance): void {
    // First, unassign the unit.
    if (duty_instance.getAssignedUnits().length) {
      duty_instance.unassignAllUnits();
    }

    // Then, remove the duty.
    duty_instance.delete();
  }

  getOpenDutiesCount(): number {
    return this.getDuties().filter((duty) => !duty.hasAssignedUnits()).length;
  }

  getDuties(): DutyInstance[] {
    return Object.values(State.variables.duty);
  }

  getDuty(
    template_or_key: DutyTemplate | DutyTemplateKey,
  ): DutyInstance | null {
    const template = resolveObject(template_or_key, setup.dutytemplate);
    const filtered = this.getDuties().filter(
      (duty) => duty.getTemplate() == template,
    );
    if (filtered.length) {
      return filtered[0];
    } else {
      return null;
    }
  }

  getUnitIfAvailable(
    template_or_key: DutyTemplate | DutyTemplateKey,
  ): Unit | null {
    const duty = this.getDuty(template_or_key);
    if (duty) return duty.getUnitIfAvailable();
    return null;
  }

  advanceWeek() {
    const duties = this.getDuties();

    let upkeep = 0;
    let replaces = 0;
    for (const duty of duties) {
      duty.advanceWeek();
      if (duty.isSpecialistActive()) {
        upkeep += duty.getSpecialistUpkeep();
        replaces += 1;
      }
    }

    if (upkeep) {
      setup.notify(
        `You paid ${setup.DOM.toString(setup.DOM.Util.money(upkeep))} to the contract specialists who are working in lieu of ${replaces} of your duty slavers`,
      );
      State.variables.company.player.substractMoney(upkeep);
    }
    return duties;
  }

  isViceLeaderAssigned(): boolean {
    const viceleader = State.variables.dutylist.getDuty(
      setup.dutytemplate.viceleader,
    );
    return !!(viceleader && viceleader.getAssignedUnit());
  }
}
