export const ROOMS = definitions<RoomDefinition>()({
  endurancetrainingroom: {
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
  endurancetrainingroom: {
    name: "Endurance Training Room",
    tags: ["training"],
    description: `Unlocks Endurance Training: Master for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Through(qres.HasItem("technology_endurancemaster")),
        qres.Building("trainingfield"),
        qres.HasSlaverWithTraits(["magic_wind_master"]),
      ],
    ],
    main_room_template_key: "endurancetrainingroom",
  },
});
