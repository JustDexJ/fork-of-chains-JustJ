export const ROOMS = definitions<RoomDefinition>()({
  dutyroom: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "knowledge",
        room_keys: [
          "greathall",
          "questoffice",
          "specialistoffice",
          "viceleaderoffice",
          "doctoroffice",
          "mysticoffice",
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
  dutyroom: {
    name: "Duty roster room",
    tags: ["office", "critical", "unlocker"],
    description: `A small room to assign weekly duties to your slavers.
Unlocks assigning slavers to duties.
Also unlocks the Leader duty, which is a duty exclusive for yourself that may grant you
some money each when you are not busy.`,
    costs: [[qc.Money(-1500)]],
    restrictions: [[qres.Building("greathall")]],
    on_build: [[qc.Duty("leader")]],
    main_room_template_key: "dutyroom",
  },
});
