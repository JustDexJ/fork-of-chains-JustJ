export const ROOMS = definitions<RoomDefinition>()({
  constructionoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "brawn",
        room_keys: [
          "greathall",
          "renovationoffice",
          "landscapingoffice",
          "questoffice",
          "warehouse",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  constructionoffice: {
    name: "Construction office",
    tags: ["office", "critical"],
    description: `An essential part of every fort,
this small wooden office houses all the current and future blueprints
of all the improvements in your fort.
You can make further upgrades to your fort by entering this office.`,
    costs: [[]],
    restrictions: [[]],
    main_room_template_key: "constructionoffice",
  },
});
