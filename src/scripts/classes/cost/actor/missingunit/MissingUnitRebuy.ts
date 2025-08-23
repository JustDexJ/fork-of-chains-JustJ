import MissingUnit from "./MissingUnit";

/**
 * Make one of your units missing, e.g., by being moved into the missingslavers unit group
 * and removed from your company, but immediately repurchasable in prospect hall or slave pen.
 * i.e., think of this as a hostage situation.
 */
export default class MissingUnitRebuy extends Cost {
  constructor(
    public actor_name: string,
    public price_mult: number,
  ) {
    super();
  }

  static NAME = "Lose a unit from your company, but repurchasable immediately";
  static PASSAGE = "CostMissingUnitRebuy";

  override text(): string {
    return `setup.qc.MissingUnitRebuy('${this.actor_name}', ${this.price_mult})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;

    const stacks = Math.ceil((unit.getSlaveValue() * this.price_mult) / 5000);

    if (
      setup.qcImpl.MissingUnit.checkBlessingOfLife({
        unit: unit,
        stacks: stacks,
      })
    )
      return;

    if (MissingUnit.checkMissingPlayer(unit, context)) return;

    let job = unit.getJob();

    if (job == setup.job.slaver) {
      unit.addHistory(
        "lost from your company but immediately sold back to your company.",
        context,
      );
    }

    State.variables.company.player.removeUnit(unit);
    let rebuy_cost = null;
    if (job == setup.job.slave) {
      setup.unitgroup.missingslaves.addUnit(unit);
      rebuy_cost = setup.qc.Slave;
    } else if (job == setup.job.slaver) {
      setup.unitgroup.missingslavers.addUnit(unit);
      rebuy_cost = setup.qc.Slaver;
    }
    if (rebuy_cost) {
      let cost = rebuy_cost(
        this.actor_name,
        /* origin_text = */ "",
        /* is_mercenary = */ true,
        /* price mult = */ this.price_mult,
      );
      cost.apply(context);
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} would be gone from your company, but immediately repurchasable for ${this.price_mult} x their value`;
  }
}
