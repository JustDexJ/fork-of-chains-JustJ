export const DEFINITION_SUBRACE_HUMANSEA: SubraceDefinition = {
  key: "subrace_humansea",
  name: "Human (Sea)",
  noun: "foreigner",
  homeland_region: setup.Text.Race.REGIONS.sea,
  company_key: "humansea",
  description:
    "<<rep setup.trait.race_human>> born far on the southern islands across the sea. They have cultures much unlike those found in the main region. Often attuned to the domain of <<lore magic_light>>.",
  slave_value: 2500,
  rarity: "rare",
  race: "race_human",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_humansea: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_artisan: "POOL_BG_COMMON_1",

    bg_farmer: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_laborer: "POOL_BG_COMMON_1",
    bg_merchant: "POOL_BG_COMMON_1",
    bg_pirate: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_seaman: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_whore: "POOL_BG_COMMON_1",

    bg_assassin: "POOL_BG_UNCOMMON_2",

    bg_apprentice: "POOL_BG_UNCOMMON_2",
    bg_informer: "POOL_BG_UNCOMMON_2",
    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_maid: "POOL_BG_UNCOMMON_2",

    bg_slave: "POOL_BG_UNCOMMON_2",
    bg_unemployed: "POOL_BG_UNCOMMON_2",

    bg_courtesan: "POOL_BG_RARE_3",
    bg_healer: "POOL_BG_RARE_3",

    bg_artist: "POOL_BG_RARE_3",
    bg_mercenary: "POOL_BG_RARE_3",
    bg_monk: "POOL_BG_RARE_3",

    bg_clerk: "POOL_BG_RARE_3",
    bg_entertainer: "POOL_BG_RARE_3",

    bg_adventurer: "POOL_BG_EPIC_4",
    bg_engineer: "POOL_BG_EPIC_4",
    bg_mystic: "POOL_BG_EPIC_4",
    bg_noble: "POOL_BG_EPIC_4",
    bg_scholar: "POOL_BG_EPIC_4",

    bg_hunter: "POOL_BG_EPIC_4",
    bg_priest: "POOL_BG_EPIC_4",
    bg_wiseman: "POOL_BG_EPIC_4",

    bg_raider: "POOL_BG_EPIC_4",
    bg_thug: "POOL_BG_EPIC_4",

    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_metalworker: "POOL_BG_LEGENDARY_5",

    bg_mist: "POOL_BG_MYTHIC_6",

    bg_wildman: "POOL_BG_MYTHIC_6",

    bg_nomad: "POOL_BG_MYTHIC_6",
    bg_woodsman: "POOL_BG_MYTHIC_6",

    bg_royal: "POOL_BG_ULTRA_7",

    bg_boss: "POOL_BG_FINAL_8",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_honorable: "POOL_PER_EPIC_4",
    per_evil: "POOL_PER_EPIC_4",
    per_lunatic: "POOL_PER_EPIC_4",
    per_sexaddict: "POOL_PER_EPIC_4",
    per_masochistic: "POOL_PER_LEGENDARY_5",
    per_dominant: "POOL_PER_EPIC_4",
    per_submissive: "POOL_PER_EPIC_4",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_hypnotic: 0.1,
    magic_light: 0.05,
    magic_light_master: 0.005,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_verystrong: 0.01,
    muscle_verythin: 0.01,
    muscle_extremelystrong: 0.001,
    muscle_extremelythin: 0.001,
    face_beautiful: 0.01,
    face_hideous: 0.01,
    height_dwarf: 0.01,
    height_giant: 0.01,
    dick_huge: 0.01,
    dick_tiny: 0.01,
    dick_titanic: 0.001,
    balls_huge: 0.01,
    balls_tiny: 0.01,
    balls_titanic: 0.001,
    breast_tiny: 0.01,
    breast_huge: 0.01,
    breast_titanic: 0.001,

    /* =========== */
    /* SKIN */
    /* =========== */
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_dark: 5,
    magic_dark_master: 5,
  },
};
