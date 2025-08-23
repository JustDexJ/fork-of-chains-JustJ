import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";
import { Constants } from "../../constants";

export default {
  "group:value": {
    add_tags: ["value", "computed"],
    sequence: {
      value_low: {
        name: "low value",
        description: `Fetch a low value when sold as a slave. Obtained when value is lower than ${Constants.TRAIT_VALUE_LOW_THRESHOLD}g`,
      },
      _: null,
      value_high1: {
        name: "valuable",
        description: `Quite a valuable unit that will fetch a nice sum in the market as a slave. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[0]}g`,
        icon_settings: { tier: 1 },
      },
      value_high2: {
        name: "high-value",
        description: `Very valuable unit that will earn a great deal of coin in the market as a slave. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[1]}g`,
        icon_settings: { tier: 2 },
      },
      value_high3: {
        name: "very valuable",
        description: `Greatly valuable unit which will make anyone a tidy sum should they happen to enslave the unit. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[2]}g`,
        icon_settings: { tier: 3 },
      },
      value_high4: {
        name: "extremely valuable",
        description: `A rare specimen of a unit that will fetch an exorbitant sum in slave auctions, should they be enslaved. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[3]}g`,
        icon_settings: { tier: 4 },
      },
      value_high5: {
        name: "mythical",
        description: `Unit whose value rises far beyond those of other units --- they say only very few of these units exists in the world as slaves. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[4]}g`,
        icon_settings: { tier: 5 },
      },
      value_high6: {
        name: "god-valued",
        description: `An exorbitantly valuable unit. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[5]}g`,
        icon_settings: { tier: 6 },
      },
      value_high7: {
        name: "ultimate value",
        description: `An impossible feat. Obtained when value is at least ${Constants.TRAIT_VALUE_HIGH_THRESHOLDS[6]}g`,
        icon_settings: { tier: 7 },
      },
    },
  },

  "group:join": {
    add_tags: ["join", "computed"],
    sequence: {
      join_junior: {
        name: "new",
        description:
          "A new member of your company and has been with you for less than a year",
      },
      _: null,
      join_senior: {
        name: "senior",
        description:
          "Has been with your company for a long time, more than four years",
      },
    },
  },
} satisfies TraitOrGroupDefinitions;
