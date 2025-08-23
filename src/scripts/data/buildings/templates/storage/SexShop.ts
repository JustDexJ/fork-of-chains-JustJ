export const ROOMS = definitions<RoomDefinition>()({
  sexshop: {
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
  sexshop: {
    name: "Sex Shop",
    tags: ["storage"],
    description: `An underground room in your fort that has been transformed into a marketplace for
sexual-related items.
Unlocks buying sex equipments such as dildos and gags.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("armory")]],
    on_build: [[qc.Contact("sexpeddler", null, "contact_sexshopowner")]],
    main_room_template_key: "sexshop",
  },
});
