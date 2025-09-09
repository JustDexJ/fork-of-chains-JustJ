//
// Code in this file is executed AFTER "setup" has been initialized with most stuff
// Mostly fills the static data objects/registries in setup (e.g. `setup.item` or `setup.trait`)
//

import { BuildingTemplate } from "../classes/BuildingTemplate";
import { CompanyTemplate } from "../classes/CompanyTemplate";
import { ContactTemplate } from "../classes/contact/ContactTemplate";
import { UnitCriteria } from "../classes/criteria/UnitCriteria";
import { Equipment } from "../classes/equipment/Equipment";
import { EquipmentPool } from "../classes/equipment/EquipmentPool";
import { EquipmentPoolGroup } from "../classes/equipment/EquipmentPoolGroup";
import { QuestPool } from "../classes/quest/QuestPool";
import { RoomTemplate } from "../classes/room/RoomTemplate";
import { UnitGroup } from "../classes/unit/UnitGroup";
import * as ACTIVITY_TEMPLATE_DEFINITIONS from "../data/activities/_index";
import {
  BUILDING_DEFINITIONS,
  ROOM_DEFINITIONS,
} from "../data/buildings/_buildings";
import { COMPANY_DEFINITIONS } from "../data/companies";
import { CONTACT_TEMPLATE_DEFINITIONS } from "../data/contacts/_index";
import { CRITERIA_DEFINITIONS } from "../data/criteria/_index";
import { DUTY_TEMPLATE_DEFINITIONS } from "../data/duties/_index";
import { EQUIPMENT_POOL_GROUP_DEFINITIONS } from "../data/equipments/_equipmentpools";
import {
  EQUIPMENT_DEFINITIONS,
  EQUIPMENT_POOL_DEFINITIONS,
} from "../data/equipments/_index";
import { EQUIPMENT_SLOT_DEFINITIONS } from "../data/equipmentslots";
import { FAMILY_RELATION_DEFINTIONS } from "../data/familyrelations";
import { FURNITURE_SLOT_DEFINITIONS } from "../data/furnitureslots";
import { ITEM_CLASS_DEFINITIONS } from "../data/itemclasses";
import { ITEM_DEFINITIONS } from "../data/items/_index";
import { ITEM_POOL_DEFINITIONS } from "../data/items/_itempools";
import { FURNITURE_ITEM_POOL_DEFINITIONS } from "../data/items/furnitures/_furrnitturepools";
import { FURNITURE_DEFINITIONS } from "../data/items/furnitures/_index";
import { JOB_DEFINITIONS } from "../data/jobs";
import { QUEST_POOL_DEFINITIONS } from "../data/questpools";
import { SKILL_DEFINITIONS } from "../data/skills";
import { SPEECHES_DEFINITIONS } from "../data/speeches";
import { SUBRACE_DEFINITIONS } from "../data/subraces/_index";
import { TITLE_DEFINITIONS } from "../data/titles";
import { TRAIT_DEFINITIONS } from "../data/traits/_index";
import { TRAIT_GROUP_DEFINITIONS } from "../data/traits/_traitgroups";
import { PERK_DEFINTIONS } from "../data/traits/perks/traits_perk";
import { UNIT_ACTION_DEFINITIONS } from "../data/unitactions/_index";
import { UNIT_GROUP_DEFINITIONS } from "../data/unitgroups/_index";
import { DataUtil } from "../util/DataUtil";
import { initSetup, initState } from "./state_init";

const executePassagesWithTag = setup.executePassagesWithTag;

function executePassage(passageName: string): void {
  new Wikifier(null, Story.get(passageName).text);
}

//
// NOTE: the order DOES matter!!
// Some entitites depend on others previously being defined,
// for example a lot of Unit Criterias reference the Jobs.
//

DataUtil.load(setup.Job, JOB_DEFINITIONS);

DataUtil.load(setup.EquipmentSlot, EQUIPMENT_SLOT_DEFINITIONS);

DataUtil.load(setup.FurnitureSlot, FURNITURE_SLOT_DEFINITIONS);

// Skills
DataUtil.load(setup.Skill, SKILL_DEFINITIONS);

