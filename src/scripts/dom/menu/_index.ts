import { DOM_Menu_bedchambercruelslaver } from "./bedchambercruel";
import { DOM_Menu_bedchamberdescription } from "./bedchamberdescription";
import { DOM_Menu_bedchamberedit } from "./bedchamberedit";
import { DOM_Menu_changeactivetitles } from "./changeactivetitles";
import { DOM_Menu_changeskillfocus } from "./changeskillfocus";
import { DOM_Menu_debugmenu } from "./debug/debugmenu";
import { DOM_Menu_debugfriendship } from "./debugfriendship";
import {
  DOM_Menu_dev_content_generated_begin,
  DOM_Menu_dev_content_generated_middle,
} from "./devtool/createcommon";
import { DOM_Menu_devmainmenu } from "./devtool/devmainmenu";
import {
  DOM_Menu_devtoolactivity,
  DOM_Menu_devtoolactivityselectroom,
} from "./devtool/devtoolactivity";
import { DOM_Menu_devtoolcheckall } from "./devtool/devtoolcheckall";
import { DOM_Menu_devtoolverifycreate } from "./devtool/devtoolverifycreate";
import {
  DOM_Menu_dismissConfirm,
  DOM_Menu_rehireRetiredConfirm,
  DOM_Menu_retireAftermath,
  DOM_Menu_retireConfirm,
  DOM_Menu_retiredDismissConfirm,
} from "./dismissretire";
import { DOM_Menu_endweekmenu } from "./endweekmenu";
import { DOM_Menu_equipmentsetedit } from "./equipmentsetedit";
import { DOM_Menu_equipmentsetpickequip } from "./equipmentsetpickequip";
import { DOM_Menu_fortgrid } from "./fortgrid";
import { DOM_Menu_interactionpool } from "./interactionpool";
import { DOM_Menu_interactivesex } from "./interactivesex";
import { DOM_Menu_useitemonunit } from "./item";
import { DOM_Menu_mainmenu, DOM_Menu_mainmenufooter } from "./mainmenu";
import { DOM_Menu_newgameplus } from "./newgameplus";
import { DOM_Menu_opportunityautoanswer } from "./opportunityautoanswer";
import { DOM_Menu_perklearn } from "./perklearn";
import { DOM_Menu_prologueMakePlayer } from "./prologue/prologueMakePlayer";
import { DOM_Menu_prologueNewGamePlusPCChange } from "./prologue/prologueNewGamePlusChanges";
import { DOM_Menu_questassign } from "./questassign";
import { DOM_Menu_relationsofficemanagedcompanies } from "./relationsofficemanagedcompanies";
import { DOM_Menu_roomlist } from "./roomlist";
import { DOM_Menu_Settings } from "./settings/_index";
import { DOM_Menu_unitdebug } from "./settings/unitdebug";
import { DOM_Menu_proposeSex } from "./sexpropose";
import {
  DOM_Menu_refreshRightSidebar,
  DOM_Menu_rightsidebar,
} from "./sidebar/Quicklist";
import {
  DOM_Menu_traitpickermulti,
  DOM_Menu_traitpickersingle,
} from "./traitpicker";
import { DOM_Menu_unitdescription } from "./unitdescription";
import { DOM_Menu_unitdetail } from "./unitdetail";
import {
  DOM_Menu_debugComputeStats,
  DOM_Menu_gameinit,
  DOM_Menu_weekend,
} from "./weekend/weekend";

/**
 * Contains menu renderers
 */
export const DOM_Menu = {
  MAINMENU_ITEMS: undefined as undefined | any[],

  Settings: DOM_Menu_Settings,

  bedchambercruelslaver: DOM_Menu_bedchambercruelslaver,
  bedchamberdescription: DOM_Menu_bedchamberdescription,
  bedchamberedit: DOM_Menu_bedchamberedit,
  changeactivetitles: DOM_Menu_changeactivetitles,
  changeskillfocus: DOM_Menu_changeskillfocus,
  debugfriendship: DOM_Menu_debugfriendship,
  dismissConfirm: DOM_Menu_dismissConfirm,
  retireConfirm: DOM_Menu_retireConfirm,
  retireAftermath: DOM_Menu_retireAftermath,
  retiredDismissConfirm: DOM_Menu_retiredDismissConfirm,
  rehireRetiredConfirm: DOM_Menu_rehireRetiredConfirm,
  endweekmenu: DOM_Menu_endweekmenu,
  equipmentsetedit: DOM_Menu_equipmentsetedit,
  equipmentsetpickequip: DOM_Menu_equipmentsetpickequip,
  fortgrid: DOM_Menu_fortgrid,
  interactionpool: DOM_Menu_interactionpool,
  interactivesex: DOM_Menu_interactivesex,
  useitemonunit: DOM_Menu_useitemonunit,
  mainmenu: DOM_Menu_mainmenu,
  mainmenufooter: DOM_Menu_mainmenufooter,
  newgameplus: DOM_Menu_newgameplus,
  opportunityautoanswer: DOM_Menu_opportunityautoanswer,
  perklearn: DOM_Menu_perklearn,
  questassign: DOM_Menu_questassign,
  rightsidebar: DOM_Menu_rightsidebar,
  refreshRightSidebar: DOM_Menu_refreshRightSidebar,
  relationsofficemanagedcompanies: DOM_Menu_relationsofficemanagedcompanies,
  roomlist: DOM_Menu_roomlist,
  proposeSex: DOM_Menu_proposeSex,
  traitpickermulti: DOM_Menu_traitpickermulti,
  traitpickersingle: DOM_Menu_traitpickersingle,
  unitdescription: DOM_Menu_unitdescription,
  unitdetail: DOM_Menu_unitdetail,
  dev_content_generated_begin: DOM_Menu_dev_content_generated_begin,
  dev_content_generated_middle: DOM_Menu_dev_content_generated_middle,
  devmainmenu: DOM_Menu_devmainmenu,
  devtoolactivity: DOM_Menu_devtoolactivity,
  devtoolactivityselectroom: DOM_Menu_devtoolactivityselectroom,
  devtoolcheckall: DOM_Menu_devtoolcheckall,
  devtoolverifycreate: DOM_Menu_devtoolverifycreate,
  prologueMakePlayer: DOM_Menu_prologueMakePlayer,
  prologueNewGamePlusPCChange: DOM_Menu_prologueNewGamePlusPCChange,
  debugmenu: DOM_Menu_debugmenu,
  unitdebug: DOM_Menu_unitdebug,
  weekend: DOM_Menu_weekend,
  gameinit: DOM_Menu_gameinit,
  debugComputeStats: DOM_Menu_debugComputeStats,
};
