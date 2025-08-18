export const DEFINITION_SUBRACE_DRAGONKIN: SubraceDefinition = {
  key: "subrace_dragonkin",
  name: "Dragonkin",
  noun: "dragonkin",
  homeland_region: setup.Text.Race.REGIONS.sea,
  company_key: "dragonkin",
  description:
    "A mythical subrace of <<rep setup.trait.race_lizardkin>> said to dwell somewhere beyond the <<lore region_sea>>. Even compared to the lizardkin, these winged relatives of them are extremely rare. Attuned to both <<lore magic_fire>> and <<lore magic_light>>, which they are often able to breathe out from their snouts.",
  slave_value: 15000,
  rarity: "unicorn",
  race: "race_lizardkin",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_dragonkin: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_adventurer: "POOL_BG_COMMON_1",
    bg_mystic: "POOL_BG_COMMON_1",

    bg_soldier: "POOL_BG_COMMON_1",

    bg_metalworker: "POOL_BG_UNCOMMON_2",

    bg_hunter: "POOL_BG_UNCOMMON_2",
    bg_priest: "POOL_BG_UNCOMMON_2",

    bg_knight: "POOL_BG_RARE_3",

    bg_apprentice: "POOL_BG_RARE_3",

    bg_noble: "POOL_BG_EPIC_4",

    bg_mercenary: "POOL_BG_EPIC_4",
    bg_monk: "POOL_BG_EPIC_4",

    bg_entertainer: "POOL_BG_EPIC_4",
    bg_thief: "POOL_BG_EPIC_4",

    bg_assassin: "POOL_BG_LEGENDARY_5",
    bg_engineer: "POOL_BG_LEGENDARY_5",
    bg_healer: "POOL_BG_LEGENDARY_5",
    bg_scholar: "POOL_BG_LEGENDARY_5",

    bg_artisan: "POOL_BG_LEGENDARY_5",
    bg_informer: "POOL_BG_LEGENDARY_5",
    bg_slaver: "POOL_BG_LEGENDARY_5",
    bg_wiseman: "POOL_BG_LEGENDARY_5",

    bg_farmer: "POOL_BG_LEGENDARY_5",
    bg_foodworker: "POOL_BG_LEGENDARY_5",
    bg_laborer: "POOL_BG_LEGENDARY_5",
    bg_merchant: "POOL_BG_LEGENDARY_5",
    bg_nomad: "POOL_BG_LEGENDARY_5",
    bg_seaman: "POOL_BG_LEGENDARY_5",
    bg_woodsman: "POOL_BG_LEGENDARY_5",

    bg_mythical: "POOL_BG_MYTHIC_6",
    bg_royal: "POOL_BG_MYTHIC_6",

    bg_artist: "POOL_BG_MYTHIC_6",

    bg_clerk: "POOL_BG_MYTHIC_6",
    bg_thug: "POOL_BG_MYTHIC_6",

    bg_pirate: "POOL_BG_ULTRA_7",
    bg_raider: "POOL_BG_ULTRA_7",

    bg_boss: "POOL_BG_FINAL_8",
    bg_mist: "POOL_BG_FINAL_8",

    bg_courtesan: "POOL_BG_FINAL_8",
    bg_wildman: "POOL_BG_FINAL_8",

    bg_maid: "POOL_BG_FINAL_8",
    bg_whore: "POOL_BG_FINAL_8",

    bg_slave: "POOL_BG_FINAL_8",
    bg_unemployed: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_brave: "POOL_PER_UNCOMMON_2",
    per_honorable: "POOL_PER_UNCOMMON_2",
    per_proud: "POOL_PER_UNCOMMON_2",

    per_chaste: "POOL_PER_RARE_3",
    per_serious: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_alchemy: 0.015,
    skill_animal: 0.015,
    skill_ambidextrous: 0.015,
    skill_connected: 0.015,
    skill_creative: 0.015,
    skill_intimidating: 0.015,
    skill_hypnotic: 0.015,
    skill_entertain: 0.015,

    magic_light: 0.055,
    magic_light_master: 0.0055,
    magic_fire: 0.055,
    magic_fire_master: 0.0055,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    muscle_strong: 0.2,
    muscle_verystrong: 0.1,
    muscle_extremelystrong: 0.01,

    height_tall: 0.5,
    height_giant: 0.1,

    tough_tough: 0.1,

    dick_large: 0.5,
    dick_huge: 0.3,
    dick_titanic: 0.05,

    balls_large: 0.5,
    balls_huge: 0.3,
    balls_titanic: 0.05,

    breast_large: 0.5,
    breast_huge: 0.3,
    breast_titanic: 0.05,

    /* =========== */
    /* SKIN */
    /* =========== */

    eyes_dragonkin: 1.0,
    ears_dragonkin: 1.0,
    mouth_dragonkin: 1.0,
    body_dragonkin: 1.0,
    wings_dragonkin: 1.0,
    arms_dragonkin: 1.0,
    legs_dragonkin: 1.0,
    tail_dragonkin: 1.0,
    dick_dragonkin: 0.9,
  },
  trait_dispreferences: {
    /* trait dispreferences */ per_lustful: 5,
    per_sexaddict: 5,

    magic_dark: 5,
    magic_dark_master: 5,
  },
};
