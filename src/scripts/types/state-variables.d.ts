//
// Types for the story state variables
// (which reside at `State.variables` aka `SugarCube.State.variables`)
//

import type { StateVariablesBase } from "../_init/state_init";
import type { ActivityInstance } from "../classes/activity/ActivityInstance";
import type {
  ActivityTemplate,
  ActivityTemplateKey,
} from "../classes/activity/ActivityTemplate";
import type { BedchamberKey } from "../classes/bedchamber/BedChamber";
import type SlaveOrderFlex from "../classes/cost/slaveorder/SlaveOrderFlex";
import type { DutyInstanceKey } from "../classes/duty/DutyInstance";
import type { EquipmentSetKey } from "../classes/equipment/EquipmentSet";
import type { EventInstance } from "../classes/event/EventInstance";
import type {
  EventTemplate,
  EventTemplateKey,
} from "../classes/event/EventTemplate";
import type { InteractionInstance } from "../classes/interaction/InteractionInstance";
import type {
  InteractionTemplate,
  InteractionTemplateKey,
} from "../classes/interaction/InteractionTemplate";
import type {
  OpportunityInstance,
  OpportunityInstanceKey,
} from "../classes/opportunity/OpportunityInstance";
import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "../classes/opportunity/OpportunityTemplate";
import type { PartyKey } from "../classes/party/Party";
import type { QuestInstanceKey } from "../classes/quest/QuestInstance";
import type {
  QuestOutcome,
  QuestTemplateKey,
} from "../classes/quest/QuestTemplate";
import type { LivingKey } from "../classes/retire/Living";
import type { RoomInstanceKey } from "../classes/room/RoomInstance";
import type { SlaveOrderKey } from "../classes/slaveorder/SlaveOrder";
import type { Team } from "../classes/Team";
import type { UnitKey } from "../classes/unit/Unit";
import type { UnitAction } from "../classes/unitaction/UnitAction";

// Here we declare additional state variables which are defined in the .twee files
// (and therefore not detected by typescript)
// It's mostly stuff used in the devtool
export interface StateVariables
  extends StateVariablesBase,
    StateVariablesDevtool {
  ////////////////////////////////////////////////////////////////////////////
  //
  // General variables
  //
  ////////////////////////////////////////////////////////////////////////////

  /** Set to true when the game-state has been initialized */
  gInitDone: boolean;

  /** The game version that produced the savegame/savestate */
  gVersion:
    | `${number}.${number}.${number}`
    | `${number}.${number}.${number}.${number}`;

  /** List of mods enabled for this save. Each entry is the path to the mod. */
  mods?: string[];

  /** $args as used in widgets/macros */
  args?: any[] & { raw?: string; full?: string; payload?: string };

  /**
   * Whether to show the main menu links (quests, unit lists, etc.) on the left-sidebar.
   * Set to false during "modal" passages where you don't want the player navigating elsewhere.
   */
  gMenuVisible?: boolean;

  /**
   * The current "soft-loaded" passage name.
   * Used to navigate passages without actually pushing to SugarCube story history
   * which triggers a serialization which is slow.
   */
  gPassage?: string;

  /** The previous "soft-loaded" passage name, used when soft-navigating to a new passage. */
  gOldPassage?: string;

  gNewGamePlusBackwardsCompat?: boolean;
  gUpdatePostProcess?: boolean;

  ////////////////////////////////////////////////////////////////////////////
  //
  // Rendering Variables
  //
  // Temporary variables used to make info accessible to .twee passages,
  // so that it is easily accesible like `$gQuest`.
  //
  ////////////////////////////////////////////////////////////////////////////

  /** The instance of the content we're rendering the passage for.  */
  gQuest?:
    | QuestInstance
    | OpportunityInstance
    | EventInstance
    | ActivityInstance
    | InteractionInstance
    | UnitAction;

  /** The outcome of the quest, using when rendering quest outcome passages */
  gOutcome?: "crit" | "success" | "failure" | "disaster" | null;

  /** The actor map (actor_name -> Unit) for the content instance, when applicable. */
  g: ActorUnitMap;

  /** The team assigned to the quest/content instance. */
  gTeam?: Team;

  ////////////////////////////////////////////////////////////////////////////
  //
  // Variables used to transmit the selected unit/whatever
  // between passages. We cannot use State.temporary because if the page
  // was reloaded the value would be lost.
  //
  ////////////////////////////////////////////////////////////////////////////

  gUnit_key?: UnitKey;
  gParty_key?: PartyKey;
  gPartySelected_key?: PartyKey;
  gUnitSelected_key?: UnitKey;
  gUnit_skill_focus_change_key?: UnitKey;
  gUnitMultiTraining_key?: UnitKey;
  gFortGridBuildRoomKey?: RoomInstanceKey;
  gFortGridPlaceRoomKey?: RoomInstanceKey;
  gUseItem_key?: ItemKey;
  gDuty_key?: DutyInstanceKey;
  gOpportunity_key?: OpportunityInstanceKey;
  gSlaveOrder_key?: SlaveOrderKey;
  gBedchamber_key?: BedchamberKey;
  gBedchamberChangeFurnitureReturnPassage?: string;
  gInteractionReturnPassage?: string;
  gInteractionInstance?: InteractionInstance;
  gEquipmentSet_key?: EquipmentSetKey;
  gEquipmentSetChangeReturnPassage?: string;
  gUnitDetailReturnPassage?: string;
  gInteractiveSexUnitIds?: UnitKey[];
  gInteractiveSexLocation_key?: string;
  gNewGamePlusExLeader?: boolean;
  gNewGamePlusExtraKeys?: UnitKey[];
  gAdhocQuest_key?: QuestInstanceKey;

  ////////////////////////////////////////////////////////////////////////////
  //
  // Debug Mode
  //
  ////////////////////////////////////////////////////////////////////////////

  /**
   * The flag which determines if the "debug mode" is enabled or not
   */
  gDebug?: boolean;

  /**
   * Whether the debug mode was turned on at any point during this save.
   * Mostly used to show a warning to prevent player from reporting a "bug"
   * if they broke the game with debug mode.
   */
  gDebugWasTurnedOn?: boolean;

  /**
   * Whether to show additional inline info (object keys, etc.), when debug mode is enabled.
   * This alters parts of the game UI,
   * so keep in mind you won't see the same UI a regular player would see.
   */
  gDebugInfo?: boolean;

  gDebugQuestTest?: boolean;
  qDebugQuestTemplate_key?: QuestTemplateKey;
  qDebugQuestResult?: QuestOutcome;
  qDebugOpportunityTemplate_key?: OpportunityTemplateKey;
  gDebugOpportunityOption?: number;
  qDebugActivityTemplate_key?: ActivityTemplateKey;
  qDebugEventTemplate_key?: EventTemplateKey;
  qDebugInteractionTemplate_key?: InteractionTemplateKey;
  gDebugLiving_key?: LivingKey;
}

