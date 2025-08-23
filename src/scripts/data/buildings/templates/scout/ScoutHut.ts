export const ROOMS = definitions<RoomDefinition>()({
  scouthut: {
    tags: [],
    width: 2,
    height: 2,
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
  scouthut: {
    name: "Scout Hut",
    tags: ["scout", "unlocker", "critical"],
    description: `A small hut outside your fort where your scouts prepare before venturing outside.
Unlocks a quest which grants
a contact in the <<lore region_vale>> that supply you with scouting mission each week.`,
    costs: [[qc.Money(-50)]],
    restrictions: [[]],
    on_build: [[qc.QuestDirect("vale_contact")]],
    main_room_template_key: "scouthut",
  },
});
