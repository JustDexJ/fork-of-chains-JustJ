import { SlaveOrderTemplate } from "../SlaveOrderTemplate";

export default class SlaveOrderMenial extends SlaveOrderTemplate {
  constructor() {
    super();

    this.trait_multi = 0;
    this.value_multi = 0;

    this.criteria = new setup.UnitCriteria(
      null /* key */,
      "Menial Slave Order" /* title */,
      [] /* critical, */,
      [] /* disaster, */,
      [/* restrictions */ setup.qres.Job("slave")],
      {} /* skill multis */,
    );
    this.name = "Order for a menial slave from a nearby mine";
    this.company_key = "independent";
    this.expires_in = setup.INFINITY;

    this.destination_unit_group_key = "soldslaves";
  }

  override getFulfilledOutcomes() {
    return [new setup.qcImpl.SlaveOrderMenial()];
  }

  override explain(context: CostContext): string {
    return `Another menial slave order`;
  }

  override text(): string {
    return `setup.qc.SlaveOrderMenial()`;
  }

  override getBasePrice() {
    let level = Math.min(
      State.variables.unit.player.getLevel(),
      setup.LEVEL_PLATEAU,
    );
    let diff = setup.qdiff[`normal${level}` as QuestDifficultyKey];
    return Math.round(setup.SLAVE_ORDER_MENIAL_MULTI * diff.getMoney());
  }
}
