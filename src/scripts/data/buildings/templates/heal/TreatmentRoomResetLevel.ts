export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomresetlevel: {
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
  treatmentroomresetlevel: {
    name: "Pharmacy",
    tags: ["heal"],
    description: `Unlocks a treatment option that can reset the level of a unit to level 1.
Note that their skills will also be reset to those of a level 1 unit.
Each treatment will consume a <<rep setup.item.reset_potion>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light"]),
      ],
    ],
    main_room_template_key: "treatmentroomresetlevel",
  },
});