// Traits & TraitGroups
DataUtil.loadTraitsAndInlineTraitGroups(TRAIT_DEFINITIONS);
DataUtil.load(setup.Perk, PERK_DEFINTIONS());
DataUtil.load(setup.TraitGroup, TRAIT_GROUP_DEFINITIONS);
executePassage("InitTraitTexts");

// Titles
DataUtil.load(setup.Title, TITLE_DEFINITIONS);

// Speeches (speech patterns)
DataUtil.load(setup.Speech, SPEECHES_DEFINITIONS);

// Lores
executePassagesWithTag("lore");

// Races & Subraces
DataUtil.load(setup.Subrace, SUBRACE_DEFINITIONS);

// Items (ItemClass / Item / Furniture)
{
  DataUtil.load(setup.ItemClass, ITEM_CLASS_DEFINITIONS);

  DataUtil.loadItems(ITEM_DEFINITIONS);

  setup.ItemUnitUsable.make_perk_potions();

  DataUtil.load(setup.Furniture, FURNITURE_DEFINITIONS);

  DataUtil.load(setup.ItemPool, ITEM_POOL_DEFINITIONS);
  DataUtil.load(setup.ItemPool, FURNITURE_ITEM_POOL_DEFINITIONS);
}

// Quest Difficulties
{
  setup.QuestDifficulty.generate();
}

// Unit Criterias
DataUtil.load(UnitCriteria, CRITERIA_DEFINITIONS);

// Company Templates
DataUtil.load(CompanyTemplate, COMPANY_DEFINITIONS);

// Unit Pools & Unit Groups
{
  executePassagesWithTag("unitpool");

  // Define the special "soldslaves" unit group
  new setup.UnitGroup_SoldSlaves("soldslaves", {
    name: "Special: Sold Slaves",
    chances: [],
    reuse_chance: 0,
    unit_post_process: [],
  });

  DataUtil.load(UnitGroup, UNIT_GROUP_DEFINITIONS);
  executePassagesWithTag("unitgroup");

  // Mark all statically-registered unit groups as "base"
  for (const unitgroup of Object.values(setup.unitgroup)) {
    unitgroup.is_base = true;
  }
}

// Equipments & Equipment Pools
DataUtil.load(Equipment, EQUIPMENT_DEFINITIONS);
DataUtil.load(EquipmentPool, EQUIPMENT_POOL_DEFINITIONS);
DataUtil.load(EquipmentPoolGroup, EQUIPMENT_POOL_GROUP_DEFINITIONS);
setup.EquipmentSet.initDefaultEquipmentSets();

// Livings
executePassagesWithTag("living");

// Quest Pools
DataUtil.load(QuestPool, QUEST_POOL_DEFINITIONS);

// Contact Templates
DataUtil.load(ContactTemplate, CONTACT_TEMPLATE_DEFINITIONS);

// Duty Templates
DataUtil.loadDuties(DUTY_TEMPLATE_DEFINITIONS);

// Building Templates & Room Templates
{
  DataUtil.load(RoomTemplate, ROOM_DEFINITIONS);
  DataUtil.load(BuildingTemplate, BUILDING_DEFINITIONS);

  RoomTemplate.initialize();
  setup.initializeRoomImageTable();
}

// Opportunities
executePassagesWithTag("opportunity");

// Quests (Quest Templates)
executePassagesWithTag("quest");
DataUtil.registerVeteranQuests();

// Unit action
DataUtil.loadUnitActions(UNIT_ACTION_DEFINITIONS);

// Events
executePassagesWithTag("event");

// Interactions
{
  new setup.InteractionPool("unit");

  executePassagesWithTag("interaction");
}

// Family Relations
DataUtil.load(setup.FamilyRelation, FAMILY_RELATION_DEFINTIONS);

// Activities
{
  DataUtil.loadWithEmbeddedKeys(
    setup.ActivityTemplate,
    ACTIVITY_TEMPLATE_DEFINITIONS,
  );
  setup.ActivityTemplateInitFuck();
}

//
// Finalize
//

// Init setup
initSetup.call(setup);

// Init game state
initState.call(State.variables);

setup.INIT_DONE = true;
