export const ROOMS = definitions<RoomDefinition>()({
  sissybooth: {
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
  sissybooth: {
    name: "Rent-a-Sissy",
    tags: ["recreation"],
    description: `Unlocks the Sissy slave duty, which increases the income
made by your Sex Pimp
based on the sissy skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwingsex")]],
    on_build: [[qc.Duty("sissyslave")]],
    main_room_template_key: "sissybooth",
  },
});
