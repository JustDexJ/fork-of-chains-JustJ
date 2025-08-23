export const ROOMS = definitions<RoomDefinition>()({
  vaginalab: {
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
  vaginalab: {
    name: "Vaginalab",
    tags: ["biolab"],
    description: `Unlocks tightening and loosening of a slave vaginas.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("biolab"), qres.HasItem("rear_technology")]],
    main_room_template_key: "vaginalab",
  },
});
