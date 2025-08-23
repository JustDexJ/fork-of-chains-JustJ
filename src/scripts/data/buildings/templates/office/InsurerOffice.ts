export const ROOMS = definitions<RoomDefinition>()({
  insureroffice: {
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
  insureroffice: {
    name: "Insurer office",
    tags: ["office"],
    description: `If you want to succeed, then make plans for the failures.
Unlocks the Insurer duty,
which gives you money each time you fail a quest.`,
    costs: [[qc.Money(-1500)]],
    restrictions: [
      [qres.Building("missioncontrol"), qres.Building("greathall")],
    ],
    on_build: [[qc.Duty("insurer")]],
    main_room_template_key: "insureroffice",
  },
});
