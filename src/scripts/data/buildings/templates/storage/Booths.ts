export const ROOMS = definitions<RoomDefinition>()({
  booths: {
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
  booths: {
    name: "Booths Area",
    tags: ["storage"],
    description: `Several booths placed strategically around your market to attract outside vendors.
Unlocks contacts that can sell items and furniture for your fort.
You can use the furniture once you build the <<rep setup.buildingtemplate.bedchamberwing>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("market")]],
    on_build: [
      [
        qc.Contact("furniturepeddler", null, "contact_lumberjack"),
        qc.Contact("itempeddler", null, "contact_alchemist"),
      ],
    ],
    main_room_template_key: "booths",
  },
});
