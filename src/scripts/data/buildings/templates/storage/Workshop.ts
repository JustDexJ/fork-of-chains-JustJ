export const ROOMS = definitions<RoomDefinition>()({
  workshop: {
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
  workshop: {
    name: "Workshop Area",
    tags: ["storage"],
    description: `Several specialized workshops to attract skilled crafters into your fort.
Unlocks several contacts including a blacksmith, a tailor, and a weaver who sell various equipment in your fort.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("forge")]],
    on_build: [
      [
        qc.Contact("blacksmithpeddler", null, "contact_blacksmith"),
        qc.Contact("tailorpeddler", null, "contact_tailor"),
        qc.Contact("weaverpeddler", null, "contact_weaver"),
      ],
    ],
    main_room_template_key: "workshop",
  },
});
