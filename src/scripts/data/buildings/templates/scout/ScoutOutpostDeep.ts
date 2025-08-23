export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostdeep: {
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
  scoutoutpostdeep: {
    name: "Scout Outpost: Deeprealm",
    tags: ["scout"],
    description: `Unlocks the Deeprealm Scout duty, which grants you free quest leads each week from <<lore region_deep>>.`,
    costs: [[qc.Money(-5300)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("scouttunnel"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("scoutdeep")]],
    main_room_template_key: "scoutoutpostdeep",
  },
});