////////////////////////////////////////////////////////////////////////////
//
// Devtool-only state variables
//
////////////////////////////////////////////////////////////////////////////
interface StateVariablesDevtool {
  /** The flag that determines if we're in devtool or not. */
  qDevTool: boolean;

  devqueue?: Record<string, [string, any][]>;

  devtooltype?: "quest" | "opportunity" | "event" | "interaction" | "activity";

  dtquest?:
    | QuestTemplate
    | OpportunityTemplate
    | EventTemplate
    | InteractionTemplate
    | ActivityTemplate;

  // Quest editor
  qkey?: string;
  qfilename?: string;
  qpassagesetup?: string;
  qpassagedesc?: string;
  qpassageoutcomes?: string[];

  // Opportunity editor
  okey?: string;
  opassagesetup?: string;
  opassagedesc?: string;

  // Event editor
  ekey?: string;
  epassagesetup: string;
  epassagedesc: string;

  // Interaction editor
  ikey?: string;
  ipassagesetup?: string;
  ipassagedesc?: string;

  // Activity editor
  akey?: string;
  apassagesetup?: string;
  apassagedesc?: string;

  //
  // Misc
  //

  /** A temporary instance of the content using for rendering the text/passage previews. */
  compiledquest?:
    | QuestInstance
    | OpportunityInstance
    | EventInstance
    | InteractionInstance
    | ActivityInstance;

  dtEditActor?: string;

  qcustomcriteria: InstanceType<typeof setup.UnitCriteria>[];
  qcustomslaveorder: InstanceType<typeof SlaveOrderFlex>[];
  qcustomtitle: InstanceType<typeof setup.Title>[];
  qcustomunitgroup: InstanceType<typeof setup.UnitGroup>[];
  qdesc: string;
  qoutcomedesc: string[];
  qPassageName: string;
  qpool: InstanceType<typeof setup.QuestPool>;
  qrarity: number;
  qrolename: string;
  qscrolly: number | undefined;
}
