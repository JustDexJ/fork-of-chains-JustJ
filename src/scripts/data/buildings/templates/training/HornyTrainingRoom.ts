export const ROOMS = definitions<RoomDefinition>()({
  hornytrainingroom: {
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
  hornytrainingroom: {
    name: "Horny Training Room",
    tags: ["training"],
    description: `Unlocks Horny Training: Master for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Through(qres.HasItem("technology_hornymaster")),
        qres.Building("milkerroom"),
        qres.HasSlaverWithTraits(["magic_wind_master"]),
      ],
    ],
    main_room_template_key: "hornytrainingroom",
  },
});
