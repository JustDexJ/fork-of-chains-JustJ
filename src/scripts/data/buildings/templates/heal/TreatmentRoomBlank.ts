export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomblank: {
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
  treatmentroomblank: {
    name: "Therapy Room",
    tags: ["heal"],
    description: `Unlocks a treatment option that can reset a slave's trainings.
Each treatment will consume a <<rep setup.item.blank_potion>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
        qres.HasItem("technology_blank"),
      ],
    ],
    main_room_template_key: "treatmentroomblank",
  },
});
