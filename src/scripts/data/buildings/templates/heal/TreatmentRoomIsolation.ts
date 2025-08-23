export const ROOMS = definitions<RoomDefinition>()({
  treatmentroomisolation: {
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
  treatmentroomisolation: {
    name: "Memory Isolator Room",
    tags: ["heal"],
    description: `Unlocks a treatment that can remove a background or skill from a unit.
This can be useful if they want to learn new skill or background, since both
of them are capped.
Each treatment will consume a <<rep setup.item.potion_isolation>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("treatmentroom"),
        qres.Building("veteranhall"),
        qres.HasSlaverWithTraits(["magic_light_master"]),
        qres.HasItem("isolation_technology"),
      ],
    ],
    main_room_template_key: "treatmentroomisolation",
  },
});
