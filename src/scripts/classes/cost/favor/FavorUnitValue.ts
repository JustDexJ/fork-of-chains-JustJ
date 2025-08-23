import type { Company, CompanyKey } from "../../Company";

export default class FavorUnitValue extends Cost {
  company_key: CompanyKey;

  constructor(
    public actor_name: string,
    company: Company | CompanyKey,
    public favor_per_value: number,
  ) {
    super();

    this.company_key = resolveKey(company);
  }

  override text(): string {
    return `setup.qc.FavorUnitValue('${this.actor_name}', '${this.company_key}', ${this.favor_per_value})`;
  }

  getCompany(): Company {
    return State.variables.company[this.company_key];
  }

  override explain(): string {
    const fpv = this.favor_per_value;
    return `Gain favor with ${this.getCompany().rep()} equals ${this.actor_name}'s value times ${fpv}`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const favor = unit.getSlaveValue() * this.favor_per_value;
    setup.qc.Favor(this.getCompany(), Math.round(favor)).apply(context);
  }
}
