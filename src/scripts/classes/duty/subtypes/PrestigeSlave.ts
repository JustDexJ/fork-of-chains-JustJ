import { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplatePrestigeSlave extends DutyTemplate<DutyInstancePrestigeSlave> {
  constructor(args: DutyTemplateInit) {
    super(args);
  }

  computeValuePrestige(unit: Unit): number {
    return Math.max(this.computeChanceForUnit(unit), 0);
  }

  override onAssign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.setCurrentPrestige(this.computeValuePrestige(unit));
  }

  override onUnassign(duty_instance: DutyInstancePrestigeSlave, unit: Unit) {
    duty_instance.unsetCurrentPrestige();
  }

  override advanceWeek(duty_instance: DutyInstancePrestigeSlave) {
    super.advanceWeek(duty_instance);

    // update prestige, if appropriate.
    const unit = duty_instance.getAssignedUnit();
    if (unit) {
      const prestige = this.computeValuePrestige(unit);
      if (prestige != duty_instance.getCurrentPrestige()) {
        setup.notify(
          `The effectiveness of ${unit.rep()} as ${duty_instance.rep()} has changed.`,
        );
        duty_instance.setCurrentPrestige(prestige);
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

  unsetCurrentPrestige(): void {
    this.setCurrentPrestige(0);
  }
}
