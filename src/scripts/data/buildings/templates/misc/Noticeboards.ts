export const ROOMS = definitions<RoomDefinition>()({
  noticeboards: {
    tags: [],
    width: 3,
    height: 3,
    skill_bonus: [
      {
        type: "near",
        skill_key: "social",
        room_keys: [
          "greathall",
          "prospectshall",
          "inn",
          "market",
          "recreationwing",
          "questoffice",
          "hiringsquare",
        ],
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
  noticeboards: {
    name: "Noticeboards",
    tags: ["critical", "misc"],
    description: `Sizable noticeboards where you and your slavers can post information
you do not want to forget.
After building this improvement, you will be notified if you have an
upcoming event.`,
    costs: [[qc.Money(-2500)]],
    restrictions: [[qres.Building("mailroom")]],
    main_room_template_key: "noticeboards",
  },
});
