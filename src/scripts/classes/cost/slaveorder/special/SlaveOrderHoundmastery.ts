import { SlaveOrderTemplate } from "../SlaveOrderTemplate";

export default class SlaveOrderHoundmastery extends SlaveOrderTemplate {
  trait_key: TraitKey;

  constructor(required_trait: Trait | TraitKey) {
    super();

    this.base_price = 1;
    this.trait_multi = 0;
    this.value_multi = 0;

    this.name = "Order from the master of hounds";
    this.company_key = "neko";
    this.expires_in = 16;
    this.fulfilled_outcomes = [
      setup.qc.HideAll(
        [setup.qc.VarAdd("houndmaster_pets_delivered", 1, 16)],
        "???",
      ),
    ];
    this.unfulfilled_outcomes = [];
    this.destination_unit_group_key = "soldslaves";
    this.trait_key = resolveKey(required_trait);
  }

  override text(): string {
    return `setup.qc.SlaveOrderHoundmastery(${this.value_multi})`;
  }

  override getCriteria() {
    const critical: Trait[] = [];
    const disaster: Trait[] = [];

    const req: Restriction[] = [
      setup.qres.Job("slave"),
      setup.qres.Trait(this.trait_key),
      setup.qres.Trait(setup.trait.training_pet_advanced),
    ];

    let criteria = new setup.UnitCriteria(
      null /* key */,
      "Master of Hounds Order" /* title */,
      critical,
      disaster,
      req,
      {} /* skill effects */,
    );
    return criteria;
  }
}
