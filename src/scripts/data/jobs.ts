import { type JobDefinition } from "../classes/job/Job";

export const JOB_DEFINITIONS = typedObject<JobDefinition>()({
  slaver: {
    key: "slaver",
    name: "Slaver",
  },
  slave: {
    key: "slave",
    name: "Slave",
  },
  retired: {
    key: "retired",
    name: "Retired",
  },
  unemployed: {
    key: "unemployed",
    name: "Not in company",
  },
});
