import type { UnitGroupDefinition } from "../../classes/unit/UnitGroup";

export default definitions<UnitGroupDefinition>()({
  missingslavers: {
    name: "Special: Missing Slavers",
    chances: [],
    reuse_chance: 1.0,
    unit_post_process: [],
  },
});
