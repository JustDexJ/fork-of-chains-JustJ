export const ROOMS = definitions<RoomDefinition>()({
  traumacenter: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  traumacenter: {
    name: "Trauma center",
    tags: ["critical", "heal"],
    description: `A ward to treat your unit's psyche.
Unlocks viewing the durations of your unit's traumas and boons.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("hospital"), qres.Building("greathall")]],
    main_room_template_key: "traumacenter",
  },
});
