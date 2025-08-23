export const ROOMS = definitions<RoomDefinition>()({
  renovationoffice: {
    tags: [],
    width: 3,
    height: 2,
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
  renovationoffice: {
    name: "Renovation office",
    tags: ["office", "critical"],
    description: `A room to accompany the <<rep setup.buildingtemplate.constructionoffice>> where
you can plan renovations for your existing rooms.
Unlocks moving existing rooms around.
Renovation will cost some money, however.`,
    costs: [[qc.Money(-1000)]],
    restrictions: [[]],
    main_room_template_key: "renovationoffice",
  },
});
