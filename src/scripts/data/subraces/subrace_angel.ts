export const DEFINITION_SUBRACE_ANGEL: SubraceDefinition = {
  key: "subrace_angel",
  name: "Angel",
  noun: "angel",
  homeland_region: setup.Text.Race.REGIONS.heaven,
  company_key: "humankingdom",
  description:
    "Residents of the celestial realm who one way or another has been reborn as a <<rep setup.trait.race_human>>. Even as a mortal, they  still retai their high affinity for <<lore magic_light>>.",
  slave_value: 30000,
  rarity: "unicorn",
  race: "race_human",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_angel: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_soldier: "POOL_BG_COMMON_1",
    bg_entertainer: "POOL_BG_COMMON_1",
    bg_hunter: "POOL_BG_COMMON_1",
    bg_artist: "POOL_BG_COMMON_1",
    bg_priest: "POOL_BG_COMMON_1",
    bg_healer: "POOL_BG_COMMON_1",

    bg_wiseman: "POOL_BG_UNCOMMON_2",
    bg_mystic: "POOL_BG_UNCOMMON_2",
    bg_knight: "POOL_BG_UNCOMMON_2",

    bg_scholar: "POOL_BG_EPIC_4",

    bg_noble: "POOL_BG_LEGENDARY_5",

    bg_royal: "POOL_BG_MYTHIC_6",
    bg_mythical: "POOL_BG_MYTHIC_6",

    bg_mercenary: "POOL_BG_FINAL_8",
    bg_monk: "POOL_BG_FINAL_8",
    bg_woodsman: "POOL_BG_FINAL_8",
    bg_adventurer: "POOL_BG_FINAL_8",
    bg_assassin: "POOL_BG_FINAL_8",
    bg_metalworker: "POOL_BG_FINAL_8",
    bg_wildman: "POOL_BG_FINAL_8",
    bg_apprentice: "POOL_BG_FINAL_8",
    bg_artisan: "POOL_BG_FINAL_8",
    bg_nomad: "POOL_BG_FINAL_8",
    bg_merchant: "POOL_BG_FINAL_8",
    bg_thug: "POOL_BG_FINAL_8",
    bg_farmer: "POOL_BG_FINAL_8",
    bg_foodworker: "POOL_BG_FINAL_8",
    bg_laborer: "POOL_BG_FINAL_8",
    bg_maid: "POOL_BG_FINAL_8",
    bg_whore: "POOL_BG_FINAL_8",
    bg_unemployed: "POOL_BG_FINAL_8",
    bg_slave: "POOL_BG_FINAL_8",
    bg_courtesan: "POOL_BG_FINAL_8",
    bg_informer: "POOL_BG_FINAL_8",
    bg_slaver: "POOL_BG_FINAL_8",
    bg_clerk: "POOL_BG_FINAL_8",
    bg_seaman: "POOL_BG_FINAL_8",
    bg_thief: "POOL_BG_FINAL_8",
    bg_engineer: "POOL_BG_FINAL_8",
    bg_pirate: "POOL_BG_FINAL_8",
    bg_raider: "POOL_BG_FINAL_8",
    bg_mist: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_honorable: "POOL_PER_COMMON_1",

    per_kind: "POOL_PER_UNCOMMON_2",
    per_chaste: "POOL_PER_UNCOMMON_2",

    per_brave: "POOL_PER_RARE_3",
    per_loyal: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    magic_light: 0.2,
    magic_light_master: 0.02,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    face_attractive: 0.2,
    face_beautiful: 0.2,

    /* =========== */
    /* SKIN */
    /* =========== */

    wings_angel: 1.0,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_dark: 20,
    magic_dark_master: 20,

    per_lustful: 10,
    per_sexaddict: 10,
    per_evil: 10,
    per_cruel: 10,
  },
};
