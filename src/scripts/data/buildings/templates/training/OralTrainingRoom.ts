export const ROOMS = definitions<RoomDefinition>()({
  oraltrainingroom: {
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
  oraltrainingroom: {
    name: "Oral Training Room",
    tags: ["training"],
    description: `Unlocks Oral Training: Master for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Building("trainingbedroom"),
        qres.HasSlaverWithTraits(["magic_earth_master"]),
      ],
    ],
    main_room_template_key: "oraltrainingroom",
  },
});
