export const ROOMS = definitions<RoomDefinition>()({
  fetishtrainingroom: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "arcane",
        room_keys: [
          "toilettrainingroom",
          "sissytrainingroom",
          "roleplaytrainingroom",
          "sissybooth",
          "theatre",
          "bath",
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
  fetishtrainingroom: {
    name: "Fetish Training Room",
    tags: ["training", "unlocker"],
    description: `Room containing several specialized tools to train slaves for particularly...
uncommon tastes.
Unlocks basic and advanced training for: toilet training, sissy training, and roleplay training.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [[qres.Building("trainingchamber")]],
    main_room_template_key: "fetishtrainingroom",
  },
});
