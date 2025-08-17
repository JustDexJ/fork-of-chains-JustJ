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

    bg_foodworker: setup.POOL_BG_COMMON_1,
    bg_laborer: setup.POOL_BG_COMMON_1,
    bg_merchant: setup.POOL_BG_COMMON_1,
    bg_nomad: setup.POOL_BG_COMMON_1,
    bg_raider: setup.POOL_BG_COMMON_1,
    bg_soldier: setup.POOL_BG_COMMON_1,
    bg_thief: setup.POOL_BG_COMMON_1,
    bg_thug: setup.POOL_BG_COMMON_1,
    bg_whore: setup.POOL_BG_COMMON_1,

    bg_unemployed: setup.POOL_BG_COMMON_1,
    bg_slave: setup.POOL_BG_COMMON_1,

    bg_artisan: setup.POOL_BG_UNCOMMON_2,
    bg_informer: setup.POOL_BG_UNCOMMON_2,
    bg_mercenary: setup.POOL_BG_UNCOMMON_2,
    bg_monk: setup.POOL_BG_UNCOMMON_2,
    bg_slaver: setup.POOL_BG_UNCOMMON_2,

    bg_pirate: setup.POOL_BG_UNCOMMON_2,
    bg_entertainer: setup.POOL_BG_UNCOMMON_2,

    bg_artist: setup.POOL_BG_RARE_3,

    bg_hunter: setup.POOL_BG_EPIC_4,
    bg_priest: setup.POOL_BG_EPIC_4,

    bg_assassin: setup.POOL_BG_EPIC_4,
    bg_healer: setup.POOL_BG_EPIC_4,
    bg_metalworker: setup.POOL_BG_EPIC_4,
    bg_wildman: setup.POOL_BG_EPIC_4,

    bg_apprentice: setup.POOL_BG_EPIC_4,
    bg_wiseman: setup.POOL_BG_EPIC_4,

    bg_clerk: setup.POOL_BG_EPIC_4,
    bg_farmer: setup.POOL_BG_EPIC_4,
    bg_seaman: setup.POOL_BG_EPIC_4,

    bg_noble: setup.POOL_BG_LEGENDARY_5,
    bg_scholar: setup.POOL_BG_LEGENDARY_5,

    bg_mist: setup.POOL_BG_MYTHIC_6,

    bg_adventurer: setup.POOL_BG_MYTHIC_6,
    bg_courtesan: setup.POOL_BG_MYTHIC_6,
    bg_engineer: setup.POOL_BG_MYTHIC_6,
    bg_knight: setup.POOL_BG_MYTHIC_6,
    bg_mystic: setup.POOL_BG_MYTHIC_6,

    bg_maid: setup.POOL_BG_MYTHIC_6,
    bg_woodsman: setup.POOL_BG_MYTHIC_6,

    bg_royal: setup.POOL_BG_ULTRA_7,

    bg_boss: setup.POOL_BG_FINAL_8,

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_attentive: setup.POOL_PER_UNCOMMON_2,
    per_serious: setup.POOL_PER_UNCOMMON_2,
    per_stubborn: setup.POOL_PER_UNCOMMON_2,

    per_evil: setup.POOL_PER_LEGENDARY_5,

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
