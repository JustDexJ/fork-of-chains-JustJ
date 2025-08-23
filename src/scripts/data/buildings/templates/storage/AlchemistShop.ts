export const ROOMS = definitions<RoomDefinition>()({
  alchemistshop: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  alchemistshop: {
    name: "Alchemist Shop",
    tags: ["storage"],
    description: `A laboratory for an alchemist to work their magic.
  Unlocks buying an infinite number of many kinds of potions that you have ever acquired in the game,
  but at an incredibly steep markup.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("market"), qres.Building("veteranhall")]],
    on_build: [[]],
    main_room_template_key: "alchemistshop",
  },
});
