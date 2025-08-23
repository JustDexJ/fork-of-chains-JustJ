export const ROOMS = definitions<RoomDefinition>()({
  scouttunnel: {
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
  scouttunnel: {
    name: "Scout Tunnel",
    tags: ["scout", "unlocker", "critical"],
    description: `A properly excavated tunnel leading into one of a highway of <<lore region_deep>> right under your fort.
Unlocks a quest which grants a contact in <<lore region_deep>> that supply you with scouting mission each week.`,
    costs: [[qc.Money(-3200)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("greathall"),
        qres.HasItem("lorebook_deep"),
      ],
    ],
    on_build: [[qc.QuestDirect("deep_contact")]],
    main_room_template_key: "scouttunnel",
  },
});
