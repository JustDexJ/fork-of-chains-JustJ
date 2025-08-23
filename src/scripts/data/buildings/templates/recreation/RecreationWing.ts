export const ROOMS = definitions<RoomDefinition>()({
  recreationwing: {
    tags: [],
    width: 4,
    height: 4,
    skill_bonus: [
      {
        type: "near",
        skill_key: "sex",
        room_keys: [
          "recreationwingservice",
          "recreationwingsex",
          "dungeons",
          "slavepens",
          "trainingchamber",
        ],
      },
      {
        type: "near",
        skill_key: "social",
        room_keys: ["bath", "gym", "kennel", "museum", "stables"],
      },
      {
        type: "near",
        skill_key: "knowledge",
        room_keys: ["greathall", "market", "inn", "lodgings", "sexshop"],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  recreationwing: {
    name: "Recreation wing",
    tags: ["recreation", "critical", "unlocker"],
    description: `Transforms the right wing of your fort into an area of entertainment and general debauchery.
Unlocks the Entertainment Pimp duty and the Entertainment Slave duty.
The Entertainment Pimp duty will earn you income each week based on the duty officer skill and the
slave's usefulness as an entertainment slave.
Can build further improvements which unlock further slave duties as well as other pimp duties,
which can earn you even more profit each week.`,
    costs: [[qc.Money(-3000)]],
    restrictions: [
      [
        qres.Building("greathall"),
        qres.Building("trainingchamber"),
        qres.Building("dutyroom"),
      ],
    ],
    on_build: [[qc.Duty("entertainmentpimp"), qc.Duty("entertainmentslave")]],
    main_room_template_key: "recreationwing",
  },
});
