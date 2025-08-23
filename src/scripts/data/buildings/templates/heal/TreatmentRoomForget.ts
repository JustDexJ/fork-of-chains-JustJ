export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomforget: {
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
  treatmentroomforget: {
    name: "PTSD Room",
    tags: ["heal"],
    description: `Unlocks a treatment option that can forcefully make two slavers forget each other and reset their friendship to 0.
Each treatment will consume a <<rep setup.item.forget_potion>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light"]),
      ],
    ],
    main_room_template_key: "treatmentroomforget",
  },
});
