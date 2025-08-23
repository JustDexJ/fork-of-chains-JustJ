export const ROOMS = definitions<RoomDefinition>()({
  scoutcarriage: {
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
  scoutcarriage: {
    name: "Scout Carriage",
    tags: ["scout", "unlocker", "critical"],
    description: `A horse carriage parked neatly outside your fort, for distant travel.
Unlocks a quest which grants a contact in the desert that supply you with scouting mission each week.`,
    costs: [[qc.Money(-3900)]],
    restrictions: [[qres.Building("scouthut"), qres.Building("greathall")]],
    on_build: [[qc.QuestDirect("desert_contact")]],
    main_room_template_key: "scoutcarriage",
  },
});
