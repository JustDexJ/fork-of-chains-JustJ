export const ROOMS = definitions<RoomDefinition>()({
  scouttower: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  scouttower: {
    name: "Scout Tower",
    tags: ["scout", "unlocker", "critical"],
    description: `A small tower outside your fort which allows your scouts to see far ahead.
Unlocks a quest which grants a contact in the <<lore region_forest>> that supply you with scouting mission each week.`,
    costs: [[qc.Money(-600)]],
    restrictions: [[qres.Building("scouthut")]],
    on_build: [[qc.QuestDirect("forest_contact")]],
    main_room_template_key: "scouttower",
  },
});
