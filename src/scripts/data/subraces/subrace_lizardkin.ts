export const DEFINITION_SUBRACE_LIZARDKIN: SubraceDefinition = {
  key: "subrace_lizardkin",
  name: "Lizardkin",
  noun: "lizardkin",
  homeland_region: setup.Text.Race.REGIONS.sea,
  company_key: "lizardkin",
  description:
    "These relatively aggressive variant of <<rep setup.trait.race_lizardkin>> that can occasionally be met across the <<lore region_sea>>. They are adept swimmers and also make excellent scouts, but hiring them is problematic as most lizardkin would prefer their own company. Unsurprisingly, these people are often attuned to <<lore magic_water>>.",
  slave_value: 3000,
  rarity: "rare",
  race: "race_lizardkin",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_lizardkin: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_seaman: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_pirate: "POOL_BG_COMMON_1",

    bg_adventurer: "POOL_BG_UNCOMMON_2",
    bg_mystic: "POOL_BG_UNCOMMON_2",

    bg_hunter: "POOL_BG_UNCOMMON_2",
    bg_mercenary: "POOL_BG_UNCOMMON_2",
    bg_monk: "POOL_BG_UNCOMMON_2",
    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_woodsman: "POOL_BG_UNCOMMON_2",
    bg_entertainer: "POOL_BG_UNCOMMON_2",
    bg_thug: "POOL_BG_UNCOMMON_2",
    bg_raider: "POOL_BG_UNCOMMON_2",
    bg_laborer: "POOL_BG_UNCOMMON_2",
    bg_thief: "POOL_BG_UNCOMMON_2",

    bg_knight: "POOL_BG_RARE_3",
    bg_metalworker: "POOL_BG_RARE_3",
    bg_noble: "POOL_BG_RARE_3",
    bg_assassin: "POOL_BG_RARE_3",
    bg_wildman: "POOL_BG_RARE_3",
    bg_scholar: "POOL_BG_RARE_3",

    bg_apprentice: "POOL_BG_RARE_3",
    bg_priest: "POOL_BG_RARE_3",
    bg_artisan: "POOL_BG_RARE_3",
    bg_informer: "POOL_BG_RARE_3",

    bg_healer: "POOL_BG_EPIC_4",
    bg_foodworker: "POOL_BG_EPIC_4",

    bg_slave: "POOL_BG_EPIC_4",
    bg_unemployed: "POOL_BG_EPIC_4",

    bg_royal: "POOL_BG_LEGENDARY_5",

    bg_engineer: "POOL_BG_LEGENDARY_5",
    bg_courtesan: "POOL_BG_LEGENDARY_5",

    bg_wiseman: "POOL_BG_LEGENDARY_5",
    bg_artist: "POOL_BG_LEGENDARY_5",

    bg_farmer: "POOL_BG_LEGENDARY_5",
    bg_merchant: "POOL_BG_LEGENDARY_5",
    bg_nomad: "POOL_BG_LEGENDARY_5",
    bg_clerk: "POOL_BG_LEGENDARY_5",
    bg_maid: "POOL_BG_LEGENDARY_5",
    bg_whore: "POOL_BG_LEGENDARY_5",

    bg_mythical: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",
    bg_mist: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_loner: "POOL_PER_UNCOMMON_2",
    per_proud: "POOL_PER_UNCOMMON_2",
    per_brave: "POOL_PER_UNCOMMON_2",

    per_dominant: "POOL_PER_RARE_3",
    per_aggressive: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_intimidating: 0.2,

    magic_water: 0.1,
    magic_water_master: 0.01,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_strong: 0.2,
    muscle_verystrong: 0.1,
    muscle_extremelystrong: 0.01,

    height_tall: 0.5,
    height_giant: 0.1,

    tough_tough: 0.1,

    dick_large: 0.3,
    dick_huge: 0.15,
    dick_titanic: 0.02,

    balls_large: 0.3,
    balls_huge: 0.15,
    balls_titanic: 0.02,

    breast_large: 0.3,
    breast_huge: 0.15,
    breast_titanic: 0.02,

    /* =========== */
    /* SKIN */
    /* =========== */

    eyes_dragonkin: 1.0,
    ears_dragonkin: 1.0,
    mouth_dragonkin: 1.0,
    body_dragonkin: 1.0,
    arms_dragonkin: 1.0,
    legs_dragonkin: 1.0,
    tail_dragonkin: 1.0,
    dick_dragonkin: 0.9,
  },
  trait_dispreferences: {
    /* trait dispreferences */
  },
};
