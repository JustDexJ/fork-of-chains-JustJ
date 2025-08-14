import type { TraitKey } from "../../../trait/Trait";

/**
 * Make one of your units missing, e.g., by being moved into the missingslavers unit group
 * and removed from your company.
 */
export default class MissingUnit extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.MissingUnit('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;

    if (setup.qcImpl.MissingUnit.checkBlessingOfLife({ unit: unit, stacks: 2 }))
      return;
    if (setup.qcImpl.MissingUnit.checkMissingPlayer(unit, context)) return;

    let job = unit.getJob();
    unit.addHistory("went missing.", context);
    State.variables.company.player.removeUnit(unit);
    if (job == setup.job.slave) {
      setup.unitgroup.missingslaves.addUnit(unit);
    } else if (job == setup.job.slaver) {
      setup.unitgroup.missingslavers.addUnit(unit);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} would be gone from your company...`;
  }

  static checkMissingPlayer(unit: Unit, context: CostContext): boolean {
    if (unit != State.variables.unit.player) return false;

    // player disappears hahaha haha...
    State.variables.unit.player.addHistory(
      "went missing from the company.",
      context,
    );

    setup.qc.CapturePlayer().apply(setup.costUnitHelper(unit));
    return true;
  }

  static checkBlessingOfLife({
    unit,
    stacks,
  }: {
    unit: Unit;
    stacks: number;
  }): boolean {
    const trait_key = `blessing_life${stacks}` as TraitKey;

    if (trait_key in setup.trait && unit.isYourCompany() && unit.isSlaver()) {
      const trait = setup.trait[trait_key];
      if (unit.isHasTrait(trait)) {
        // save the unit
        setup.notify(`a|Reps Blessing of Life saved the slaver's life`, {
          a: unit,
        });
        for (let i = 0; i < stacks; ++i) {
          unit.decreaseTrait(trait.getTraitGroup()!);
        }

        return true;
      }
    }

    return false;
  }
}
