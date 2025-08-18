export const DEFINITION_SUBRACE_FAIRY: SubraceDefinition = {
  key: "subrace_fairy",
  name: "Fairy",
  noun: "fairy",
  homeland_region: setup.Text.Race.REGIONS.forest,
  company_key: "elf",
  description:
    'Colloquially known as "<<rep setup.trait.race_elf>> with wings", these mystical species is said to dwell somewhere in the <<lore region_forest>>. Unlike their elven brethrens, fairies are attuned to <<lore magic_wind>>.',
  slave_value: 15000,
  rarity: "unicorn",
  race: "race_elf",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_fairy: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_apprentice: "POOL_BG_COMMON_1",
    bg_hunter: "POOL_BG_COMMON_1",

    bg_farmer: "POOL_BG_COMMON_1",
    bg_woodsman: "POOL_BG_COMMON_1",

    bg_wildman: "POOL_BG_UNCOMMON_2",

    bg_mystic: "POOL_BG_RARE_3",

    bg_mythical: "POOL_BG_EPIC_4",

    bg_clerk: "POOL_BG_FINAL_8",
    bg_foodworker: "POOL_BG_FINAL_8",
    bg_laborer: "POOL_BG_FINAL_8",
    bg_merchant: "POOL_BG_FINAL_8",
    bg_unemployed: "POOL_BG_FINAL_8",
    bg_artisan: "POOL_BG_FINAL_8",
    bg_priest: "POOL_BG_FINAL_8",
    bg_soldier: "POOL_BG_FINAL_8",
    bg_thief: "POOL_BG_FINAL_8",
    bg_slave: "POOL_BG_FINAL_8",
    bg_scholar: "POOL_BG_FINAL_8",
    bg_artist: "POOL_BG_FINAL_8",
    bg_wiseman: "POOL_BG_FINAL_8",
    bg_entertainer: "POOL_BG_FINAL_8",
    bg_maid: "POOL_BG_FINAL_8",
    bg_whore: "POOL_BG_FINAL_8",
    bg_adventurer: "POOL_BG_FINAL_8",
    bg_courtesan: "POOL_BG_FINAL_8",
    bg_engineer: "POOL_BG_FINAL_8",
    bg_healer: "POOL_BG_FINAL_8",
    bg_mercenary: "POOL_BG_FINAL_8",
    bg_slaver: "POOL_BG_FINAL_8",
    bg_pirate: "POOL_BG_FINAL_8",
    bg_raider: "POOL_BG_FINAL_8",
    bg_thug: "POOL_BG_FINAL_8",
    bg_knight: "POOL_BG_FINAL_8",
    bg_noble: "POOL_BG_FINAL_8",
    bg_informer: "POOL_BG_FINAL_8",
    bg_monk: "POOL_BG_FINAL_8",
    bg_assassin: "POOL_BG_FINAL_8",
    bg_metalworker: "POOL_BG_FINAL_8",
    bg_nomad: "POOL_BG_FINAL_8",
    bg_royal: "POOL_BG_FINAL_8",
    bg_mist: "POOL_BG_FINAL_8",
    bg_seaman: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_playful: "POOL_PER_UNCOMMON_2",
    per_dreamy: "POOL_PER_UNCOMMON_2",

    per_lunatic: "POOL_PER_EPIC_4",

    /* =========== */
    /* MAGIC */
    /* =========== */

    magic_wind: 0.1,
    magic_wind_master: 0.01,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_thin: 0.1,
    muscle_verythin: 0.03,
    muscle_extremelythin: 0.002,

    face_attractive: 0.1,
    face_beautiful: 0.03,

    height_short: 0.1,

    /* =========== */
    /* SKIN */
    /* =========== */

    ears_elf: 1.0,
    wings_elf: 1.0,
  },
  trait_dispreferences: {
    /* trait dispreferences */
  },
};
