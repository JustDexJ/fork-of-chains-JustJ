import type { Job, JobKey } from "../../../job/Job";
import type { TraitKey } from "../../../trait/Trait";

export default class HasUnitWithTagAndJobAndTrait extends Restriction {
  job_key: JobKey;
  trait_key: TraitKey;

  constructor(
    public tag_name: string,
    job: Job | JobKey,
    trait: Trait | TraitKey,
  ) {
    super();

    this.job_key = resolveKey(job);
    this.trait_key = resolveKey(trait);
  }

  override text(): string {
    return `setup.qres.HasUnitWithTagAndJobAndTrait('${this.tag_name}', setup.job.${this.job_key}, setup.trait.${this.trait_key})`;
  }

  override explain(): string {
    let tagname = this.tag_name;
    let trait = setup.trait[this.trait_key];
    return `Must have a unit with job: ${this.job_key} and trait: ${trait.rep()} and tag/flag : "${tagname}"`;
  }

  override isOk(): boolean {
    let units = State.variables.company.player.getUnits({
      job: setup.job[this.job_key],
    });
    let trait = setup.trait[this.trait_key];
    for (let i = 0; i < units.length; ++i) {
      if (units[i].isHasTag(this.tag_name) && units[i].isHasTrait(trait))
        return true;
    }
    return false;
  }
}
