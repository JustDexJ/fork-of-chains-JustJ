export const ROOMS = definitions<RoomDefinition>()({
  anuslab: {
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
  anuslab: {
    name: "Anuslab",
    tags: ["biolab"],
    description: `Unlocks tightening and loosening of slave's anus.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("biolab"), qres.HasItem("rear_technology")]],
    main_room_template_key: "anuslab",
  },
});
