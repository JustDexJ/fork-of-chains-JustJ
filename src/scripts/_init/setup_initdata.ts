//
// Code in this file is executed AFTER "setup" has been initialized with most stuff
// Mostly fills the static data objects/registries in setup (e.g. `setup.item` or `setup.trait`)
//

// TODO: migrate all remaining to js/ts

import { initEquipmentSlots } from "../data/equipmentslot";
import { initFamilyRelations } from "../data/familyrelations";
import { initFurnitureSlots } from "../data/furnitureslot";
import { initJobs } from "../data/job";
import { initSkills } from "../data/skills";
import { initSpeeches } from "../data/speeches";
import { initTitles } from "../data/titles";
import { initSetup, initState } from "./state_init";

const executePassagesWithTag = setup.executePassagesWithTag;

function executePassage(passageName: string): void {
  const passage = Story.get(passageName);
  new Wikifier(null, passage.text);
}

//
// NOTE: the order DOES matter!!
// Some entitites depend on others previously being defined,
// for example a lot of Unit Criterias reference the Jobs.
//

initJobs();

initEquipmentSlots();

initFurnitureSlots();

// Skills
initSkills();

// Traits
executePassage("InitTraits");

// Titles
initTitles();

// Speeches (speech patterns)
initSpeeches();

// Lores
executePassagesWithTag("lore");

// Items (ItemClass / Item / Furniture)
{
  executePassage("InitItemClass");

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

// Unit Pools
executePassagesWithTag("unitpool");

// Unit Groups
{
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
initFamilyRelations();

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
