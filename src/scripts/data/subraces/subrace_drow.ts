export const DEFINITION_SUBRACE_DROW: SubraceDefinition = {
  key: "subrace_drow",
  name: "Drow",
  noun: "drow",
  homeland_region: setup.Text.Race.REGIONS.deep,
  company_key: "drow",
  description:
    "This subspecies of the <<rep setup.trait.race_elf>> race has adapted to live underground. Attuned to the dark element, allowing them to manipulate darkness and corrupt others.",
  slave_value: 2500,
  rarity: "rare",
  race: "race_elf",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_drow: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_slaver: "POOL_BG_COMMON_1",
    bg_mercenary: "POOL_BG_COMMON_1",
    bg_hunter: "POOL_BG_COMMON_1",
    bg_informer: "POOL_BG_COMMON_1",
    bg_artisan: "POOL_BG_COMMON_1",
    bg_priest: "POOL_BG_COMMON_1",

    bg_soldier: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",

    bg_mystic: "POOL_BG_UNCOMMON_2",
    bg_adventurer: "POOL_BG_UNCOMMON_2",
    bg_assassin: "POOL_BG_UNCOMMON_2",

    bg_apprentice: "POOL_BG_UNCOMMON_2",
    bg_artist: "POOL_BG_UNCOMMON_2",
    bg_wiseman: "POOL_BG_UNCOMMON_2",

    bg_entertainer: "POOL_BG_UNCOMMON_2",
    bg_merchant: "POOL_BG_UNCOMMON_2",
    bg_raider: "POOL_BG_UNCOMMON_2",
    bg_thug: "POOL_BG_UNCOMMON_2",

    bg_scholar: "POOL_BG_RARE_3",
    bg_knight: "POOL_BG_RARE_3",

    bg_clerk: "POOL_BG_RARE_3",
    bg_farmer: "POOL_BG_RARE_3",
    bg_foodworker: "POOL_BG_RARE_3",

    bg_courtesan: "POOL_BG_EPIC_4",
    bg_engineer: "POOL_BG_EPIC_4",
    bg_noble: "POOL_BG_EPIC_4",
    bg_metalworker: "POOL_BG_EPIC_4",

    bg_maid: "POOL_BG_EPIC_4",
    bg_whore: "POOL_BG_EPIC_4",

    bg_laborer: "POOL_BG_EPIC_4",

    bg_mist: "POOL_BG_LEGENDARY_5",

    bg_healer: "POOL_BG_LEGENDARY_5",

    bg_woodsman: "POOL_BG_LEGENDARY_5",
    bg_seaman: "POOL_BG_LEGENDARY_5",
    bg_pirate: "POOL_BG_LEGENDARY_5",

    bg_unemployed: "POOL_BG_LEGENDARY_5",
    bg_slave: "POOL_BG_LEGENDARY_5",

    bg_monk: "POOL_BG_LEGENDARY_5",

    bg_boss: "POOL_BG_MYTHIC_6",

    bg_wildman: "POOL_BG_MYTHIC_6",
    bg_nomad: "POOL_BG_MYTHIC_6",

    bg_mythical: "POOL_BG_ULTRA_7",
    bg_royal: "POOL_BG_ULTRA_7",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_cruel: "POOL_PER_UNCOMMON_2",
    per_independent: "POOL_PER_UNCOMMON_2",
    per_sly: "POOL_PER_UNCOMMON_2",

    per_evil: "POOL_PER_RARE_3",
    per_logical: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_alchemy: 0.1,
    magic_dark: 0.15,
    magic_dark_master: 0.015,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_thin: 0.1,
    muscle_verythin: 0.03,
    muscle_extremelythin: 0.002,

    face_scary: 0.05,
    face_hideous: 0.015,

    tough_nimble: 0.1,

    /* =========== */
    /* SKIN */
    /* =========== */

    ears_elf: 1.0,
    body_drow: 1.0,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_light: 5,
    magic_light_master: 5,
  },
};
