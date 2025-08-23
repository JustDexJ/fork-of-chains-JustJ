import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";
import { Constants } from "../../constants";

/*
Curse and Blessing traits. These traits does not affect skills, but have other gameplay effects.
*/

export default {
  /* =================== */
  /*   INJURY BLESSINGS  */
  /* =================== */

  "group:injury_blessing": {
    add_tags: ["blessingcurse", "blessingprotection"],
    sequence: {
      curse_weakness8: {
        name: "curse of weakness (8)",
        description:
          "Multiplies injury duration (up to additional " +
          8 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_weakness" },
      },
      curse_weakness7: {
        name: "curse of weakness (7)",
        description:
          "Multiplies injury duration (up to additional " +
          7 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_weakness" },
      },
      curse_weakness6: {
        name: "curse of weakness (6)",
        description:
          "Multiplies injury duration (up to additional " +
          6 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_weakness" },
      },
      curse_weakness5: {
        name: "curse of weakness (5)",
        description:
          "Multiplies injury duration (up to additional " +
          5 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_weakness" },
      },
      curse_weakness4: {
        name: "curse of weakness (4)",
        description:
          "Multiplies injury duration (up to additional " +
          4 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_weakness" },
      },
      curse_weakness3: {
        name: "curse of weakness (3)",
        description:
          "Multiplies injury duration (up to additional " +
          3 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_weakness" },
      },
      curse_weakness2: {
        name: "curse of weakness (2)",
        description:
          "Multiplies injury duration (up to additional " +
          2 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_weakness" },
      },
      curse_weakness1: {
        name: "curse of weakness (1)",
        description:
          "Multiplies injury duration (up to additional " +
          1 * Constants.CURSE_INJURY_WEEKS +
          " weeks) (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_weakness" },
      },
      _: null,
      blessing_protection1: {
        name: "blessing of protection (1)",
        description:
          "Prevents up to " +
          1 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_protection" },
      },
      blessing_protection2: {
        name: "blessing of protection (2)",
        description:
          "Prevents up to " +
          2 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_protection" },
      },
      blessing_protection3: {
        name: "blessing of protection (3)",
        description:
          "Prevents up to " +
          3 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_protection" },
      },
      blessing_protection4: {
        name: "blessing of protection (4)",
        description:
          "Prevents up to " +
          4 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_protection" },
      },
      blessing_protection5: {
        name: "blessing of protection (5)",
        description:
          "Prevents up to " +
          5 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_protection" },
      },
      blessing_protection6: {
        name: "blessing of protection (6)",
        description:
          "Prevents up to " +
          6 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_protection" },
      },
      blessing_protection7: {
        name: "blessing of protection (7)",
        description:
          "Prevents up to " +
          7 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_protection" },
      },
      blessing_protection8: {
        name: "blessing of protection (8)",
        description:
          "Prevents up to " +
          8 * Constants.BLESSING_INJURY_WEEKS +
          " weeks of injuries (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_protection",
          background: "blessing_max",
        },
      },
    },
  },

  /* =================== */
  /*   TRAUMA BLESSINGS  */
  /* =================== */

  "group:trauma_blessing": {
    add_tags: ["blessingcurse", "blessingsanity"],
    sequence: {
      curse_madness8: {
        name: "curse of madness (8)",
        description:
          "Multiplies trauma duration (up to additional " +
          8 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_madness" },
      },
      curse_madness7: {
        name: "curse of madness (7)",
        description:
          "Multiplies trauma duration (up to additional " +
          7 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_madness" },
      },
      curse_madness6: {
        name: "curse of madness (6)",
        description:
          "Multiplies trauma duration (up to additional " +
          6 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_madness" },
      },
      curse_madness5: {
        name: "curse of madness (5)",
        description:
          "Multiplies trauma duration (up to additional " +
          5 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_madness" },
      },
      curse_madness4: {
        name: "curse of madness (4)",
        description:
          "Multiplies trauma duration (up to additional " +
          4 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_madness" },
      },
      curse_madness3: {
        name: "curse of madness (3)",
        description:
          "Multiplies trauma duration (up to additional " +
          3 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_madness" },
      },
      curse_madness2: {
        name: "curse of madness (2)",
        description:
          "Multiplies trauma duration (up to additional " +
          2 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_madness" },
      },
      curse_madness1: {
        name: "curse of madness (1)",
        description:
          "Multiplies trauma duration (up to additional " +
          1 * Constants.CURSE_TRAUMA_WEEKS +
          " weeks) (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_madness" },
      },
      _: null,
      blessing_sanity1: {
        name: "blessing of sanity (1)",
        description:
          "Prevents up to " +
          1 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_sanity" },
      },
      blessing_sanity2: {
        name: "blessing of sanity (2)",
        description:
          "Prevents up to " +
          2 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_sanity" },
      },
      blessing_sanity3: {
        name: "blessing of sanity (3)",
        description:
          "Prevents up to " +
          3 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_sanity" },
      },
      blessing_sanity4: {
        name: "blessing of sanity (4)",
        description:
          "Prevents up to " +
          4 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_sanity" },
      },
      blessing_sanity5: {
        name: "blessing of sanity (5)",
        description:
          "Prevents up to " +
          5 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_sanity" },
      },
      blessing_sanity6: {
        name: "blessing of sanity (6)",
        description:
          "Prevents up to " +
          6 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_sanity" },
      },
      blessing_sanity7: {
        name: "blessing of sanity (7)",
        description:
          "Prevents up to " +
          7 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_sanity" },
      },
      blessing_sanity8: {
        name: "blessing of sanity (8)",
        description:
          "Prevents up to " +
          8 * Constants.BLESSING_TRAUMA_WEEKS +
          " weeks of trauma (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_sanity",
          background: "blessing_max",
        },
      },
    },
  },

  /* ======================= */
  /*   CORRUPTION BLESSINGS  */
  /* ======================= */

  "group:corruption_blessing": {
    add_tags: ["blessingcurse", "blessingsanity"],
    sequence: {
      curse_vice8: {
        name: "curse of vice (8)",
        description: "Increase effect of corruption on unit (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_vice" },
      },
      curse_vice7: {
        name: "curse of vice (7)",
        description: "Increase effect of corruption on unit (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_vice" },
      },
      curse_vice6: {
        name: "curse of vice (6)",
        description: "Increase effect of corruption on unit (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_vice" },
      },
      curse_vice5: {
        name: "curse of vice (5)",
        description: "Increase effect of corruption on unit (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_vice" },
      },
      curse_vice4: {
        name: "curse of vice (4)",
        description: "Increase effect of corruption on unit (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_vice" },
      },
      curse_vice3: {
        name: "curse of vice (3)",
        description: "Increase effect of corruption on unit (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_vice" },
      },
      curse_vice2: {
        name: "curse of vice (2)",
        description: "Increase effect of corruption on unit (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_vice" },
      },
      curse_vice1: {
        name: "curse of vice (1)",
        description: "Increase effect of corruption on unit (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_vice" },
      },
      _: null,
      blessing_purity1: {
        name: "blessing of purity (1)",
        description: "Prevents a corruption attempt (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_purity" },
      },
      blessing_purity2: {
        name: "blessing of purity (2)",
        description: "Prevents up to two corruption attempts (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_purity" },
      },
      blessing_purity3: {
        name: "blessing of purity (3)",
        description: "Prevents up to three corruption attempts (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_purity" },
      },
      blessing_purity4: {
        name: "blessing of purity (4)",
        description: "Prevents up to four corruption attempts (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_purity" },
      },
      blessing_purity5: {
        name: "blessing of purity (5)",
        description: "Prevents up to five corruption attempts (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_purity" },
      },
      blessing_purity6: {
        name: "blessing of purity (6)",
        description: "Prevents up to six corruption attempts (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_purity" },
      },
      blessing_purity7: {
        name: "blessing of purity (7)",
        description: "Prevents up to seven corruption attempts (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_purity" },
      },
      blessing_purity8: {
        name: "blessing of purity (8)",
        description: "Prevents up to eight corruption attempts (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_purity",
          background: "blessing_max",
        },
      },
    },
  },

  /* ================== */
  /*   LIFE BLESSINGS   */
  /* ================== */

  "group:life_blessing": {
    add_tags: ["blessingcurse", "blessinglife"],
    sequence: {
      curse_demise8: {
        name: "curse of demise (8)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_demise" },
      },
      curse_demise7: {
        name: "curse of demise (7)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_demise" },
      },
      curse_demise6: {
        name: "curse of demise (6)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_demise" },
      },
      curse_demise5: {
        name: "curse of demise (5)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_demise" },
      },
      curse_demise4: {
        name: "curse of demise (4)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_demise" },
      },
      curse_demise3: {
        name: "curse of demise (3)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_demise" },
      },
      curse_demise2: {
        name: "curse of demise (2)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_demise" },
      },
      curse_demise1: {
        name: "curse of demise (1)",
        description:
          "You will lose some money when the slaver is gone from your company for any reason (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_demise" },
      },
      _: null,
      blessing_life1: {
        name: "blessing of life (1)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_life" },
      },
      blessing_life2: {
        name: "blessing of life (2)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_life" },
      },
      blessing_life3: {
        name: "blessing of life (3)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_life" },
      },
      blessing_life4: {
        name: "blessing of life (4)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_life" },
      },
      blessing_life5: {
        name: "blessing of life (5)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_life" },
      },
      blessing_life6: {
        name: "blessing of life (6)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_life" },
      },
      blessing_life7: {
        name: "blessing of life (7)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_life" },
      },
      blessing_life8: {
        name: "blessing of life (8)",
        description:
          "May prevent a slaver from going missing. Consumes multiple stacks per use. Does not always work. (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_life",
          background: "blessing_max",
        },
      },
    },
  },

  /* ================== */
  /*   LUCK BLESSINGS   */
  /* ================== */

  "group:luck_blessing": {
    add_tags: ["blessingcurse", "blessingluck"],
    sequence: {
      curse_crow8: {
        name: "curse of crow (8)",
        description:
          "Reverts a critical success into a success on quests (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_crow" },
      },
      curse_crow7: {
        name: "curse of crow (7)",
        description:
          "Reverts a critical success into a success on quests (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_crow" },
      },
      curse_crow6: {
        name: "curse of crow (6)",
        description:
          "Reverts a critical success into a success on quests (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_crow" },
      },
      curse_crow5: {
        name: "curse of crow (5)",
        description:
          "Reverts a critical success into a success on quests (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_crow" },
      },
      curse_crow4: {
        name: "curse of crow (4)",
        description:
          "Reverts a critical success into a success on quests (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_crow" },
      },
      curse_crow3: {
        name: "curse of crow (3)",
        description:
          "Reverts a critical success into a success on quests (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_crow" },
      },
      curse_crow2: {
        name: "curse of crow (2)",
        description:
          "Reverts a critical success into a success on quests (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_crow" },
      },
      curse_crow1: {
        name: "curse of crow (1)",
        description:
          "Reverts a critical success into a success on quests (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_crow" },
      },
      _: null,
      blessing_luck1: {
        name: "blessing of luck (1)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_luck" },
      },
      blessing_luck2: {
        name: "blessing of luck (2)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_luck" },
      },
      blessing_luck3: {
        name: "blessing of luck (3)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_luck" },
      },
      blessing_luck4: {
        name: "blessing of luck (4)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_luck" },
      },
      blessing_luck5: {
        name: "blessing of luck (5)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_luck" },
      },
      blessing_luck6: {
        name: "blessing of luck (6)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_luck" },
      },
      blessing_luck7: {
        name: "blessing of luck (7)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_luck" },
      },
      blessing_luck8: {
        name: "blessing of luck (8)",
        description:
          "Rerolls a disastrous quest result once. Can reroll into another disaster outcome, if unlucky. Harder quests will consume more stacks. (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_luck",
          background: "blessing_max",
        },
      },
    },
  },

  /* ================== */
  /*   VIRGIN BLESSINGS   */
  /* ================== */

  "group:virgin_blessing": {
    add_tags: ["blessingcurse", "blessingvirginity"],
    sequence: {
      curse_agape8: {
        name: "curse of agape (8)",
        description:
          "Prevent anus and vagina from being tightened. (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_agape" },
      },
      curse_agape7: {
        name: "curse of agape (7)",
        description: "Prevent anus and vagina from being tightened. (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_agape" },
      },
      curse_agape6: {
        name: "curse of agape (6)",
        description: "Prevent anus and vagina from being tightened. (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_agape" },
      },
      curse_agape5: {
        name: "curse of agape (5)",
        description: "Prevent anus and vagina from being tightened. (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_agape" },
      },
      curse_agape4: {
        name: "curse of agape (4)",
        description: "Prevent anus and vagina from being tightened. (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_agape" },
      },
      curse_agape3: {
        name: "curse of agape (3)",
        description: "Prevent anus and vagina from being tightened. (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_agape" },
      },
      curse_agape2: {
        name: "curse of agape (2)",
        description: "Prevent anus and vagina from being tightened. (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_agape" },
      },
      curse_agape1: {
        name: "curse of agape (1)",
        description: "Prevent anus and vagina from being tightened. (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_agape" },
      },
      _: null,
      blessing_virginity1: {
        name: "blessing of virginity (1)",
        description: "Prevents anus and vagina from being gaped. (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_virginity" },
      },
      blessing_virginity2: {
        name: "blessing of virginity (2)",
        description: "Prevents anus and vagina from being gaped. (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_virginity" },
      },
      blessing_virginity3: {
        name: "blessing of virginity (3)",
        description: "Prevents anus and vagina from being gaped. (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_virginity" },
      },
      blessing_virginity4: {
        name: "blessing of virginity (4)",
        description: "Prevents anus and vagina from being gaped. (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_virginity" },
      },
      blessing_virginity5: {
        name: "blessing of virginity (5)",
        description: "Prevents anus and vagina from being gaped. (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_virginity" },
      },
      blessing_virginity6: {
        name: "blessing of virginity (6)",
        description: "Prevents anus and vagina from being gaped. (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_virginity" },
      },
      blessing_virginity7: {
        name: "blessing of virginity (7)",
        description: "Prevents anus and vagina from being gaped. (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_virginity" },
      },
      blessing_virginity8: {
        name: "blessing of virginity (8)",
        description:
          "Prevents anus and vagina from being gaped. (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_virginity",
          background: "blessing_max",
        },
      },
    },
  },

  /* ======================= */
  /*   DOMINANCE BLESSINGS   */
  /* ======================= */

  "group:dominance_blessing": {
    add_tags: ["blessingcurse", "blessingwolf"],
    sequence: {
      curse_lamb8: {
        name: "curse of lamb (8)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (8 stacks, max)",
        slave_value: 8 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse", "cursemax", "blessingcursemax"],
        icon_settings: { tier: 8, icon: "curse_lamb" },
      },
      curse_lamb7: {
        name: "curse of lamb (7)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (7 stacks)",
        slave_value: 7 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 7, icon: "curse_lamb" },
      },
      curse_lamb6: {
        name: "curse of lamb (6)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (6 stacks)",
        slave_value: 6 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 6, icon: "curse_lamb" },
      },
      curse_lamb5: {
        name: "curse of lamb (5)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (5 stacks)",
        slave_value: 5 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 5, icon: "curse_lamb" },
      },
      curse_lamb4: {
        name: "curse of lamb (4)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (4 stacks)",
        slave_value: 4 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 4, icon: "curse_lamb" },
      },
      curse_lamb3: {
        name: "curse of lamb (3)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (3 stacks)",
        slave_value: 3 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 3, icon: "curse_lamb" },
      },
      curse_lamb2: {
        name: "curse of lamb (2)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (2 stacks)",
        slave_value: 2 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 2, icon: "curse_lamb" },
      },
      curse_lamb1: {
        name: "curse of lamb (1)",
        description:
          "Prevent unit from being domified, removing submissive, or gaining dominant traits. (1 stacks)",
        slave_value: 1 * Constants.CURSE_VALUE,
        skill_bonuses: {},
        tags: ["curse"],
        icon_settings: { tier: 1, icon: "curse_lamb" },
      },
      _: null,
      blessing_wolf1: {
        name: "blessing of wolf (1)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (1 stack)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 1, icon: "blessing_wolf" },
      },
      blessing_wolf2: {
        name: "blessing of wolf (2)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (2 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 2, icon: "blessing_wolf" },
      },
      blessing_wolf3: {
        name: "blessing of wolf (3)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (3 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 3, icon: "blessing_wolf" },
      },
      blessing_wolf4: {
        name: "blessing of wolf (4)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (4 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 4, icon: "blessing_wolf" },
      },
      blessing_wolf5: {
        name: "blessing of wolf (5)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (5 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 5, icon: "blessing_wolf" },
      },
      blessing_wolf6: {
        name: "blessing of wolf (6)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (6 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 6, icon: "blessing_wolf" },
      },
      blessing_wolf7: {
        name: "blessing of wolf (7)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (7 stacks)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing"],
        icon_settings: { tier: 7, icon: "blessing_wolf" },
      },
      blessing_wolf8: {
        name: "blessing of wolf (8)",
        description:
          "Prevents unit from being sluttified, gaining submissive, or losing dominant traits. (8 stacks, max)",
        slave_value: 0,
        skill_bonuses: {},
        tags: ["blessing", "blessingmax", "blessingcursemax"],
        icon_settings: {
          tier: 8,
          icon: "blessing_wolf",
          background: "blessing_max",
        },
      },
    },
  },
} satisfies TraitOrGroupDefinitions;
