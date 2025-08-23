export const ROOMS = definitions<RoomDefinition>()({
  bazaar: {
    tags: [],
    width: 4,
    height: 4,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  bazaar: {
    name: "Bazaar",
    tags: ["storage", "critical"],
    description: `A designated square just outside your fort where you occasionally auctions trinkets and
treasures from your raids to the public.
Unlocks selling items and spare equipment from their corresponding menus.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("warehouse"), qres.Building("armory")]],
    on_build: [],
    main_room_template_key: "bazaar",
  },
});
