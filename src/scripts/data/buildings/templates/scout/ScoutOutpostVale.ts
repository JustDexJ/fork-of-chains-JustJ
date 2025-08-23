export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostvale: {
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
  scoutoutpostvale: {
    name: "Scout Outpost: Vale",
    tags: ["scout"],
    description: `Unlocks the Vale Scout duty, which grants you free quest leads each week from the <<lore region_vale>>.`,
    costs: [[qc.Money(-2000)]],
    restrictions: [[qres.Building("scouthut"), qres.Building("dutyroom")]],
    on_build: [[qc.Duty("scoutvale")]],
    main_room_template_key: "scoutoutpostvale",
  },
});
