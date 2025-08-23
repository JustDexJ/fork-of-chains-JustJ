import type { Company, CompanyKey } from "../../Company";

/**
 * Increase ire of three other companies outside of the spreader.
 */
export default class IreSpread extends Cost {
  company_key: CompanyKey;

  constructor(company: Company | CompanyKey) {
    super();
    this.company_key = resolveKey(company);
  }

  override text(): string {
    return `setup.qc.IreSpread('${this.company_key}')`;
  }

  override apply(context: CostContext) {
    const companies = [];
    for (const companykey of objectKeys(State.variables.company)) {
      const company = State.variables.company[companykey];

      if (!State.variables.favor.isCompanyKnown(company)) continue;

      if (company == State.variables.company.player) continue;

      // cannot be the same with spreader
      if (company.key == this.company_key) continue;

      companies.push(company);
    }

    setup.rng.shuffleArray(companies);

    let limit = 3;
    if (this.company_key == "royal") {
      // royal gets extra
      limit += 1;
    }
    for (let i = 0; i < limit; ++i) {
      if (companies.length <= i) break;
      setup.qc.Ire(companies[i], 10).apply(context);
    }
  }

  override explain(context: CostContext): string {
    return `Gain ire with three other companies except ${State.variables.company[this.company_key].rep()}`;
  }
}
