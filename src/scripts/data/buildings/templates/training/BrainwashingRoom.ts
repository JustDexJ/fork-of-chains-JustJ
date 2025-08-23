export const ROOMS = definitions<RoomDefinition>()({
  brainwashingroom: {
    tags: [],
    width: 5,
    height: 5,
    door_column: 2,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  brainwashingroom: {
    name: "Brainwashing Room",
    tags: ["training"],
    description: `Where you can practice your brainwash-assisted manipulation techniques to convert
a slave into a slaver without side-effects.
Unlocks a training that can convert a slave into a slaver with no side effect other than
losing all their slave trainings.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [
        qres.Building("trainingchamber"),
        qres.Building("convincingroom"),
        qres.Building("veteranhall"),
        qres.HasItem("brainwash_technology"),
      ],
    ],
    main_room_template_key: "brainwashingroom",
  },
});
