import unitgroups_buildings from "./unitgroups_buildings";
import unitgroups_others from "./unitgroups_others";
import unitgroups_locations from "./unitgroups_regions";
import unitgroups_slavers from "./unitgroups_slavers";
import unitgroups_slaves from "./unitgroups_slaves";
import unitgroups_special from "./unitgroups_special";

export const UNIT_GROUP_DEFINITIONS = {
  ...unitgroups_special,
  ...unitgroups_buildings,
  ...unitgroups_locations,
  ...unitgroups_slavers,
  ...unitgroups_slaves,
  ...unitgroups_others,
};
