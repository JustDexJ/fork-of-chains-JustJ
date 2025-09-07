import { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplatePrestigeSlave extends DutyTemplate<DutyInstancePrestigeSlave> {
  constructor(args: DutyTemplateInit) {
    super(args);
  }

  computeUnitRawPrestige(unit: Unit) {
    return this.computeChanceForUnit(unit);
  }

  private computeTotalPrestige(duty_instance: DutyInstancePrestigeSlave) {
    let max_prestige = 0;
    let max_unit: UnitKey | null = null;
    for (const unit_key of duty_instance.unit_keys ?? []) {
      const unit = State.variables.unit[unit_key];
      const prestige = this.computeUnitRawPrestige(unit);
      if (prestige > max_prestige) {
        max_prestige = prestige;
        max_unit = unit.key;
      }
    }
    return { prestige: max_prestige, unit: max_unit };
  }

  override onAssign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.setCurrentPrestige(
      this.computeTotalPrestige(duty_instance).prestige,
    );
  }

  override onUnassign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.setCurrentPrestige(
      this.computeTotalPrestige(duty_instance).prestige,
    );
  }

  override advanceWeek(duty_instance: DutyInstancePrestigeSlave) {
    super.advanceWeek(duty_instance);

    // update prestige, if appropriate.
    if (duty_instance.hasAssignedUnits()) {
      const result = this.computeTotalPrestige(duty_instance);
      if (result.prestige != duty_instance.getCurrentPrestige()) {
        setup.notify(
          `The effectiveness of ${duty_instance.rep()} has changed.`,
        );
        duty_instance.setCurrentPrestige(result.prestige);
      }
    }
  }
}

export class DutyInstancePrestigeSlave extends DutyInstance {
  prestige = 0;

  constructor(args: ConstructorParameters<typeof DutyInstance>[0]) {
    super(args);
  }

  getCurrentPrestige(): number {
    return this.prestige;
  }

  setCurrentPrestige(prestige: number): void {
    const diff = prestige - this.prestige;
    this.prestige = prestige;
    if (diff) {
      State.variables.company.player.addPrestige(diff);
    }
  }
}
