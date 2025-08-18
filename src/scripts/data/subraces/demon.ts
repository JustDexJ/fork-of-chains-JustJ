export const DEFINITION_SUBRACE_DEMON: SubraceDefinition = {
  key: "subrace_demon",
  name: "Demon",
  noun: "demon",
  homeland_region: setup.Text.Race.REGIONS.mist,
  company_key: "demon",
  description:
    "Strange <<rep setup.trait.race_demon>> creatures that live on the other side of the great mist, these pure-blooded demons often wield great powers. There are some who managed to cross the fog into our world, but those are extremely rare. Attuned to darkness, which is perhaps the strongest element. They are unaffected by the negative skill and value penalties of demonic bodyparts.",
  slave_value: 20000,
  rarity: "rare",
  race: "race_demon",
  trait_preferences: {
    /* trait preferences */
    /* =========== */
    /* RACE */
    /* =========== */
    subrace_demon: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */
    bg_mystic: "POOL_BG_COMMON_1",

    bg_slaver: "POOL_BG_COMMON_1",

    bg_raider: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_thug: "POOL_BG_COMMON_1",

    bg_mist: "POOL_BG_UNCOMMON_2",

    bg_assassin: "POOL_BG_UNCOMMON_2",

    bg_mercenary: "POOL_BG_UNCOMMON_2",

    bg_adventurer: "POOL_BG_RARE_3",

    bg_entertainer: "POOL_BG_RARE_3",

    bg_knight: "POOL_BG_EPIC_4",
    bg_metalworker: "POOL_BG_EPIC_4",
    bg_noble: "POOL_BG_EPIC_4",

    bg_apprentice: "POOL_BG_EPIC_4",
    bg_informer: "POOL_BG_EPIC_4",
    bg_hunter: "POOL_BG_EPIC_4",
    bg_monk: "POOL_BG_EPIC_4",

    bg_pirate: "POOL_BG_EPIC_4",

    bg_boss: "POOL_BG_MYTHIC_6",
    bg_mythical: "POOL_BG_MYTHIC_6",
    bg_royal: "POOL_BG_MYTHIC_6",

    bg_courtesan: "POOL_BG_MYTHIC_6",
    bg_engineer: "POOL_BG_MYTHIC_6",
    bg_healer: "POOL_BG_MYTHIC_6",

    bg_artisan: "POOL_BG_MYTHIC_6",
    bg_priest: "POOL_BG_MYTHIC_6",

    bg_seaman: "POOL_BG_MYTHIC_6",
    bg_thief: "POOL_BG_MYTHIC_6",

    bg_scholar: "POOL_BG_ULTRA_7",

    bg_artist: "POOL_BG_ULTRA_7",
    bg_wiseman: "POOL_BG_ULTRA_7",

    bg_clerk: "POOL_BG_ULTRA_7",
    bg_farmer: "POOL_BG_ULTRA_7",
    bg_foodworker: "POOL_BG_ULTRA_7",
    bg_laborer: "POOL_BG_ULTRA_7",
    bg_maid: "POOL_BG_ULTRA_7",
    bg_merchant: "POOL_BG_ULTRA_7",
    bg_nomad: "POOL_BG_ULTRA_7",
    bg_woodsman: "POOL_BG_ULTRA_7",
    bg_whore: "POOL_BG_ULTRA_7",

    bg_slave: "POOL_BG_ULTRA_7",
    bg_unemployed: "POOL_BG_ULTRA_7",

    bg_wildman: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */
    per_lustful: "POOL_PER_UNCOMMON_2",
    per_sexaddict: "POOL_PER_UNCOMMON_2",
    per_cruel: "POOL_PER_UNCOMMON_2",
    per_evil: "POOL_PER_UNCOMMON_2",
    per_independent: "POOL_PER_UNCOMMON_2",

    per_lunatic: "POOL_PER_RARE_3",
    per_dominant: "POOL_PER_RARE_3",
    per_submissive: "POOL_PER_RARE_3",

    per_masochistic: "POOL_PER_EPIC_4",

    /* =========== */
    /* MAGIC */
    /* =========== */
    magic_water: 0.015,
    magic_water_master: 0.0015,
    magic_fire: 0.015,
    magic_fire_master: 0.0015,
    magic_wind: 0.015,
    magic_wind_master: 0.0015,
    magic_earth: 0.015,
    magic_earth_master: 0.0015,
    magic_dark: 0.2,
    magic_dark_master: 0.02,

    /* =========== */
    /* PHYSICAL */
    /* =========== */
    muscle_strong: 0.2,
    muscle_verystrong: 0.1,
    muscle_extremelystrong: 0.01,

    height_tall: 0.3,
    height_giant: 0.05,

    dick_large: 0.1,
    dick_huge: 0.5,
    dick_titanic: 0.1,

    balls_large: 0.1,
    balls_huge: 0.5,
    balls_titanic: 0.1,

    breast_large: 0.1,
    breast_huge: 0.5,
    breast_titanic: 0.1,

    /* =========== */
    /* SKIN */
    /* =========== */
    eyes_demon: 0.97,
    ears_demon: 0.97,
    mouth_demon: 0.97,
    body_demon: 0.97,
    wings_demon: 0.97,
    arms_demon: 0.97,
    legs_demon: 0.97,
    tail_demon: 0.97,
    dick_demon: 0.97,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_light: 20,
    magic_light_master: 20,
    per_honorable: 20,
  },
};
