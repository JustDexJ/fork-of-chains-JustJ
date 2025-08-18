export const DEFINITION_SUBRACE_WEREWOLF: SubraceDefinition = {
  key: "subrace_werewolf",
  name: "Werewolf",
  noun: "werewolf",
  homeland_region: setup.Text.Race.REGIONS.vale,
  company_key: "werewolf",
  description:
    "A race of <<rep setup.trait.race_wolfkin>> living on the northern mountains. Attuned to water and ice, which allows them to withstood the cold.",
  slave_value: 2500,
  rarity: "rare",
  race: "race_wolfkin",
  trait_preferences: {
    /* =========== */
    /* RACE */
    /* =========== */
    subrace_werewolf: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_hunter: "POOL_BG_COMMON_1",

    bg_laborer: "POOL_BG_COMMON_1",
    bg_woodsman: "POOL_BG_COMMON_1",
    bg_raider: "POOL_BG_COMMON_1",
    bg_thug: "POOL_BG_COMMON_1",

    bg_wildman: "POOL_BG_UNCOMMON_2",

    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_foodworker: "POOL_BG_UNCOMMON_2",
    bg_nomad: "POOL_BG_UNCOMMON_2",
    bg_pirate: "POOL_BG_UNCOMMON_2",
    bg_thief: "POOL_BG_UNCOMMON_2",

    bg_mercenary: "POOL_BG_RARE_3",

    bg_soldier: "POOL_BG_RARE_3",

    bg_unemployed: "POOL_BG_RARE_3",

    bg_adventurer: "POOL_BG_EPIC_4",
    bg_metalworker: "POOL_BG_EPIC_4",

    bg_monk: "POOL_BG_EPIC_4",
    bg_priest: "POOL_BG_EPIC_4",

    bg_farmer: "POOL_BG_EPIC_4",

    bg_assassin: "POOL_BG_LEGENDARY_5",
    bg_knight: "POOL_BG_LEGENDARY_5",

    bg_artisan: "POOL_BG_LEGENDARY_5",

    bg_slave: "POOL_BG_LEGENDARY_5",

    bg_engineer: "POOL_BG_MYTHIC_6",
    bg_healer: "POOL_BG_MYTHIC_6",
    bg_mystic: "POOL_BG_MYTHIC_6",
    bg_scholar: "POOL_BG_MYTHIC_6",

    bg_apprentice: "POOL_BG_MYTHIC_6",
    bg_artist: "POOL_BG_MYTHIC_6",
    bg_informer: "POOL_BG_MYTHIC_6",
    bg_wiseman: "POOL_BG_MYTHIC_6",

    bg_clerk: "POOL_BG_MYTHIC_6",
    bg_entertainer: "POOL_BG_MYTHIC_6",
    bg_maid: "POOL_BG_MYTHIC_6",
    bg_merchant: "POOL_BG_MYTHIC_6",
    bg_seaman: "POOL_BG_MYTHIC_6",

    bg_noble: "POOL_BG_ULTRA_7",

    bg_boss: "POOL_BG_FINAL_8",
    bg_mist: "POOL_BG_FINAL_8",
    bg_royal: "POOL_BG_FINAL_8",

    bg_courtesan: "POOL_BG_FINAL_8",

    bg_whore: "POOL_BG_FINAL_8",

    bg_mythical: 0,

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_loner: "POOL_PER_UNCOMMON_2",

    per_calm: "POOL_PER_RARE_3",
    per_dominant: "POOL_PER_RARE_3",
    per_independent: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_animal: 0.1,
    magic_water: 0.1,
    magic_water_master: 0.01,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_strong: 0.2,
    muscle_verystrong: 0.05,
    muscle_extremelystrong: 0.001,
    dick_large: 0.2,
    dick_huge: 0.05,
    dick_titanic: 0.001,
    balls_large: 0.2,
    balls_huge: 0.05,
    balls_titanic: 0.001,
    breast_tiny: 0.1,
    breast_small: 0.1,
    breast_medium: 0.1,

    /* =========== */
    /* SKIN */
    /* =========== */

    ears_werewolf: 1.0,
    mouth_werewolf: 1.0,
    body_werewolf: 1.0,
    arms_werewolf: 1.0,
    legs_werewolf: 1.0,
    tail_werewolf: 1.0,
    dick_werewolf: 0.9,
  },
  trait_dispreferences: {
    magic_fire: 5.0,
    magic_fire_master: 5.0,
  },
};
