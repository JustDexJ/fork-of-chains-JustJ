export const ROOMS = definitions<RoomDefinition>()({
  stables: {
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
  stables: {
    name: "Stables",
    tags: ["recreation"],
    description: `Unlocks the Pony slave duty, which increases the income
made by your Entertainment Pimp
based on the pony skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwing")]],
    on_build: [[qc.Duty("ponyslave")]],
    main_room_template_key: "stables",
  },
});
