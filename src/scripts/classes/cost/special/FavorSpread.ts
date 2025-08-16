import type { Company, CompanyKey } from "../../Company";

/**
 * Increase favor of one other company at random.
 */
export default class FavorSpread extends Cost {
  company_key: CompanyKey;

  /**
   * @param company Excluded company
   * @param amount Amount of gained favor
   */
  constructor(
    company: Company | CompanyKey,
    public amount: number,
  ) {
    super();
    this.company_key = resolveKey(company);
  }

  override text() {
    return `setup.qc.FavorSpread('${this.company_key}', ${this.amount})`;
  }

  override apply(context: CostContext) {
    const companies: Company[] = [];
    for (const companykey of objectKeys(State.variables.company)) {
      const company = State.variables.company[companykey];

      if (!State.variables.favor.isCompanyKnown(company)) continue;

      if (company == State.variables.company.player) continue;

      // cannot be the same with spreader
      if (company.key == this.company_key) continue;

      companies.push(company);
    }

    const chosen = setup.rng.choice(companies);
    setup.qc.Favor(chosen, this.amount).apply(context);
  }

  override explain(context: CostContext) {
    return `Gain ${this.amount} favor with a random company except ${State.variables.company[this.company_key].rep()}`;
  }
}
