export const ROOMS = definitions<RoomDefinition>()({
  ponytrainingroom: {
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
  ponytrainingroom: {
    name: "Pony Training Room",
    tags: ["training"],
    description: `Unlocks Pony Training: Master for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Building("trainingfield"),
        qres.HasSlaverWithTraits(["magic_wind_master"]),
      ],
    ],
    main_room_template_key: "ponytrainingroom",
  },
});
