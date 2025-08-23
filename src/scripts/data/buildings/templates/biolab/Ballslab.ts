export const ROOMS = definitions<RoomDefinition>()({
  ballslab: {
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
  ballslab: {
    name: "Ballslab",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of slave balls.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("biolab")]],
    main_room_template_key: "ballslab",
  },
});
