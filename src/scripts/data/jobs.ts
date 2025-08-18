import { type JobDefinition } from "../classes/job/Job";

export const JOB_DEFINITIONS = typedObject<JobDefinition>()({
  slaver: {
    name: "Slaver",
  },
  slave: {
    name: "Slave",
  },
  retired: {
    name: "Retired",
  },
  unemployed: {
    name: "Not in company",
  },
});
