export const DEFINITION_SUBRACE_NEKO: SubraceDefinition = {
  key: "subrace_neko",
  name: "Neko",
  noun: "neko",
  homeland_region: setup.Text.Race.REGIONS.forest,
  company_key: "neko",
  description:
    "These <<rep setup.trait.race_catkin>> descend from the <<lore race_tigerkin>> and live in the jungles on the western forest. Their furry pedigree has worn off completely, usually leaving only their ears, tails, and occasionally eyes being similar to that of a cat. Attuned to the earth domain like their neighbors, the elves.",
  slave_value: 0,
  rarity: "common",
  race: "race_catkin",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_neko: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_hunter: "POOL_BG_COMMON_1",

    bg_entertainer: "POOL_BG_COMMON_1",
    bg_farmer: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_whore: "POOL_BG_COMMON_1",
    bg_woodsman: "POOL_BG_COMMON_1",

    bg_unemployed: "POOL_BG_COMMON_1",
    bg_slave: "POOL_BG_COMMON_1",

    bg_informer: "POOL_BG_UNCOMMON_2",

    bg_artisan: "POOL_BG_RARE_3",

    bg_maid: "POOL_BG_RARE_3",

    bg_assassin: "POOL_BG_EPIC_4",
    bg_wildman: "POOL_BG_EPIC_4",

    bg_apprentice: "POOL_BG_EPIC_4",
    bg_artist: "POOL_BG_EPIC_4",

    bg_clerk: "POOL_BG_EPIC_4",
    bg_mercenary: "POOL_BG_EPIC_4",
    bg_monk: "POOL_BG_EPIC_4",
    bg_nomad: "POOL_BG_EPIC_4",
    bg_merchant: "POOL_BG_EPIC_4",
    bg_soldier: "POOL_BG_EPIC_4",
    bg_thug: "POOL_BG_EPIC_4",

    bg_adventurer: "POOL_BG_LEGENDARY_5",
    bg_courtesan: "POOL_BG_LEGENDARY_5",
    bg_noble: "POOL_BG_LEGENDARY_5",
    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_scholar: "POOL_BG_LEGENDARY_5",

    bg_priest: "POOL_BG_LEGENDARY_5",
    bg_slaver: "POOL_BG_LEGENDARY_5",

    bg_seaman: "POOL_BG_LEGENDARY_5",

    bg_engineer: "POOL_BG_MYTHIC_6",
    bg_healer: "POOL_BG_MYTHIC_6",
    bg_metalworker: "POOL_BG_MYTHIC_6",
    bg_mystic: "POOL_BG_MYTHIC_6",

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

    per_playful: "POOL_PER_UNCOMMON_2",

    per_lustful: "POOL_PER_RARE_3",
    per_active: "POOL_PER_RARE_3",
    per_dreamy: "POOL_PER_RARE_3",

    per_dominant: "POOL_PER_EPIC_4",
    per_submissive: "POOL_PER_EPIC_4",
    per_sexaddict: "POOL_PER_EPIC_4",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_entertain: 0.1,
    magic_earth: 0.05,
    magic_earth_master: 0.005,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    dick_tiny: 0.01,
    dick_huge: 0.01,
    dick_titanic: 0.001,

    balls_tiny: 0.01,
    balls_huge: 0.01,
    balls_titanic: 0.001,

    breast_tiny: 0.01,
    breast_huge: 0.01,
    breast_titanic: 0.001,

    /* =========== */
    /* SKIN */
    /* =========== */

    eyes_neko: 0.5,
    ears_neko: 1.0,
    tail_neko: 1.0,
    arms_neko: 0.0001,
    body_neko: 0.0001,
    legs_neko: 0.0001,
    mouth_neko: 0.0001,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_wind: 5.0,
    magic_wind_master: 5.0,
  },
};
