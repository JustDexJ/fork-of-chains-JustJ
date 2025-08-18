export const DEFINITION_SUBRACE_KOBOLD: SubraceDefinition = {
  key: "subrace_kobold",
  name: "Kobold",
  noun: "kobold",
  homeland_region: setup.Text.Race.REGIONS.deep,
  company_key: "kobold",
  description:
    "Distinct from their other <<rep setup.trait.race_lizardkin>> relatives, kobolds are often meek and small in stature. Compared to the other lizardkin species, kobolds are fairly common: Kobolds are present throughout <<lore geo_mestia>>, but most kobolds live in the <<lore region_deep>>. Kobolds may be lacking in the size and strength department, but they make up for it in cunning and cleverness. Attuned to both <<lore magic_fire>> and <<lore magic_earth>>.",
  slave_value: 0,
  rarity: "common",
  race: "race_lizardkin",
  trait_preferences: {
    /* trait preferences */

    /* =========== */
    /* RACE */
    /* =========== */
    subrace_kobold: 1,

    /* =========== */
    /* BACKGROUNDS */
    /* =========== */

    bg_laborer: "POOL_BG_COMMON_1",
    bg_thief: "POOL_BG_COMMON_1",
    bg_soldier: "POOL_BG_COMMON_1",
    bg_foodworker: "POOL_BG_COMMON_1",
    bg_merchant: "POOL_BG_COMMON_1",
    bg_entertainer: "POOL_BG_COMMON_1",

    bg_slave: "POOL_BG_COMMON_1",

    bg_artisan: "POOL_BG_UNCOMMON_2",
    bg_mercenary: "POOL_BG_UNCOMMON_2",

    bg_thug: "POOL_BG_UNCOMMON_2",
    bg_raider: "POOL_BG_UNCOMMON_2",

    bg_unemployed: "POOL_BG_UNCOMMON_2",

    bg_adventurer: "POOL_BG_RARE_3",
    bg_mystic: "POOL_BG_RARE_3",

    bg_priest: "POOL_BG_RARE_3",
    bg_hunter: "POOL_BG_RARE_3",
    bg_assassin: "POOL_BG_RARE_3",
    bg_informer: "POOL_BG_RARE_3",
    bg_engineer: "POOL_BG_RARE_3",

    bg_apprentice: "POOL_BG_RARE_3",
    bg_artist: "POOL_BG_RARE_3",

    bg_scholar: "POOL_BG_EPIC_4",

    bg_monk: "POOL_BG_EPIC_4",
    bg_slaver: "POOL_BG_EPIC_4",
    bg_wiseman: "POOL_BG_EPIC_4",

    bg_nomad: "POOL_BG_EPIC_4",
    bg_seaman: "POOL_BG_EPIC_4",
    bg_pirate: "POOL_BG_EPIC_4",
    bg_woodsman: "POOL_BG_EPIC_4",
    bg_farmer: "POOL_BG_EPIC_4",
    bg_clerk: "POOL_BG_EPIC_4",
    bg_maid: "POOL_BG_EPIC_4",
    bg_whore: "POOL_BG_EPIC_4",

    bg_mist: "POOL_BG_LEGENDARY_5",

    bg_courtesan: "POOL_BG_LEGENDARY_5",
    bg_wildman: "POOL_BG_LEGENDARY_5",
    bg_knight: "POOL_BG_LEGENDARY_5",
    bg_metalworker: "POOL_BG_LEGENDARY_5",
    bg_healer: "POOL_BG_LEGENDARY_5",

    bg_noble: "POOL_BG_MYTHIC_6",

    bg_royal: "POOL_BG_ULTRA_7",

    bg_mythical: "POOL_BG_FINAL_8",
    bg_boss: "POOL_BG_FINAL_8",

    /* =========== */
    /* PERSONALITY */
    /* =========== */

    per_cautious: "POOL_PER_UNCOMMON_2",
    per_humble: "POOL_PER_UNCOMMON_2",

    per_smart: "POOL_PER_RARE_3",
    per_submissive: "POOL_PER_RARE_3",

    /* =========== */
    /* MAGIC */
    /* =========== */

    skill_creative: 0.1,
    magic_earth: 0.03,
    magic_earth_master: 0.003,
    magic_fire: 0.03,
    magic_fire_master: 0.003,

    /* =========== */
    /* PHYSICAL */
    /* =========== */

    height_dwarf: 1000.0,
    height_short: 10.0,

    /* =========== */
    /* SKIN */
    /* =========== */

    eyes_dragonkin: 1.0,
    ears_dragonkin: 1.0,
    mouth_dragonkin: 1.0,
    body_dragonkin: 1.0,
    arms_dragonkin: 1.0,
    legs_dragonkin: 1.0,
    tail_dragonkin: 1.0,
    dick_dragonkin: 0.9,
    wings_dragonkin: 0.005,
  },
  trait_dispreferences: {
    /* trait dispreferences */ height_tall: 10,
    height_giant: 50,
  },
};
