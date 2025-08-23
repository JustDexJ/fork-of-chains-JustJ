export const ROOMS = definitions<RoomDefinition>()({
  surgeryballs: {
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
  surgeryballs: {
    name: "Surgery: Balls Operating Room",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of you and your slavers' balls.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery")]],
    main_room_template_key: "surgeryballs",
  },
});
