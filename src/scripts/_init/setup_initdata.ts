//
// Code in this file is executed AFTER "setup" has been initialized with most stuff
// Mostly fills the static data objects/registries in setup (e.g. `setup.item` or `setup.trait`)
//

// TODO: migrate all remaining to js/ts

import { EQUIPMENT_SLOT_DEFINITIONS } from "../data/equipmentslots";
import { FAMILY_RELATION_DEFINTIONS } from "../data/familyrelations";
import { FURNITURE_SLOT_DEFINITIONS } from "../data/furnitureslots";
import { ITEM_CLASS_DEFINITIONS } from "../data/itemclasses";
import { JOB_DEFINITIONS } from "../data/jobs";
import { SKILL_DEFINITIONS } from "../data/skills";
import { SPEECHES_DEFINITIONS } from "../data/speeches";
import { SUBRACE_DEFINITIONS } from "../data/subraces/_index";
import { TITLE_DEFINITIONS } from "../data/titles";
import { TRAIT_DEFINITIONS } from "../data/traits/_index";
import { TRAIT_GROUP_DEFINITIONS } from "../data/traits/_traitgroups";
import { PERK_DEFINTIONS } from "../data/traits/perks/traits_perk";
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

  executePassage("InitItem");

  executePassage("InitFurniture");
}

// Quest Difficulties
{
  setup.QuestDifficulty.generate();
}

// Unit Criterias
executePassagesWithTag("criteria");

// Company Templates
executePassagesWithTag("company");

// Unit Pools & Unit Groups
{
  executePassagesWithTag("unitpool");

  // Define the special "null" unit group
  new setup.UnitGroup("none", "Special: Empty unit group", [], 0, []);

  executePassage("InitUnitGroups");

  // Mark all statically-registered unit groups as "base"
  for (const unitgroup of Object.values(setup.unitgroup)) {
    unitgroup.is_base = true;
  }
}

// Equipment Pools
//executePassage("InitEquipmentPool");

// Equipments
executePassage("InitEquipment");

// Livings
executePassagesWithTag("living");

// Quest Pools
executePassage("InitQuestPool");

// Contact Template
executePassagesWithTag("contact");

// Duty Templates
executePassage("InitDutyTemplates");

// Building Templates
executePassage("InitBuildingTemplate");

// Opportunities
executePassagesWithTag("opportunity");

// Quests
executePassage("InitQuestTemplate");

// Unit action
executePassage("InitUnitAction");

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
  executePassagesWithTag("activity");

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
