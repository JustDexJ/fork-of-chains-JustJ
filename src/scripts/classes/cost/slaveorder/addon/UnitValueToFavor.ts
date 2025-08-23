import type { Company, CompanyKey } from "../../../Company";
import { SlaveOrderAddonBase } from "./_SlaveOrderAddonBase";

export default class UnitValueToFavor extends Cost {
  company_key: CompanyKey;

  constructor(
    company: Company | CompanyKey,
    public favor_per_value: number,
    public favor_per_crit: number,
  ) {
    super();
    this.company_key = resolveKey(company as Company | CompanyKey);
  }

  override text(): string {
    return `setup.qc.UnitValueToFavor('${this.company_key}', ${this.favor_per_value}, ${this.favor_per_crit})`;
  }

  getCompany(): Company {
    return State.variables.company[this.company_key];
  }

  override explain(): string {
    const fpv = this.favor_per_value;
    const fpc = this.favor_per_crit;
    return `Favor with ${this.getCompany().rep()} = value * ${fpv} + crit * ${fpc}`;
  }

  override apply(slave_order: SlaveOrder) {
    const unit = slave_order.getUnit()!;
    const criteria = slave_order.getCriteria();
    const mods = criteria.computeSuccessModifiers(
      unit,
      /* ignore extra traits = */ true,
    );

    let favor = unit.getSlaveValue() * this.favor_per_value;

    favor += mods.crit * this.favor_per_crit;
    favor -= mods.disaster * this.favor_per_crit;

    setup.qc.Favor(this.getCompany(), Math.round(favor)).apply(slave_order);
  }
}

export const UnitValueToFavor_Addon = class UnitValueToFavor extends SlaveOrderAddonBase {
  company_key: CompanyKey;

  constructor(
    company: Company | CompanyKey,
    public favor_per_value: number,
    public favor_per_crit: number,
  ) {
    super();

    this.company_key = resolveKey(company);
    this.favor_per_value = favor_per_value;
    this.favor_per_crit = favor_per_crit;
  }

  override text(): string {
    return `setup.SlaveOrderAddon.UnitValueToFavor('${this.company_key}', ${this.favor_per_value}, ${this.favor_per_crit})`;
  }

  getCompany(): Company {
    return State.variables.company[this.company_key];
  }

  override explain(): string {
    return `Gain favor with ${this.getCompany().rep()} equal to:
      Unit value * ${this.favor_per_value} +
      Crit traits * ${this.favor_per_crit}`;
  }

  override apply(slave_order: SlaveOrder) {
    slave_order.fulfilled_outcomes.push(
      setup.qc.UnitValueToFavor(
        this.getCompany(),
        this.favor_per_value,
        this.favor_per_crit,
      ),
    );
  }
};
