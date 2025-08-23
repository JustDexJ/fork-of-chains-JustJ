export const ROOMS = definitions<RoomDefinition>()({
  marketeroffice: {
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
  marketeroffice: {
    name: "Marketer office",
    tags: ["office"],
    description: `Unlocks the Marketer duty, which gives you a fixed-price slave order each week.`,
    costs: [[qc.Money(-2400)]],
    restrictions: [
      [qres.Building("marketingoffice"), qres.Building("dutyroom")],
    ],
    on_build: [[qc.Duty("marketer")]],
    main_room_template_key: "marketeroffice",
  },
});
