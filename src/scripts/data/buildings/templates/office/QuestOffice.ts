export const ROOMS = definitions<RoomDefinition>()({
  questoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "intrigue",
        room_keys: [
          "greathall",
          "mailroom",
          "messengerpost",
          "viceleaderoffice",
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
  questoffice: {
    name: "Your office",
    tags: ["office", "critical"],
    description: `Your office, where you do your main work: picking and outfitting teams to quests.`,
    costs: [[]],
    restrictions: [[]],
    main_room_template_key: "questoffice",
  },
});
