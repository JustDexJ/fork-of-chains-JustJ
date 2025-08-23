export const ROOMS = definitions<RoomDefinition>()({
  temple: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "arcane",
        room_keys: [
          "greathall",
          "hospital",
          "blessingroom",
          "penitenceroom",
          "prayerroom",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  temple: {
    name: "Temple",
    tags: ["purification", "critical", "unlocker"],
    description: `A temple to pray to some higher beings.
Unlocks purification, which can revert the effect of corruptions on both slaves and slavers,
but it costs quite a bit of money.
Can build further improvements to unlock more targeted purifications.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("greathall"), qres.HasSlaverWithTraits(["magic_fire"])],
    ],
    main_room_template_key: "temple",
  },
});
