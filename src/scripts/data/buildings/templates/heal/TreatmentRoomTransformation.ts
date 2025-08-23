export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomtransformation: {
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
  treatmentroomtransformation: {
    name: "Body Reshaper Room",
    tags: ["heal"],
    description: `Unlocks a treatment that can grow a random non-demonic body-part to a unit.
Each treatment will consume a <<rep setup.item.potion_transformation>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
        qres.HasItem("transformation_technology"),
      ],
    ],
    main_room_template_key: "treatmentroomtransformation",
  },
});
