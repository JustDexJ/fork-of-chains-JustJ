export const ROOMS = definitions<RoomDefinition>()({
  deepaltarofdarkness: {
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
  deepaltarofdarkness: {
    name: "Deep Altar of Darkness",
    tags: ["corruption"],
    description: `Unlocks targeted corruptions on the tails, wings, and dicks of slavers.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_ASTRO_MULT)]],
    restrictions: [
      [
        qres.Building("deepritualchamber"),
        qres.HasItem("wings_technology"),
        qres.HasSlaverWithTraits(["magic_dark_master"]),
      ],
    ],
    main_room_template_key: "deepaltarofdarkness",
  },
});
