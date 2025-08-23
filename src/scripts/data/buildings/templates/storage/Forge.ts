export const ROOMS = definitions<RoomDefinition>()({
  forge: {
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
  forge: {
    name: "Forge",
    tags: ["storage", "unlocker"],
    description: `An area with anvil and source of flame where blacksmiths and tailor can practice their craft.
Unlocks buying non-sexual related equipments.
Can build improvements which attracts vendors that makes more goods available to purchase.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("armory")]],
    on_build: [[]],
    main_room_template_key: "forge",
  },
});
