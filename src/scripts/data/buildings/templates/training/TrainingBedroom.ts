export const ROOMS = definitions<RoomDefinition>()({
  trainingbedroom: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "sex",
        room_keys: [
          "oraltrainingroom",
          "vaginatrainingroom",
          "analtrainingroom",
          "oralfuckhole",
          "analfuckhole",
          "vaginafuckhole",
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
  trainingbedroom: {
    name: "Training Bedroom",
    tags: ["training", "unlocker"],
    description: `
A small room with a bed within the training chamber complex.
Unlocks basic and advanced vaginal, oral, and anal sex training for slaves.
`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("trainingchamber")]],
    main_room_template_key: "trainingbedroom",
  },
});
