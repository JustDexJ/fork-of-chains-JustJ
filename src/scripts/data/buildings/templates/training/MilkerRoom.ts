export const ROOMS = definitions<RoomDefinition>()({
  milkerroom: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "aid",
        room_keys: [
          "domestictrainingroom",
          "hornytrainingroom",
          "cleaning",
          "museum",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  milkerroom: {
    name: "Milker Room",
    tags: ["training", "unlocker"],
    description: `The centerpiece of this room is a row of chairs with various devious looking tubes.
They can be used to milk slaves dry, whose fluids then have to be cleaned up by your cleaning slaves.
Unlocks basic and advanced domestic and horny training for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("trainingchamber")]],
    main_room_template_key: "milkerroom",
  },
});
