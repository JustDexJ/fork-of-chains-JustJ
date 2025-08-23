export const ROOMS = definitions<RoomDefinition>()({
  scoutoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "survival",
        room_keys: [
          "greathall",
          "scouthut",
          "scoutcarriage",
          "scouttunnel",
          "scouttower",
          "shipyard",
          "scoutoutpostcity",
          "scoutoutpostdeep",
          "scoutoutpostdesert",
          "scoutoutpostforest",
          "scoutoutpostsea",
          "scoutoutpostvale",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  scoutoffice: {
    name: "Scout Office",
    tags: ["scout", "unlocker", "critical"],
    description: `An office outside your fort where the scouts store all the leads in
the city.
Unlocks a quest which grants a contact in the city that supply you with scouting mission each week.`,
    costs: [[qc.Money(-2400)]],
    restrictions: [[qres.Building("scouthut"), qres.Building("greathall")]],
    on_build: [[qc.QuestDirect("city_contact")]],
    main_room_template_key: "scoutoffice",
  },
});
