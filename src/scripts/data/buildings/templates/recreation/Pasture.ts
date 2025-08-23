export const ROOMS = definitions<RoomDefinition>()({
  pasture: {
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
  pasture: {
    name: "Pasture",
    tags: ["recreation"],
    description: `Unlocks the Milk Cow slave duty, which increases the income
made by your Service Pimp
based on the size of the slave's milky breasts.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwingservice")]],
    on_build: [[qc.Duty("milkcowslave")]],
    main_room_template_key: "pasture",
  },
});
