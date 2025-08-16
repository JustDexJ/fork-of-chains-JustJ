import { Job } from "../classes/job/Job";

export type _job = ReturnType<typeof initJobs>;

export const initJobs = () => ({
  slaver: new Job("slaver", "Slaver"),
  slave: new Job("slave", "Slave"),
  retired: new Job("retired", "Retired"),
  unemployed: new Job("unemployed", "Not in company"),
});
