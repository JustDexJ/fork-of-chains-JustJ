import type { Job } from "../../classes/job/Job";

export const JobCard: Component<{ job: Job; show_actions?: boolean }> = (
  props,
) => {
  return <span class="jobcard">{props.job.repJSX()}</span>;
};

export default {
  job(job: Job, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(JobCard, { job, show_actions });
  },
};
