import type { UnitGroupDefinition } from "../../classes/unit/UnitGroup";

export default definitions<UnitGroupDefinition>()({
  // Define the special "null" unit group
  none: {
    name: "Special: Empty unit group",
    chances: [],
    reuse_chance: 0,
    unit_post_process: [],
  },

  new_game_plus_slaves: {
    name: "new game plus slaves",
    chances: [],
    reuse_chance: 1,
    unit_post_process: [],
  },
});
