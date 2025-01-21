import type { Job } from "../../classes/job/Job";

export default {
  job(job: Job, show_actions?: boolean): DOM.Node {
    return html` <span class="jobcard"> ${job.rep()} </span> `;
  },
};
