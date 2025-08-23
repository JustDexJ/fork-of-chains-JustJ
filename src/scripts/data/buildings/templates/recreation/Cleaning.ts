export const ROOMS = definitions<RoomDefinition>()({
  cleaning: {
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
  cleaning: {
    name: "Cleaning closet",
    tags: ["recreation"],
    description: `Unlocks the Maid slave duty, which increases the income
made by your Service Pimp
based on the domestic skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwingservice")]],
    on_build: [[qc.Duty("maidslave")]],
    main_room_template_key: "cleaning",
  },
});
