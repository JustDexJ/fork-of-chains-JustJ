export const DEFINITION_SUBRACE_DEMONKIN: SubraceDefinition = {
  key: "subrace_demonkin",
  name: "Demonkin",
  noun: "demonkin",
  homeland_region: setup.Text.Race.REGIONS.mist,
  company_key: "demon",
  description:
    "The most common <<rep setup.trait.race_demon>>, it is said that demonkin are the result of the numerous virgins violated by purebred demons. There are some who managed to cross the fog into our world, but those are extremely rare. Attuned to darkness, which is perhaps the strongest element. Most demonkin are found serving their pureblooded demon masters, although there are exceptions of free and master-less demonkin. Like all other demons, demonkin are unaffected by the negative skill and value penalties of demonic bodyparts.",
  slave_value: 7500,
  rarity: "rare",
  race: "race_demon",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_demonkin: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_adventurer: "POOL_BG_COMMON_1",

    bg_informer: "POOL_BG_COMMON_1",
    bg_mercenary: "POOL_BG_COMMON_1",

    bg_soldier: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_entertainer: "POOL_BG_COMMON_1",
    bg_raider: "POOL_BG_COMMON_1",

    bg_monk: "POOL_BG_UNCOMMON_2",
    bg_slaver: "POOL_BG_UNCOMMON_2",

    bg_thug: "POOL_BG_UNCOMMON_2",
    bg_pirate: "POOL_BG_UNCOMMON_2",

    bg_courtesan: "POOL_BG_RARE_3",
    bg_mystic: "POOL_BG_RARE_3",
    bg_assassin: "POOL_BG_RARE_3",

    bg_hunter: "POOL_BG_RARE_3",

    bg_seaman: "POOL_BG_RARE_3",
    bg_clerk: "POOL_BG_RARE_3",
    bg_farmer: "POOL_BG_RARE_3",
    bg_foodworker: "POOL_BG_RARE_3",
    bg_laborer: "POOL_BG_RARE_3",
    bg_maid: "POOL_BG_RARE_3",
    bg_merchant: "POOL_BG_RARE_3",
    bg_nomad: "POOL_BG_RARE_3",
    bg_woodsman: "POOL_BG_RARE_3",
    bg_whore: "POOL_BG_RARE_3",

    bg_slave: "POOL_BG_RARE_3",
    bg_unemployed: "POOL_BG_RARE_3",

    bg_mist: "POOL_BG_EPIC_4",

    bg_knight: "POOL_BG_EPIC_4",
    bg_metalworker: "POOL_BG_EPIC_4",
    bg_engineer: "POOL_BG_EPIC_4",
    bg_scholar: "POOL_BG_EPIC_4",

    bg_apprentice: "POOL_BG_EPIC_4",
    bg_artisan: "POOL_BG_EPIC_4",
    bg_artist: "POOL_BG_EPIC_4",
    bg_wiseman: "POOL_BG_EPIC_4",

    bg_healer: "POOL_BG_LEGENDARY_5",
    bg_noble: "POOL_BG_LEGENDARY_5",

    bg_priest: "POOL_BG_LEGENDARY_5",

    bg_boss: "POOL_BG_MYTHIC_6",
    bg_mythical: "POOL_BG_MYTHIC_6",
    bg_royal: "POOL_BG_MYTHIC_6",

    bg_wildman: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_cautious: "POOL_PER_UNCOMMON_2",
    per_sly: "POOL_PER_UNCOMMON_2",
    per_frugal: "POOL_PER_UNCOMMON_2",

    per_cruel: "POOL_PER_RARE_3",
    per_evil: "POOL_PER_RARE_3",
    per_lunatic: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_hypnotic: 0.15,
    magic_dark: 0.15,
    magic_dark_master: 0.015,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    /* =========== */
    /* SKIN */
    /* =========== */

    ears_demon: 1.0,
    body_demon: 1.0,
    tail_demon: 1.0,
    dick_demon: 0.3,
  },
  trait_dispreferences: {
    /* trait dispreferences */ magic_light: 20,
    magic_light_master: 20,
    per_honorable: 5,
  },
};
