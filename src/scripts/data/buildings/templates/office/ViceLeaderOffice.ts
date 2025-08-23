export const ROOMS = definitions<RoomDefinition>()({
  viceleaderoffice: {
    tags: [],
    width: 2,
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
  viceleaderoffice: {
    name: "Vice-leader office",
    tags: ["office"],
    description: `A lavish office suitable for your vice-leader to do their work.
Unlocks the Vice-leader duty, which increases your skills based on their skills, i.e.,
<<for _iskill, _skill range setup.skill>><<rep _skill>><</for>>.
The Vice-leader also can help automate some of your tasks, including slave training and
answering mails. You will need the Vice-Leader assigned for these to work, but it will still
work even when the Vice-Leader is injured or is going on a quest.`,
    costs: [[qc.Money(-3200)]],
    restrictions: [
      [
        qres.Building("trainingchamber"),
        qres.Building("dutyroom"),
        qres.Building("greathall"),
      ],
    ],
    on_build: [[qc.Duty("viceleader")]],
    main_room_template_key: "viceleaderoffice",
  },
});
