export const ROOMS = definitions<RoomDefinition>()({
  mailroom: {
    tags: [],
    width: 3,
    height: 2,
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
  mailroom: {
    name: "Mail room",
    tags: ["critical", "misc"],
    description: `Where your incoming mails are sorted to.
Unlocks the management of opportunities.`,
    costs: [[qc.Money(-800)]],
    restrictions: [[qres.Building("questoffice")]],
    main_room_template_key: "mailroom",
  },
});
