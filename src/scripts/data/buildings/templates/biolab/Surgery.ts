export const ROOMS = definitions<RoomDefinition>()({
  surgery: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "aid",
        room_keys: [
          "surgeryanus",
          "surgeryballs",
          "surgerybreast",
          "surgerydick",
          "surgeryvagina",
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
  surgery: {
    name: "Surgery",
    tags: ["biolab", "unlocker"],
    description: `Unlocks limited muscle and height growing and shrinking on yourself and your slavers.
Can build further improvements to unlock more physical changes options.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("biolab"),
        qres.Building("veteranhall"),
        qres.HasItem("water_technology"),
        qres.HasSlaverWithTraits(["magic_water_master"]),
      ],
    ],
    main_room_template_key: "surgery",
  },
});
