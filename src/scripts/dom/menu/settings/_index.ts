import opendialog from "../../components/settings/GlobalSettingsEdit";
import imagepacks from "../../components/settings/ImagepacksManagement";

import activity from "./debug/activity";
import event from "./debug/event";
import interaction from "./debug/interaction";
import opportunity from "./debug/opportunity";
import quest from "./debug/quest";
import scoutablequest from "./debug/scoutablequest";

export const DOM_Menu_Settings = {
  Debug: {
    ...activity,
    ...event,
    ...interaction,
    ...opportunity,
    ...quest,
    ...scoutablequest,
  },

  opendialog,
  imagepacks,
};
