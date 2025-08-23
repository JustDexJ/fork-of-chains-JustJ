export const ROOMS = definitions<RoomDefinition>()({
  mysticoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  mysticoffice: {
    name: "Mystic office",
    tags: ["heal"],
    description: `Unlocks the mystic duty, which can amplify boons received by your slavers.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("hospital"), qres.Building("dutyroom")]],
    on_build: [[qc.Duty("mystic")]],
    main_room_template_key: "mysticoffice",
  },
});
