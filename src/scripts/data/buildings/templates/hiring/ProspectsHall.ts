export const ROOMS = definitions<RoomDefinition>()({
  prospectshall: {
    tags: [],
    width: 2,
    height: 4,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  prospectshall: {
    name: "Prospects hall",
    tags: ["hiring", "critical"],
    description: `One of the most important improvements, a prospect hall is where
new prospective slavers are accomodated in your fort before your
decide to hire them.
Unlocks hiring new slavers.`,
    costs: [[qc.Money(-500)]],
    restrictions: [[qres.Building("lodgings")]],
    main_room_template_key: "prospectshall",
  },
});
