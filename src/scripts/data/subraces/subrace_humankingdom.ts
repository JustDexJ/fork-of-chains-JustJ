export const DEFINITION_SUBRACE_HUMANKINGDOM: SubraceDefinition = {
  key: "subrace_humankingdom",
  name: "Human (Kingdom)",
  noun: "human",
  homeland_region: setup.Text.Race.REGIONS.city,
  company_key: "humankingdom",
  description:
    "<<rep setup.trait.race_human>> born in the kingdom blessed with fertile lands. Many are attuned to the domain of <<lore magic_wind>>.",
  slave_value: 0,
  rarity: "common",
  race: "race_human",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_humankingdom: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_clerk: "POOL_BG_COMMON_1",
    bg_farmer: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_maid: "POOL_BG_COMMON_1",
    bg_merchant: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_thug: "POOL_BG_COMMON_1",

    bg_unemployed: "POOL_BG_COMMON_1",

    bg_artisan: "POOL_BG_UNCOMMON_2",
    bg_mercenary: "POOL_BG_UNCOMMON_2",

    bg_entertainer: "POOL_BG_UNCOMMON_2",
    bg_pirate: "POOL_BG_UNCOMMON_2",
    bg_raider: "POOL_BG_UNCOMMON_2",
    bg_seaman: "POOL_BG_UNCOMMON_2",
    bg_whore: "POOL_BG_UNCOMMON_2",

    bg_slave: "POOL_BG_UNCOMMON_2",

    bg_apprentice: "POOL_BG_RARE_3",
    bg_informer: "POOL_BG_RARE_3",
    bg_slaver: "POOL_BG_RARE_3",

    bg_woodsman: "POOL_BG_RARE_3",

    bg_courtesan: "POOL_BG_EPIC_4",
    bg_healer: "POOL_BG_EPIC_4",
    bg_noble: "POOL_BG_EPIC_4",
    bg_scholar: "POOL_BG_EPIC_4",

    bg_artist: "POOL_BG_EPIC_4",
    bg_hunter: "POOL_BG_EPIC_4",
    bg_priest: "POOL_BG_EPIC_4",
    bg_monk: "POOL_BG_EPIC_4",
    bg_wiseman: "POOL_BG_EPIC_4",

    bg_assassin: "POOL_BG_LEGENDARY_5",
    bg_engineer: "POOL_BG_LEGENDARY_5",
    bg_wildman: "POOL_BG_LEGENDARY_5",

    bg_nomad: "POOL_BG_LEGENDARY_5",

    bg_boss: "POOL_BG_MYTHIC_6",

    bg_adventurer: "POOL_BG_MYTHIC_6",
    bg_knight: "POOL_BG_MYTHIC_6",
    bg_metalworker: "POOL_BG_MYTHIC_6",
    bg_mystic: "POOL_BG_MYTHIC_6",

    bg_mist: "POOL_BG_ULTRA_7",
    bg_royal: "POOL_BG_ULTRA_7",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_connected: 0.1,
    magic_wind: 0.03,
    magic_wind_master: 0.003,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    /* =========== */
    /* SKIN */
    /* =========== */

    wings_angel: 0.000001,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_earth: 5,
    magic_earth_master: 5,
  },
};
