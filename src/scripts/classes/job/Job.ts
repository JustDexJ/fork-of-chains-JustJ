import type { _job } from "../../data/job";
import { TwineClass } from "../_TwineClass";
import type { TraitKey } from "../trait/Trait";

//export type JobKey = BrandedType<keyof typeof job, 'JobKey'>
export type JobKey = keyof _job;

export class Job extends TwineClass {
  key: JobKey;
  name: string;

  constructor(key: string, name: string) {
    super();

    this.key = key as JobKey;
    this.name = name;

    if (key in setup.job) throw new Error(`Job ${key} already exists`);
    setup.job[key as JobKey] = this;
  }

  getImage(): string {
    return `img/job/${this.key}.svg`;
  }

  getImageRep(): string {
    return setup.repImgIcon(this.getImage(), this.getName());
  }

  rep(): string {
    return this.getImageRep();
  }

  getTrait(): Trait {
    return setup.trait[`job_${this.key}` as TraitKey];
  }

  getName(): string {
    return this.name;
  }

  static cmp(job1: Job, job2: Job): number {
    if (job1.name < job2.name) return -1;
    if (job1.name > job2.name) return 1;
    return 0;
  }
}
