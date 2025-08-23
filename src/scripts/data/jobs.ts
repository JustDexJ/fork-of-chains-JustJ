import { type JobDefinition } from "../classes/job/Job";

export const JOB_DEFINITIONS = definitions<JobDefinition>()({
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
