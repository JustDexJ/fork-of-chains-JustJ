export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomlovetrue: {
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
  treatmentroomlovetrue: {
    name: "Private Vacation Room",
    tags: ["heal"],
    description: `Unlocks a treatment option that can forcefully make two units love each other.
Each treatment will consume a <<rep setup.item.love_potion_true>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
        qres.HasItem("love_technology"),
      ],
    ],
    main_room_template_key: "treatmentroomlovetrue",
  },
});
