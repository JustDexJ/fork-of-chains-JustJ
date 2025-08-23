export const ROOMS = definitions<RoomDefinition>()({
  ritualchamber: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "arcane",
        room_keys: [
          "greathall",
          "poolofmist",
          "mirrorofthedamned",
          "altarofdarkness",
          "deepritualchamber",
          "library",
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
  ritualchamber: {
    name: "Ritual chamber",
    tags: ["corruption", "critical", "unlocker"],
    description: `A damned place to communicate beyond <<lore concept_mist>>.
Unlocks corruption on slaves.
Corruption requires slaves to be sent beyond <<lore concept_mist>> as payment.
Can build further improvements to unlock more targeted corruptions.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [
      [qres.Building("veteranhall"), qres.HasSlaverWithTraits(["magic_dark"])],
    ],
    main_room_template_key: "ritualchamber",
  },
});
