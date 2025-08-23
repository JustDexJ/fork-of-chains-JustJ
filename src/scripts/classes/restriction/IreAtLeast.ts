import type { Company, CompanyKey } from "../Company";

export default class IreAtLeast extends Restriction {
  company_key: CompanyKey;
  ire_amt: number;

  constructor(company: Company, ire_amt: number) {
    super();

    this.company_key = resolveKey(company);
    this.ire_amt = ire_amt;
  }

  override text(): string {
    return `setup.qres.IreAtLeast('${this.company_key}', ${this.ire_amt})`;
  }

  override isOk(): boolean {
    let company = State.variables.company[this.company_key];
    return State.variables.ire.getIre(company) >= this.ire_amt;
  }

  override explain(): string {
    let company = State.variables.company[this.company_key];
    return `Ire with ${company.rep()} at least ${setup.DOM.toString(setup.DOM.Text.dangerlite(this.ire_amt))}`;
  }
}
