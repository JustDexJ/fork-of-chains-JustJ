import { TwineClass } from "./_TwineClass";
import type { Company, CompanyKey } from "./Company";

/**
 * Tracks the amount of ire your company has with all other entities out there.
 */
export class Ire extends TwineClass {
  /**
   * company_key: ire amount
   */
  company_ire_map: { [k in CompanyKey]?: number } = {};

  constructor() {
    super();
  }

  /**
   * ire with company += ire
   */
  adjustIre(company: Company, ire: number) {
    const previous_ire = this.company_ire_map[company.key] ?? 0;

    const final_ire = Math.max(previous_ire + ire, 0);

    this.company_ire_map[company.key] = final_ire;

    return final_ire - previous_ire;
  }

  getIre(company: Company): number {
    return this.company_ire_map[company.key] ?? 0;
  }

  /**
   * Get a description of the companys "ire rating" towards you
   */
  getIreDisplay(company: Company): string {
    const ire = this.getIre(company);
    if (ire == 0) {
      return setup.DOM.toString(setup.DOM.Text.success("No grievances"));
    } else if (ire < 4) {
      return setup.DOM.toString(
        setup.DOM.Text.successlite("Very few grievances"),
      );
    } else if (ire < 8) {
      return `Have disagreements with your company`;
    } else if (ire < 12) {
      return setup.DOM.toString(
        setup.DOM.Text.dangerlite("Bears a grudge against your company"),
      );
    } else if (ire < 16) {
      return setup.DOM.toString(
        setup.DOM.Text.dangerlite("Vengeful against your company"),
      );
    } else if (ire < 20) {
      return setup.DOM.toString(
        setup.DOM.Text.danger(
          "Almost at a breaking point! Get ready for retaliation",
        ),
      );
    } else {
      return setup.DOM.toString(
        setup.DOM.Text.danger(
          "To Arms! This company will sabotage you very soon",
        ),
      );
    }
  }

  /**
   * Whether your company has ever interacted with this company.
   * Should only be called by $favor.isCompanyKnown
   */
  _isCompanyKnown(company: Company): boolean {
    return company.key in this.company_ire_map;
  }
}
