export const DEFINITION_SUBRACE_TIGERKIN: SubraceDefinition = {
  key: "subrace_tigerkin",
  name: "Tigerkin",
  noun: "tigerkin",
  homeland_region: setup.Text.Race.REGIONS.forest,
  company_key: "neko",
  description:
    "These <<rep setup.trait.race_catkin>> are the ancestors of the modern day <<rep setup.trait.subrace_neko>> with all their furry glory. Similar with their modern counterpart, they are often attuned to <<lore magic_earth>>.",
  slave_value: 12500,
  rarity: "unicorn",
  race: "race_catkin",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_tigerkin: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_mercenary: "POOL_BG_COMMON_1",
    bg_monk: "POOL_BG_COMMON_1",

    bg_hunter: "POOL_BG_COMMON_1",
    bg_woodsman: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",

    bg_adventurer: "POOL_BG_RARE_3",
    bg_assassin: "POOL_BG_RARE_3",
    bg_metalworker: "POOL_BG_RARE_3",
    bg_mystic: "POOL_BG_RARE_3",
    bg_wildman: "POOL_BG_RARE_3",

    bg_apprentice: "POOL_BG_RARE_3",
    bg_artisan: "POOL_BG_RARE_3",
    bg_artist: "POOL_BG_RARE_3",
    bg_nomad: "POOL_BG_RARE_3",
    bg_merchant: "POOL_BG_RARE_3",
    bg_thug: "POOL_BG_RARE_3",

    bg_entertainer: "POOL_BG_RARE_3",
    bg_farmer: "POOL_BG_RARE_3",
    bg_foodworker: "POOL_BG_RARE_3",
    bg_laborer: "POOL_BG_RARE_3",
    bg_maid: "POOL_BG_RARE_3",
    bg_whore: "POOL_BG_RARE_3",

    bg_unemployed: "POOL_BG_LEGENDARY_5",
    bg_slave: "POOL_BG_LEGENDARY_5",

    bg_courtesan: "POOL_BG_LEGENDARY_5",
    bg_informer: "POOL_BG_LEGENDARY_5",
    bg_noble: "POOL_BG_LEGENDARY_5",
    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_scholar: "POOL_BG_LEGENDARY_5",

    bg_priest: "POOL_BG_LEGENDARY_5",
    bg_slaver: "POOL_BG_LEGENDARY_5",

    bg_clerk: "POOL_BG_LEGENDARY_5",
    bg_seaman: "POOL_BG_LEGENDARY_5",
    bg_thief: "POOL_BG_LEGENDARY_5",

    bg_engineer: "POOL_BG_MYTHIC_6",
    bg_healer: "POOL_BG_MYTHIC_6",

    bg_wiseman: "POOL_BG_MYTHIC_6",

    bg_pirate: "POOL_BG_MYTHIC_6",
    bg_raider: "POOL_BG_MYTHIC_6",

    bg_royal: "POOL_BG_ULTRA_7",

    bg_mist: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_dominant: setup.POOL_PER_UNCOMMON_2,
    per_proud: setup.POOL_PER_UNCOMMON_2,

    per_active: setup.POOL_PER_RARE_3,
    per_playful: setup.POOL_PER_RARE_3,
    per_lustful: setup.POOL_PER_RARE_3,

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_ambidextrous: 0.2,
    magic_earth: 0.1,
    magic_earth_master: 0.01,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_strong: 0.1,
    muscle_verystrong: 0.05,
    muscle_extremelystrong: 0.01,

    dick_huge: 0.1,
    dick_titanic: 0.01,

    balls_huge: 0.1,
    balls_titanic: 0.01,

    breast_huge: 0.1,
    breast_titanic: 0.01,

    tough_nimble: 0.2,

    /* =========== */
    /* SKIN */
    /* =========== */

    eyes_neko: 0.9,
    ears_neko: 1.0,
    tail_neko: 1.0,
    arms_neko: 1.0,
    body_neko: 1.0,
    legs_neko: 1.0,
    mouth_neko: 1.0,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_wind: 5.0,
    magic_wind_master: 5.0,
  },
};
