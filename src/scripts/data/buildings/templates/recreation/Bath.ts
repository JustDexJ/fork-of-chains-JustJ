export const ROOMS = definitions<RoomDefinition>()({
  bath: {
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
  bath: {
    name: "Bath",
    tags: ["recreation"],
    description: `Unlocks the Toilet slave duty, which increases the income
made by your Entertainment Pimp
based on the toilet skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwing")]],
    on_build: [[qc.Duty("toiletslave")]],
    main_room_template_key: "bath",
  },
});
