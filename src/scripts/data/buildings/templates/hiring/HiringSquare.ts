export const ROOMS = definitions<RoomDefinition>()({
  hiringsquare: {
    tags: [],
    width: 4,
    height: 4,
    skill_bonus: [
      {
        type: "adjacent",
        skill_key: "intrigue",
        room_keys: [
          "hiringsquaredeep",
          "hiringsquaredesert",
          "hiringsquareforest",
          "hiringsquaresea",
          "hiringsquarevale",
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
  hiringsquare: {
    name: "Fort Square",
    tags: ["hiring", "unlocker"],
    description: `A small empty space in front of your fort where you can post
job openings.
Unlocks a contact which gives you a quest for hiring new slavers from all across the region.`,
    costs: [[qc.Money(-700)]],
    restrictions: [[qres.Building("prospectshall")]],
    on_build: [[qc.Contact("recruiter")]],
    main_room_template_key: "hiringsquare",
  },
});
