export const ROOMS = definitions<RoomDefinition>()({
  scoutoutpostsea: {
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
  scoutoutpostsea: {
    name: "Scout Outpost: Sea",
    tags: ["scout"],
    description: `Unlocks the Sea Scout duty, which grants you free quest leads each week from the beyond the southern sea.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [
      [
        qres.Building("scouthut"),
        qres.Building("scoutharbor"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("scoutsea")]],
    main_room_template_key: "scoutoutpostsea",
  },
});
