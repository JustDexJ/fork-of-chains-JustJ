export const ROOMS = definitions<RoomDefinition>()({
  treatmentroommindmend: {
    tags: [],
    width: 4,
    height: 3,
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
  treatmentroommindmend: {
    name: "Spa",
    tags: ["heal"],
    description: `Unlocks a treatment option that can restore a mindbroken slave.
Each treatment will consume a <<rep setup.item.mindmend_potion>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
      ],
    ],
    main_room_template_key: "treatmentroommindmend",
  },
});
