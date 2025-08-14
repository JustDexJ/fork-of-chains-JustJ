import type { TitleKey } from "../../../title/Title";
import MissingUnit from "./MissingUnit";

/**
 * Make one of your units missing, e.g., by being moved into the missingslavers unit group
 * and removed from your company. In this case, the unit will be re-hired,
 * but ON THE OPPOSITE POOL. E.g., a slaver becomes a slave, while a slave becomes a slaver.
 */
export default class MissingUnitOpposite extends Cost {
  constructor(
    public actor_name: string,
    public origin_text: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.MissingUnitOpposite('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;

    if (MissingUnit.checkMissingPlayer(unit, context)) return;

    let job = unit.getJob();
    if (job == setup.job.slaver) {
      unit.addHistory("switched professions from slaver to slave.", context);
    } else if (job == setup.job.slave) {
      unit.addHistory("switched professions from slave to slaver.", context);
      setup.qc.AddTitle(this.actor_name, "ex_slave" as TitleKey).apply(context);
    }
    State.variables.company.player.removeUnit(unit);
    let rebuy_cost = null;
    if (job == setup.job.slaver) {
      setup.unitgroup.missingslaves.addUnit(unit);
      rebuy_cost = setup.qc.Slave;
    } else if (job == setup.job.slave) {
      setup.unitgroup.missingslavers.addUnit(unit);
      rebuy_cost = setup.qc.Slaver;
    }
    if (rebuy_cost) {
      let cost = rebuy_cost(this.actor_name, this.origin_text);
      cost.apply(context);
    }
    unit.resetWeeksWithCompany();
  }

  override explain(context: CostContext) {
    return `${this.actor_name} would be gone from your company, and immediately available as the opposite of your job (i.e., slave becomes slaver, slaver becomes slave), with background: ${this.origin_text}`;
  }
}
