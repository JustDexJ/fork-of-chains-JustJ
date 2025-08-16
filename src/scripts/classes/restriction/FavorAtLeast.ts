import type { Company, CompanyKey } from "../Company";

export default class FavorAtLeast extends Restriction {
  company_key: CompanyKey;
  favor_amt: number;

  constructor(company: Company, favor_amt: number) {
    super();

    this.company_key = resolveKey(company);
    this.favor_amt = favor_amt;
  }

  override text() {
    return `setup.qres.FavorAtLeast('${this.company_key}', ${this.favor_amt})`;
  }

  override isOk() {
    let company = State.variables.company[this.company_key];
    return State.variables.favor.getFavor(company) >= this.favor_amt;
  }

  override explain() {
    let company = State.variables.company[this.company_key];
    return `Favor with ${company.rep()} at least ${setup.DOM.toString(setup.DOM.Util.favor(this.favor_amt))}`;
  }
}
