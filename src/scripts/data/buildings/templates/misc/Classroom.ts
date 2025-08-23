export const ROOMS = definitions<RoomDefinition>()({
  classroom: {
    tags: [],
    width: 3,
    height: 4,
    door_column: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  classroom: {
    name: "Classroom",
    tags: ["critical", "misc"],
    description: `A room to store... manuals. "That" kind of manuals, for you and your slavers
to learn new bedroom techniques.
Unlocks viewing sex actions units can take during sex, as well as disabling some of them during sex.
Also unlocks the <<rep setup.sexpose.allfours>> pose during sex.`,
    costs: [[qc.Money(-2300)]],
    restrictions: [[qres.Building("greathall")]],
    on_build: [[qc.Item("sexmanual_allfours")]],
    main_room_template_key: "classroom",
  },
});
