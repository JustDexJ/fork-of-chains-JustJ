export const ROOMS = definitions<RoomDefinition>()({
  marketingoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "social",
        room_keys: [
          "greathall",
          "questoffice",
          "slavepens",
          "marketeroffice",
          "dungeons",
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
  marketingoffice: {
    name: "Marketing office",
    tags: ["office", "critical", "unlocker"],
    description: `A critical improvement if you want to dabble in slave trade.
This room allows the company to accept and complete slave orders.`,
    costs: [[qc.Money(-800)]],
    restrictions: [[qres.Building("questoffice"), qres.Building("dungeons")]],
    on_build: [[qc.SlaveOrderMenial()]],
    main_room_template_key: "marketingoffice",
  },
});
