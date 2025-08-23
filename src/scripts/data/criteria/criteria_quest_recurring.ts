import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  quest_offeringslave: {
    name: "Offering Slave",
    crit_traits: [
      "per_sexaddict",
      "per_submissive",
      "per_masochistic",
      "training_obedience_advanced",
      "training_obedience_master",
      "eq_slutty",
    ],
    disaster_traits: [
      "race_elf",
      "race_wolfkin",
      "race_catkin",
      "race_greenskin",
      "race_lizardkin",
      "race_demon",
      "per_chaste",
      "per_dominant",
      "magic_water",
      "magic_water_master",
    ] /* disaster traits */,
    restrictions: [
      qres.IsCanBeSold(),
      qres.Job("slave"),
      qres.Trait("training_obedience_basic"),
    ] /* requirement */,
    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },
});
