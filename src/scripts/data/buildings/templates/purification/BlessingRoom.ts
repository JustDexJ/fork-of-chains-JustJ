export const ROOMS = definitions<RoomDefinition>()({
  blessingroom: {
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
  blessingroom: {
    name: "Blessing Room",
    tags: ["purification"],
    description: `Unlocks targeted purification on the eyes, mouth, or ears of slaves and slavers.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUMLOW_MULT)]],
    restrictions: [
      [
        qres.Building("temple"),
        qres.HasSlaverWithTraits(["magic_fire_master"]),
      ],
    ],
    main_room_template_key: "blessingroom",
  },
});
