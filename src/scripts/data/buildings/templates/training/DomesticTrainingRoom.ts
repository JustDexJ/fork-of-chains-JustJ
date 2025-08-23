export const ROOMS = definitions<RoomDefinition>()({
  domestictrainingroom: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  domestictrainingroom: {
    name: "Domestic Training Room",
    tags: ["training"],
    description: `Unlocks Domestic Training: Master for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Through(qres.HasItem("technology_domesticmaster")),
        qres.Building("milkerroom"),
        qres.HasSlaverWithTraits(["magic_wind_master"]),
      ],
    ],
    main_room_template_key: "domestictrainingroom",
  },
});
