export const ROOMS = definitions<RoomDefinition>()({
  warehouse: {
    tags: [],
    width: 4,
    height: 4,
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
  warehouse: {
    name: "Warehouse",
    tags: ["storage", "critical", "unlocker"],
    description: `A proper place to store all your items. Allows you to see all the items you hold, as well as use
items you own such as potions.`,
    costs: [[qc.Money(-2400)]],
    restrictions: [[qres.Building("armory"), qres.Building("greathall")]],
    main_room_template_key: "warehouse",
  },
});
