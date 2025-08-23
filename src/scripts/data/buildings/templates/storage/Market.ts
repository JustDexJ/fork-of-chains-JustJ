export const ROOMS = definitions<RoomDefinition>()({
  market: {
    tags: [],
    width: 5,
    height: 5,
    skill_bonus: [
      {
        type: "near",
        skill_key: "knowledge",
        room_keys: [
          "alchemistshop",
          "armory",
          "bazaar",
          "booths",
          "forge",
          "inn",
          "sexshop",
          "warehouse",
          "workshop",
        ],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  market: {
    name: "Market",
    tags: ["storage", "unlocker"],
    description: `An area with small kiosks where peddlers can sell their goods to you and your slavers.
Unlocks buying items.
Can build improvements which attracts vendors that makes more goods available to purchase.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("warehouse")]],
    on_build: [[]],
    main_room_template_key: "market",
  },
});
