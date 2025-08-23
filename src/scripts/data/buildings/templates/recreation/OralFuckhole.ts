export const ROOMS = definitions<RoomDefinition>()({
  oralfuckhole: {
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
  oralfuckhole: {
    name: "Oral fuckhole",
    tags: ["recreation"],
    description: `Unlocks the Oral Fuckhole slave duty, which increases the income
made by your Sex Pimp
based on the oral skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwingsex")]],
    on_build: [[qc.Duty("oralfuckholeslave")]],
    main_room_template_key: "oralfuckhole",
  },
});
