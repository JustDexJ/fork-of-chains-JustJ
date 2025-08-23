import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateDamageControlOfficer extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    const proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      // list all companies with positive ire
      const companies = [];
      for (const [company_key, company] of objectEntries(
        State.variables.company,
      )) {
        const ire = State.variables.ire.getIre(company);
        if (ire) companies.push(company);
      }
      if (companies.length) {
        const company = setup.rng.choice(companies);
        const ire = State.variables.ire.getIre(company);
        let pay = setup.IRE_DCO_PAY;
        if (ire >= 2 && proc == "crit") {
          pay = setup.IRE_DCO_PAY_CRIT;
          State.variables.ire.adjustIre(company, -2);
        } else {
          State.variables.ire.adjustIre(company, -1);
        }
        setup.notify(
          `${setup.capitalize(duty_instance.repYourDutyRep())} <<successtextlite "pacified">> ${company.rep()} in exchange for <<money ${pay}>>`,
        );
        State.variables.company.player.substractMoney(pay);
      }
    }
  }
}
