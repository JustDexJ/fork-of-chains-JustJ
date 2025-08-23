import type { Company, CompanyKey } from "../../Company";

export default class Favor extends Cost {
  company_key: CompanyKey;

  constructor(
    company: Company | CompanyKey | BuiltinCompanyTemplateKey,
    public favor_amt: number,
  ) {
    super();

    this.company_key = resolveKey(company as Company | CompanyKey);
  }

  override text(): string {
    return `setup.qc.Favor('${this.company_key}', ${this.favor_amt})`;
  }

  getCompany(): Company {
    return State.variables.company[this.company_key];
  }

  override isOk(): boolean {
    return (
      State.variables.favor.getFavor(this.getCompany()) + this.favor_amt >= 0
    );
  }

  override apply(context?: CostContext) {
    const company = this.getCompany();
    const adjusted = State.variables.favor.adjustFavor(company, this.favor_amt);
    if (adjusted > 0) {
      setup.notify(
        `Gained ${setup.DOM.toString(setup.DOM.Text.successlite((adjusted / 10).toFixed(1)))} favor with ${company.rep()}`,
      );
    } else if (adjusted < 0) {
      setup.notify(
        `Lost ${setup.DOM.toString(setup.DOM.Text.dangerlite((-adjusted / 10).toFixed(1)))} favor with ${company.rep()}`,
      );
    }
  }

  undoApply() {
    State.variables.favor.adjustFavor(this.getCompany(), -this.favor_amt);
  }

  override explain(): string {
    const adjustment = this.favor_amt;
    const company = this.getCompany();
    if (adjustment < 0) {
      return `Lose ${setup.DOM.toString(setup.DOM.Text.dangerlite((-adjustment / 10).toFixed(1)))} favor with ${company.rep()}`;
    } else {
      return `Gain ${setup.DOM.toString(setup.DOM.Text.successlite((adjustment / 10).toFixed(1)))} favor with ${company.rep()}`;
    }
  }
}
