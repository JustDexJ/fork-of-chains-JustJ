import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";

export default {
  gender_male: {
    name: "male",
    description: "Has a masculine appearance.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["gender", "common"],
  },
  gender_female: {
    name: "female",
    description: "Has a femenine appearance.",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["gender", "common"],
  },
} satisfies TraitOrGroupDefinitions;
