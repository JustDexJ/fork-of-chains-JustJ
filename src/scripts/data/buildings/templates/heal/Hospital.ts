export const ROOMS = definitions<RoomDefinition>()({
  hospital: {
    tags: [],
    width: 4,
    height: 4,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "aid",
        room_keys: [
          "greathall",
          "doctoroffice",
          "moraleoffice",
          "mysticoffice",
          "traumacenter",
          "treatmentroom",
          "alchemistshop",
          "warehouse",
          "library",
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
  hospital: {
    name: "Hospital",
    tags: ["critical", "heal", "unlocker"],
    description: `A proper place for the injured to rest and recover.
Unlocks management of injured units.
Allows building additional improvements that can speedup recovery.`,
    costs: [[qc.Money(-2900)]],
    restrictions: [[qres.Building("greathall")]],
    main_room_template_key: "hospital",
  },
});
