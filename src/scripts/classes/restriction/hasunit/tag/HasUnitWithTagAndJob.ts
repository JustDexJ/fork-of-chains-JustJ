import type { Job, JobKey } from "../../../job/Job";

export default class HasUnitWithTagAndJob extends Restriction {
  job_key: JobKey;

  constructor(
    public tag_name: string,
    job: Job | JobKey,
  ) {
    super();

    this.job_key = resolveKey(job);
  }

  static NAME = "Exists a unit with the given job and tag";
  static PASSAGE = "RestrictionHasUnitWithTagAndJob";
  static UNIT = true;

  override text() {
    return `setup.qres.HasUnitWithTagAndJob('${this.tag_name}', setup.job.${this.job_key})`;
  }

  override explain() {
    let tagname = this.tag_name;
    return `Must have a unit with job: ${this.job_key} and tag/flag : "${tagname}"`;
  }

  override isOk() {
    let units = State.variables.company.player.getUnits({
      job: setup.job[this.job_key],
    });
    for (let i = 0; i < units.length; ++i) {
      if (units[i].isHasTag(this.tag_name)) return true;
    }
    return false;
  }
}
