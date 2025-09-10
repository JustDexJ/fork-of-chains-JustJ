import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";

export default {
  job_slaver: {
    name: "slaver",
    description: "A slaver in your employ",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["job", "computed"],
  },

  job_slave: {
    name: "slave",
    description: "A slave under your care",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["job", "computed"],
  },

  job_retired: {
    name: "retired",
    description: "Has retired from being a slaver at your company",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["job", "computed"],
  },

  job_unemployed: {
    name: "unaffiliated",
    description: "Not part of your company",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["job", "computed"],
  },
} satisfies TraitOrGroupDefinitions;
