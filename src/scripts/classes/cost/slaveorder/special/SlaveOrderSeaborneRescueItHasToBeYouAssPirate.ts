import { SlaveOrderTemplate } from "../SlaveOrderTemplate";

export default class SlaveOrderSeaborneRescueItHasToBeYouAssPirate extends SlaveOrderTemplate {
  constructor() {
    super();

    this.base_price = 0;
    this.trait_multi = 6000;
    this.value_multi = 1;

    this.criteria = new setup.UnitCriteria(
      null /* key */,
      "Ass Pirate Order" /* title */,
      [
        setup.trait.anus_tight,
        setup.trait.training_anal_basic,
        setup.trait.training_anal_advanced,
        setup.trait.training_anal_master,
      ],
      [],
      [
        setup.qres.Job("slave"),
        setup.qres.Or([
          setup.qres.Trait(setup.trait.training_anal_basic),
          setup.qres.Trait(setup.trait.anus_tight),
        ]),
      ],
      {} /* skill effects */,
    );

    this.name = "Ass Pirate Order";
    this.company_key = "outlaws";
    this.expires_in = 4;
    this.fulfilled_outcomes = [];
    this.unfulfilled_outcomes = [];
    this.destination_unit_group_key = "soldslaves";
  }

  override text(): string {
    return `setup.qc.SlaveOrderSeaborneRescueItHasToBeYouAssPirate()`;
  }
}
