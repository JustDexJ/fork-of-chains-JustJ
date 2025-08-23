import type { Job, JobKey } from "../../job/Job";
import type { Unit } from "../../unit/Unit";
import { Market } from "../Market";
import type { MarketObject } from "../MarketObject";

export class MarketUnit extends Market<Unit> {
  job_key: JobKey;

  constructor(key: string, name: string, varname: string, job_key: JobKey) {
    super(key, name, varname);
    this.job_key = job_key;
  }

  getJob(): Job {
    return setup.job[this.job_key];
  }

  isCanBuyObjectOther(market_object: MarketObject<Unit>) {
    if (!State.variables.company.player.isCanAddUnitWithJob(this.getJob()))
      return false;
    return true;
  }

  override doAddObject(market_object: MarketObject<Unit>) {
    const unit = market_object.getObject();
    State.variables.company.player.addUnit(unit, this.getJob());
    const source = market_object.repSource();
    if (!unit.getWeeksWithCompany() && source) {
      unit.addHistory(`originated from: ${source}.`);
    }
  }
}
