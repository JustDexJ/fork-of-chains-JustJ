export const ROOMS = definitions<RoomDefinition>()({
  courtyard: {
    tags: [],
    width: 3,
    height: 3,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  courtyard: {
    name: "Courtyard",
    tags: ["recreation"],
    description: `Unlocks the Furniture slave duty, which increases the income
made by your Service Pimp
based on the endurance skill of the slave.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("recreationwingservice")]],
    on_build: [[qc.Duty("furnitureslave")]],
    main_room_template_key: "courtyard",
  },
});
