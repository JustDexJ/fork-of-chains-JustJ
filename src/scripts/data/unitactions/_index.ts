import unitactions_corrupt from "./unitactions_corrupt";
import unitactions_fleshshape from "./unitactions_fleshshape";
import unitactions_purify from "./unitactions_purify";
import unitactions_surgery from "./unitactions_surgery";
import unitactions_training from "./unitactions_training";
import unitactions_treatment from "./unitactions_treatment";

export const UNIT_ACTION_DEFINITIONS = {
  ...unitactions_training,
  ...unitactions_fleshshape,
  ...unitactions_surgery,
  ...unitactions_corrupt,
  ...unitactions_purify,
  ...unitactions_treatment,
};
