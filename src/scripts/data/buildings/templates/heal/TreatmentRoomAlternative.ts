export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomalternative: {
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
  treatmentroomalternative: {
    name: "Alternate Timeline Creation Room",
    tags: ["heal"],
    description: `Unlocks a treatment that can reset a unit's skills into a new set of skill focuses,
without resetting the unit's level.
Each treatment will consume a <<rep setup.item.potion_alternative>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_ASTRO_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
        qres.HasItem("technology_alternative"),
      ],
    ],
    main_room_template_key: "treatmentroomalternative",
  },
});
