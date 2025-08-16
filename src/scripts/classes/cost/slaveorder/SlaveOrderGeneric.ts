import type { Company, CompanyKey } from "../../Company";
import { SlaveOrderTemplate } from "./SlaveOrderTemplate";

export default class SlaveOrderGeneric extends SlaveOrderTemplate {
  constructor(
    name: string,
    company: Company | CompanyKey,
    expires_in: number,
    base_price_mult: number,
    trait_mult: number,
    value_mult: number,
    fulfilled: Cost[],
    unfulfilled: Cost[],
  ) {
    super();

    this.base_price = setup.MONEY_PER_SLAVER_WEEK * base_price_mult;
    this.trait_multi = setup.MONEY_PER_SLAVER_WEEK * trait_mult;
    this.value_multi = value_mult;

    this.criteria = setup.qu.slave;
    this.name = name;
    this.company_key = resolveKey(company);
    this.expires_in = expires_in;

    this.fulfilled_outcomes = [];
    if (fulfilled) this.fulfilled_outcomes = fulfilled;

    this.unfulfilled_outcomes = [];
    if (unfulfilled) this.unfulfilled_outcomes = unfulfilled;

    this.destination_unit_group_key = setup.unitgroup.soldslaves.key;
  }

  override text(): string {
    throw Error("NOT IMPLEMENTED");
    //return `setup.qc.SlaveOrderGeneric('${this.item_key}')`;
  }
}
