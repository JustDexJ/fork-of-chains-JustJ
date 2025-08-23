export const ROOMS = definitions<RoomDefinition>()({
  trainingfield: {
    tags: [],
    width: 3,
    height: 5,
    skill_bonus: [
      {
        type: "near",
        skill_key: "brawn",
        room_keys: [
          "endurancetrainingroom",
          "pettrainingroom",
          "ponytrainingroom",
          "kennel",
          "courtyard",
          "stables",
        ],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  trainingfield: {
    name: "Training Field",
    tags: ["training", "unlocker"],
    description: `
A small field within your fort for exercising slaves.
Unlocks basic and advanced endurance, pet, and pony training for slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("trainingchamber")]],
    main_room_template_key: "trainingfield",
  },
});
