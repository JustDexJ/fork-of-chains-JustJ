export const ROOMS = definitions<RoomDefinition>()({
  torturechamber: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "intrigue",
        room_keys: [
          "dominancetrainingroom",
          "masochisttrainingroom",
          "stage",
          "gym",
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
  torturechamber: {
    name: "Torture Chamber",
    tags: ["training", "unlocker"],
    description: `Containing various tools to inflict pain upon your slaves, this room is
the dread of all but the most masochistic of slaves.
Unlocks basic and advanced dominance and masochist training for slaves, as well
as allowing you to mindbreak slaves.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("trainingchamber")]],
    main_room_template_key: "torturechamber",
  },
});
