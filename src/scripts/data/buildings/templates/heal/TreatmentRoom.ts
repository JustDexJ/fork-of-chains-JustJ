export const ROOMS = definitions<RoomDefinition>()({
  treatmentroom: {
    tags: [],
    width: 6,
    height: 3,
    door_column: 2,
    skill_bonus: [
      {
        type: "near",
        skill_key: "survival",
        room_keys: [
          "treatmentroomalternative",
          "treatmentroomblank",
          "treatmentroomforget",
          "treatmentroomhate",
          "treatmentroomisolation",
          "treatmentroomlove",
          "treatmentroomlovetrue",
          "treatmentroommindmend",
          "treatmentroomresetlevel",
          "treatmentroomtransformation",
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
  treatmentroom: {
    name: "Treatment Room",
    tags: ["heal", "critical", "unlocker"],
    description: `A sterile room designated to allow your slavers
to (literally) work their healing magic.
Unlocks treatments that can heal significantly injured slavers.
Can be further expanded for more treatment options.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("hospital"), qres.HasSlaverWithTraits(["magic_light"])],
    ],
    main_room_template_key: "treatmentroom",
  },
});
