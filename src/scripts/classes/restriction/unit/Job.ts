import type { Job as Job_, JobKey } from "../../job/Job";

export default class Job extends Restriction.Unit {
  job_key: JobKey;

  constructor(job: Job_ | JobKey) {
    super();
    if (!job) throw new Error(`Missing job for qres.Job`);

    this.job_key = resolveKey(job);
  }

  override text() {
    return `setup.qres.Job(setup.job.${this.job_key})`;
  }

  override explain() {
    return `${setup.job[this.job_key].rep()}`;
  }

  override isOk(unit: Unit): boolean {
    // case one: unit already has the job
    if (unit.getJob().key == this.job_key) return true;

    // case two: unit is a free unit in market of that particular job
    if (!unit.isYourCompany()) {
      const market = unit.getMarket();
      if (market && market.getJob().key == this.job_key) {
        const market_object = market.getMarketObject(unit);
        if (market_object && !market_object.getPrice()) {
          // Unit is being sold for free in the market.
          return true;
        }
      }
    }

    return false;
  }
}
