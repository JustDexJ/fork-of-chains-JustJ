export const ROOMS = definitions<RoomDefinition>()({
  lockerroom: {
    tags: [],
    description:
      "A place for your team to plan and strategize for their missions.",
    name: "Locker room",
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },

  missioncontrol: {
    tags: [],
    width: 4,
    height: 2,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "aid",
        room_keys: ["lockerroom"],
      },
      {
        type: "near",
        skill_key: "survival",
        room_keys: [
          "greathall",
          "questoffice",
          "insureroffice",
          "rescueroffice",
          "armory",
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
  missioncontrol: {
    name: "Mission control",
    tags: ["critical", "misc"],
    description: `Unlocks team management.
Allows you to assign units to permanent team, as well as automatically
assigning units to quests.
Also allows more teams to be sent concurrently on a quest.
Can be upgraded to send even more teams concurrently on a quest,
as well as unlocking more permanent team slots.`,
    costs: [
      [qc.Money(-800)],
      [qc.Money(-1200)],
      [qc.Money(-2000)],
      [qc.Money(-10000)],
      [qc.Money(-1000000)],
    ],
    restrictions: [
      [qres.Building("questoffice"), qres.Building("lodgings")],
      [qres.Building("greathall")],
      [],
      [qres.Building("veteranhall")],
      [],
    ],
    main_room_template_key: "missioncontrol",
    sub_room_template_key: "lockerroom",
  },
});
