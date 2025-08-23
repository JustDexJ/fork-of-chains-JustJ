// TODO: rename to Great Hall

export const ROOMS = definitions<RoomDefinition>()({
  greathall: {
    tags: [],
    width: 6,
    height: 6,
    skill_bonus: [
      {
        type: "near",
        skill_key: "combat",
        room_keys: [
          "veteranhall",
          "bedchamberwing",
          "dungeons",
          "inn",
          "lodgings",
        ],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  greathall: {
    name: "Great Hall",
    tags: ["critical", "unlocker", "structural"],
    description: `Renovate the first floor of your fort into a great hall suitable for your fledging company.
Unlocks seeing your company information, as well as many filter options in various menus.
This improvement is also required to build many of the advanced improvements.`,
    costs: [[qc.Money(-2000)]],
    restrictions: [
      [
        qres.Building("dungeons"),
        qres.Building("hiringsquare"),
        qres.Building("noticeboards"),
        qres.Building("lodgings"),
        qres.Building("mailroom"),
        qres.Building("marketingoffice"),
        qres.Building("missioncontrol"),
        qres.Building("noticeboards"),
        qres.Building("prospectshall"),
        qres.Building("renovationoffice"),
        qres.Building("slavepens"),
        qres.Building("scouttower"),
      ],
    ],
    on_build: [[qc.Event("loan_tiger", 5), qc.Event("open_for_visitors", 1)]],
    main_room_template_key: "greathall",
  },
});
