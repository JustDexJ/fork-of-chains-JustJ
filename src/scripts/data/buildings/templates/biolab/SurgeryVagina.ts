export const ROOMS = definitions<RoomDefinition>()({
  surgeryvagina: {
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
  surgeryvagina: {
    name: "Surgery: Vagina Operating Room",
    tags: ["biolab"],
    description: `Unlocks tightening of you and your slavers' vagina.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery"), qres.HasItem("rear_technology")]],
    main_room_template_key: "surgeryvagina",
  },
});
