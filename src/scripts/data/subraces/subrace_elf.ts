export const DEFINITION_SUBRACE_ELF: SubraceDefinition = {
  key: "subrace_elf",
  name: "Elf",
  noun: "elf",
  homeland_region: setup.Text.Race.REGIONS.forest,
  company_key: "elf",
  description:
    "The most common <<rep setup.trait.race_elf>>, these graceful people lives in the western forest together with the <<rep setup.trait.subrace_neko>>. Attuned to the earth element, which grants them minor power to manipulate plants.",
  slave_value: 0,
  rarity: "common",
  race: "race_elf",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_elf: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_apprentice: "POOL_BG_COMMON_1",
    bg_hunter: "POOL_BG_COMMON_1",

    bg_clerk: "POOL_BG_COMMON_1",
    bg_farmer: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_merchant: "POOL_BG_COMMON_1",
    bg_woodsman: "POOL_BG_COMMON_1",

    bg_unemployed: "POOL_BG_COMMON_1",

    bg_artisan: "POOL_BG_UNCOMMON_2",
    bg_priest: "POOL_BG_UNCOMMON_2",

    bg_soldier: "POOL_BG_UNCOMMON_2",
    bg_thief: "POOL_BG_UNCOMMON_2",

    bg_slave: "POOL_BG_UNCOMMON_2",

    bg_scholar: "POOL_BG_RARE_3",

    bg_artist: "POOL_BG_RARE_3",
    bg_wiseman: "POOL_BG_RARE_3",

    bg_entertainer: "POOL_BG_RARE_3",
    bg_maid: "POOL_BG_RARE_3",
    bg_whore: "POOL_BG_RARE_3",

    bg_adventurer: "POOL_BG_EPIC_4",
    bg_courtesan: "POOL_BG_EPIC_4",
    bg_engineer: "POOL_BG_EPIC_4",
    bg_healer: "POOL_BG_EPIC_4",
    bg_mystic: "POOL_BG_EPIC_4",

    bg_mercenary: "POOL_BG_EPIC_4",
    bg_slaver: "POOL_BG_EPIC_4",

    bg_pirate: "POOL_BG_EPIC_4",
    bg_raider: "POOL_BG_EPIC_4",
    bg_thug: "POOL_BG_EPIC_4",

    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_noble: "POOL_BG_LEGENDARY_5",

    bg_informer: "POOL_BG_LEGENDARY_5",
    bg_monk: "POOL_BG_LEGENDARY_5",

    bg_assassin: "POOL_BG_MYTHIC_6",
    bg_metalworker: "POOL_BG_MYTHIC_6",
    bg_wildman: "POOL_BG_MYTHIC_6",

    bg_nomad: "POOL_BG_MYTHIC_6",

    bg_mythical: "POOL_BG_ULTRA_7",
    bg_royal: "POOL_BG_ULTRA_7",

    bg_mist: "POOL_BG_FINAL_8",
    bg_seaman: "POOL_BG_FINAL_8",
    bg_boss: 0.00001,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_logical: "POOL_PER_UNCOMMON_2",
    per_studious: "POOL_PER_UNCOMMON_2",

    per_smart: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_alchemy: 0.1,
    magic_earth: 0.1,
    magic_earth_master: 0.01,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_thin: 0.1,
    muscle_verythin: 0.03,
    muscle_extremelythin: 0.002,

    face_attractive: 0.1,
    face_beautiful: 0.03,

    tough_nimble: 0.1,

    /* =========== */
    /* SKIN */
    /* =========== */

    ears_elf: 1.0,
    wings_elf: 0.001,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_wind: 5,
    magic_wind_master: 5,
  },
};
