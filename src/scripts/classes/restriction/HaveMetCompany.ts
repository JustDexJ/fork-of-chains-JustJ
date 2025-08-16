import type { Company, CompanyKey } from "../Company";

export default class HaveMetCompany extends Restriction {
  company_key: CompanyKey;

  constructor(company: Company) {
    super();

    this.company_key = resolveKey(company);
  }

  override text() {
    return `setup.qres.HaveMetCompany('${this.company_key}')`;
  }

  override isOk() {
    const company = State.variables.company[this.company_key];
    return State.variables.favor.isCompanyKnown(company);
  }

  override explain() {
    const company = State.variables.company[this.company_key];
    return `Have met ${company.getName()}`;
  }
}
