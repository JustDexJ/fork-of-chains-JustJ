import type { UnitGroupDefinition } from "../../classes/unit/UnitGroup";

export default definitions<UnitGroupDefinition>()({
  missingslaves: {
    name: "Special: Missing Slaves",
    chances: [],
    reuse_chance: 1.0,
    unit_post_process: [],
  },

  /* Special unit group class. Will automatically call one of the below. */
  soldslaves: undefined as any,

  soldslavesuntrained: {
    name: "Special: Sold Slaves (Untrained)",
    chances: [],
    reuse_chance: 1.0,
    unit_post_process: [],
  },

  soldslavesbasicobedience: {
    name: "Special: Sold Slaves (Basic Obedience)",
    chances: [],
    reuse_chance: 1.0,
    unit_post_process: [],
  },

  soldslavesobedient: {
    name: "Special: Sold Slaves (Obedient)",
    chances: [],
    reuse_chance: 1.0,
    unit_post_process: [],
  },
});
