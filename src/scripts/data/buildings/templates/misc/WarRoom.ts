export const ROOMS = definitions<RoomDefinition>()({
  warroom: {
    tags: [],
    width: 2,
    height: 5,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "combat",
        room_keys: ["questoffice", "traininggrounds", "library", "armory"],
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
  warroom: {
    name: "War room",
    tags: ["critical", "misc"],
    description: `Where you can plan specializations for your slavers.
Unlocks assigning perk traits to your slavers.
You can access this via the Slaver menu.`,
    costs: [[qc.Money(-3500)]],
    restrictions: [[qres.Building("greathall")]],
    on_build: [[]],
    main_room_template_key: "warroom",
  },
});
