export const DEFINITION_SUBRACE_HUMANDESERT: SubraceDefinition = {
  key: "subrace_humandesert",
  name: "Human (Desert)",
  noun: "desertfolk",
  homeland_region: setup.Text.Race.REGIONS.desert,
  company_key: "humandesert",
  description:
    "<<rep setup.trait.race_human>> born in the east region. Strong people thriving in the harsh desert climate, and often attuned to the domain of <<lore magic_fire>>.",
  slave_value: 0,
  rarity: "common",
  race: "race_human",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_humandesert: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_foodworker: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_merchant: "POOL_BG_COMMON_1",
    bg_nomad: "POOL_BG_COMMON_1",
    bg_raider: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_thug: "POOL_BG_COMMON_1",
    bg_whore: "POOL_BG_COMMON_1",

    bg_unemployed: "POOL_BG_COMMON_1",
    bg_slave: "POOL_BG_COMMON_1",

    bg_artisan: "POOL_BG_UNCOMMON_2",
    bg_informer: "POOL_BG_UNCOMMON_2",
    bg_mercenary: "POOL_BG_UNCOMMON_2",
    bg_monk: "POOL_BG_UNCOMMON_2",
    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_pirate: "POOL_BG_UNCOMMON_2",
    bg_entertainer: "POOL_BG_UNCOMMON_2",

    bg_artist: "POOL_BG_RARE_3",

    bg_hunter: "POOL_BG_EPIC_4",
    bg_priest: "POOL_BG_EPIC_4",

    bg_assassin: "POOL_BG_EPIC_4",
    bg_healer: "POOL_BG_EPIC_4",
    bg_metalworker: "POOL_BG_EPIC_4",
    bg_wildman: "POOL_BG_EPIC_4",

    bg_apprentice: "POOL_BG_EPIC_4",
    bg_wiseman: "POOL_BG_EPIC_4",

    bg_clerk: "POOL_BG_EPIC_4",
    bg_farmer: "POOL_BG_EPIC_4",
    bg_seaman: "POOL_BG_EPIC_4",

    bg_noble: "POOL_BG_LEGENDARY_5",
    bg_scholar: "POOL_BG_LEGENDARY_5",

    bg_mist: "POOL_BG_MYTHIC_6",

    bg_adventurer: "POOL_BG_MYTHIC_6",
    bg_courtesan: "POOL_BG_MYTHIC_6",
    bg_engineer: "POOL_BG_MYTHIC_6",
    bg_knight: "POOL_BG_MYTHIC_6",
    bg_mystic: "POOL_BG_MYTHIC_6",

    bg_maid: "POOL_BG_MYTHIC_6",
    bg_woodsman: "POOL_BG_MYTHIC_6",

    bg_royal: "POOL_BG_ULTRA_7",

    bg_boss: "POOL_BG_FINAL_8",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_attentive: "POOL_PER_UNCOMMON_2",
    per_serious: "POOL_PER_UNCOMMON_2",
    per_stubborn: "POOL_PER_UNCOMMON_2",

    per_evil: "POOL_PER_LEGENDARY_5",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_creative: 0.1,
    magic_fire: 0.05,
    magic_fire_master: 0.005,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    face_attractive: 0.05,
    face_beautiful: 0.01,
    tough_tough: 0.2,

    /* =========== */
    /* SKIN */
    /* =========== */
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_water: 5.0,
    magic_water_master: 5.0,
  },
};
