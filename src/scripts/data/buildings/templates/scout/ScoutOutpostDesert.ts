export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostdesert: {
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
  scoutoutpostdesert: {
    name: "Scout Outpost: Desert",
    tags: ["scout"],
    description: `Unlocks the Desert Scout duty, which grants you free quest leads each week from the <<lore region_desert>>.`,
    costs: [[qc.Money(-5800)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("scoutcarriage"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("scoutdesert")]],
    main_room_template_key: "scoutoutpostdesert",
  },
});
