import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateTrainer extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    let leveled_up = 0;
    for (
      let i = 0;
      i < setup.DRILL_SERGEANT_ATTEMPTS + setup.DRILL_SERGEANT_ATTEMPTS_CRIT;
      ++i
    ) {
      const proc = duty_instance.getProc();
      if (
        proc == "crit" ||
        (i < setup.DRILL_SERGEANT_ATTEMPTS && proc == "proc")
      ) {
        // procced succesfuly.
        // find candidate
        const duty_unit = duty_instance.getAssignedUnit()!;
        const level_limit = Math.min(
          setup.TRAINER_MAX_LEVEL,
          duty_unit.getLevel(),
        );
        const targets = State.variables.company.player
          .getUnits({ job: setup.job.slaver })
          .filter(
            (unit) => unit.getLevel() < level_limit && unit.isAvailable(),
          );
        if (targets.length) {
          const target = setup.rng.choice(targets);
          target.levelUp();
          leveled_up += 1;
        }
      }
    }
    if (leveled_up) {
      setup.notify(
        `${setup.capitalize(duty_instance.repYourDutyRep())} trained your other slavers and they gain ${leveled_up} level${leveled_up > 1 ? "s" : ""}.`,
      );
    }
  }
}
