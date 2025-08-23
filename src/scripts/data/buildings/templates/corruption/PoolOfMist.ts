export const ROOMS = definitions<RoomDefinition>()({
  poolofmist: {
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
  poolofmist: {
    name: "Pool of Mist",
    tags: ["corruption"],
    description: `Unlocks targeted corruptions on the eyes, ears, and mouths of slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("ritualchamber")]],
    main_room_template_key: "poolofmist",
  },
});
