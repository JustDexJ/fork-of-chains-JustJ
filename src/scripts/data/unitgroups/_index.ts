import unitgroups_others from "./unitgroups_others";
import unitgroups_locations from "./unitgroups_regions";
import unitgroups_slavers from "./unitgroups_slavers";
import unitgroups_slaves from "./unitgroups_slaves";

export const UNIT_GROUP_DEFINITIONS = {
  ...unitgroups_locations,
  ...unitgroups_slavers,
  ...unitgroups_slaves,
  ...unitgroups_others,
};
