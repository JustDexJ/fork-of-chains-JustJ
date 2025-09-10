export const ROOMS = definitions<RoomDefinition>()({
  biolab: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "brawn",
        room_keys: ["greathall"],
      },
      {
        type: "near",
        skill_key: "brawn",
        room_keys: ["surgery", "hospital", "warehouse", "library"],
      },
      {
        type: "built",
        skill_key: "brawn",
        building_keys: [
          "anuslab",
          "ballslab",
          "breastlab",
          "dicklab",
          "vaginalab",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  biolab: {
    name: "Biolab",
    tags: ["biolab", "critical", "unlocker"],
    description: `Unlocks limited muscle and height growing and shrinking on slaves.
Can build further improvements to unlock more flesh shaping options.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [
      [qres.Building("veteranhall"), qres.HasSlaverWithTraits(["magic_water"])],
    ],
    main_room_template_key: "biolab",
  },
});
