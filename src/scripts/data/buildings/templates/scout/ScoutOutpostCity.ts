export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostcity: {
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
  scoutoutpostcity: {
    name: "Scout Outpost: City",
    tags: ["scout"],
    description: `Unlocks the City Scout duty, which grants you free quest leads each week from the <<lore region_city>>.`,
    costs: [[qc.Money(-4700)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("scoutoffice"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("scoutcity")]],
    main_room_template_key: "scoutoutpostcity",
  },
});
