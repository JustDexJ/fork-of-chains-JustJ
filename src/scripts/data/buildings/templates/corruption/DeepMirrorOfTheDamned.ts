export const ROOMS = definitions<RoomDefinition>()({
  deepmirrorofthedamned: {
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
  deepmirrorofthedamned: {
    name: "Deep Mirror Of The Damned",
    tags: ["corruption"],
    description: `Unlocks targeted corruptions on the body, arms, and legs of slavers.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_VERYHIGH_MULT)]],
    restrictions: [
      [
        qres.Building("deepritualchamber"),
        qres.HasSlaverWithTraits(["magic_dark_master"]),
      ],
    ],
    main_room_template_key: "deepmirrorofthedamned",
  },
});
