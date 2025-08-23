export const ROOMS = definitions<RoomDefinition>()({
  deeppoolofmist: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  deeppoolofmist: {
    name: "Deep Pool of Mist",
    tags: ["corruption"],
    description: `Unlocks targeted corruptions on the eyes, ears, and mouths of slavers.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_VERYHIGH_MULT)]],
    restrictions: [
      [
        qres.HasSlaverWithTraits(["magic_dark_master"]),
        qres.Building("deepritualchamber"),
      ],
    ],
    main_room_template_key: "deeppoolofmist",
  },
});
