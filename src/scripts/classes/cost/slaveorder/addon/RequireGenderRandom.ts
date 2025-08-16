import type { Job, JobKey } from "../../../job/Job";
import { SlaveOrderAddonBase } from "./_SlaveOrderAddonBase";

/**
 * Requires either male or female.
 * Will try to follow preferences whenever possible.
 */
export default class RequireGenderRandom extends SlaveOrderAddonBase {
  job_key: JobKey;

  constructor(job: Job | JobKey) {
    super();
    this.job_key = resolveKey(job);
  }

  override text() {
    return `setup.SlaveOrderAddon.RequireGenderRandom()`;
  }

  override explain() {
    return `Requires the slave to be of a random gender`;
  }

  override apply(slave_order: SlaveOrder) {
    let criteria = slave_order.criteria;
    let gender = State.variables.settings.getGenderRandom(
      setup.job[this.job_key],
    );
    criteria.restrictions.push(setup.qres.Trait(gender));
  }
}
