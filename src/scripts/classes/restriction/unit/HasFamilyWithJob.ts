import type { Job, JobKey } from "../../job/Job";

export default class HasFamilyWithJob extends Restriction.Unit {
  job_key: JobKey;

  constructor(job: Job) {
    super();

    this.job_key = job.key;
  }

  static NAME = "Has a family member with the given job";
  static PASSAGE = "RestrictionHasFamilyWithJob";
  static UNIT = true;

  override text() {
    return `setup.qres.HasFamilyWithJob(setup.job.${this.job_key})`;
  }

  override explain() {
    return `${setup.job[this.job_key].rep()}`;
  }

  override isOk(unit: Unit): boolean {
    let family = State.variables.family.getFamily(unit);
    for (let familykey of objectKeys(family) as UnitKey[]) {
      if (State.variables.unit[familykey].getJob().key == this.job_key)
        return true;
    }
    return false;
  }
}
