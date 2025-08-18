export const DEFINITION_SUBRACE_HUMANVALE: SubraceDefinition = {
  key: "subrace_humanvale",
  name: "Human (Vale)",
  noun: "northerner",
  homeland_region: setup.Text.Race.REGIONS.vale,
  company_key: "humanvale",
  description:
    "<<rep setup.trait.race_human>> born on the northern vales. Hardy, if somewhat brash people. The harsh winters make these people attuned to the domain of <<lore magic_water>>.",
  slave_value: 0,
  rarity: "common",
  race: "race_human",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_humanvale: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_farmer: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_thug: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",

    bg_slave: "POOL_BG_COMMON_1",
    bg_unemployed: "POOL_BG_COMMON_1",

    bg_mercenary: "POOL_BG_UNCOMMON_2",
    bg_monk: "POOL_BG_UNCOMMON_2",

    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_raider: "POOL_BG_UNCOMMON_2",

    bg_artisan: "POOL_BG_RARE_3",
    bg_priest: "POOL_BG_RARE_3",
    bg_wiseman: "POOL_BG_RARE_3",

    bg_adventurer: "POOL_BG_EPIC_4",
    bg_healer: "POOL_BG_EPIC_4",
    bg_wildman: "POOL_BG_EPIC_4",

    bg_apprentice: "POOL_BG_EPIC_4",
    bg_informer: "POOL_BG_EPIC_4",

    bg_entertainer: "POOL_BG_EPIC_4",
    bg_hunter: "POOL_BG_EPIC_4",
    bg_merchant: "POOL_BG_EPIC_4",
    bg_maid: "POOL_BG_EPIC_4",
    bg_nomad: "POOL_BG_EPIC_4",
    bg_pirate: "POOL_BG_EPIC_4",
    bg_thief: "POOL_BG_EPIC_4",
    bg_whore: "POOL_BG_EPIC_4",
    bg_woodsman: "POOL_BG_EPIC_4",

    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_metalworker: "POOL_BG_LEGENDARY_5",
    bg_mystic: "POOL_BG_LEGENDARY_5",
    bg_noble: "POOL_BG_LEGENDARY_5",
    bg_scholar: "POOL_BG_LEGENDARY_5",

    bg_assassin: "POOL_BG_MYTHIC_6",
    bg_engineer: "POOL_BG_MYTHIC_6",

    bg_artist: "POOL_BG_MYTHIC_6",

    bg_clerk: "POOL_BG_MYTHIC_6",
    bg_seaman: "POOL_BG_MYTHIC_6",

    bg_royal: "POOL_BG_ULTRA_7",

    bg_courtesan: "POOL_BG_ULTRA_7",

    bg_mist: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_direct: "POOL_PER_RARE_3",
    per_brave: "POOL_PER_RARE_3",
    per_loyal: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_ambidextrous: 0.1,
    magic_water: 0.05,
    magic_water_master: 0.005,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_strong: 0.1,
    muscle_verystrong: 0.02,

    /* =========== */
    /* SKIN */
    /* =========== */
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_fire: 5,
    magic_fire_master: 5,
  },
};
