export const ROOMS = definitions<RoomDefinition>()({
  deepritualchamber: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "arcane",
        room_keys: [
          "deeppoolofmist",
          "deepmirrorofthedamned",
          "deepaltarofdarkness",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  deepritualchamber: {
    name: "Deep ritual chamber",
    tags: ["corruption", "unlocker"],
    description: `A damned place to communicate beyond <<lore concept_mist>>, in particular with the demon prince you have
somehow successfully bargained with.
Unlocks corruption on slavers.
Corruption requires slaves to be sent beyond <<lore concept_mist>> as payment.
Can build further improvements to unlock more targeted corruptions.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_VERYHIGH_MULT)]],
    restrictions: [
      [
        qres.Building("ritualchamber"),
        qres.Building("veteranhall"),
        qres.HasItem("dark_technology"),
        qres.HasSlaverWithTraits(["magic_dark_master"]),
      ],
    ],
    main_room_template_key: "deepritualchamber",
  },
});
