import type { Job, JobKey } from "../../job/Job";
import type { UnitGroup, UnitGroupKey } from "../../unit/UnitGroup";

/**
 * Get a high quality recruit.
 */
export default class HighQualityRecruit extends Cost {
  unitgroup_key: UnitGroupKey;
  job_key: JobKey;

  constructor(
    unitgroup: UnitGroup | UnitGroupKey,
    job: Job | JobKey,
    public tries: number,
    public origin_text: string,
  ) {
    super();
    this.unitgroup_key = resolveKey(unitgroup);
    this.job_key = resolveKey(job);
    if (tries <= 0) {
      throw new Error(`Tries must be positive, not ${tries}`);
    }
  }

  override text(): string {
    return `setup.qc.HighQualityRecruit('${this.unitgroup_key}', '${this.job_key}', ${this.tries}, '${setup.escapeJsString(this.origin_text)}')`;
  }

  getJob(): Job {
    return setup.job[this.job_key];
  }

  getUnitGroup(): UnitGroup {
    return setup.unitgroup[this.unitgroup_key];
  }

  override apply(context: CostContext): void {
    const job = this.getJob();
    const ug = this.getUnitGroup();
    let unit = ug.getUnit({ job_hint: job.key });
    for (let i = 0; i < this.tries - 1; ++i) {
      let new_unit = ug.getUnit({ job_hint: job.key });
      if (new_unit.getSlaveValue() > unit.getSlaveValue()) {
        unit.delete();
        unit = new_unit;
      } else {
        new_unit.delete();
      }
    }
    let qcclass;
    if (job == setup.job.slaver) {
      qcclass = setup.qc.Slaver;
    } else if (job == setup.job.slave) {
      qcclass = setup.qc.Slave;
    } else {
      throw new Error(`Undetected job: ${this.job_key}`);
    }

    qcclass(
      "recruit",
      "",
      /* is mercenary = */ true,
      /* markup = */ 1.25,
    ).apply({
      getName: () => this.origin_text,
      getActorUnit: () => unit,
    });
  }

  override explain(context: CostContext): string {
    return `Receive a high quality recruit from ${this.unitgroup_key} (${this.tries} tries) as ${this.job_key}`;
  }
}
