export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostforest: {
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
  scoutoutpostforest: {
    name: "Scout Outpost: Forest",
    tags: ["scout"],
    description: `Unlocks the Forest Scout duty, which grants you free quest leads each week from the <<lore region_forest>>.`,
    costs: [[qc.Money(-3200)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("scouttower"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("scoutforest")]],
    main_room_template_key: "scoutoutpostforest",
  },
});
