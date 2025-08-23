export const ROOMS = definitions<RoomDefinition>()({
  hiringsquaredeep: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  hiringsquaredeep: {
    name: "Recruitment Booth: Deeprealm",
    tags: ["hiring"],
    description: `A booth in the <<rep setup.buildingtemplate.hiringsquare>> where you can attempt
to recruit the people native to <<lore region_deep>> into your company.
Unlocks a contact which gives you a quest for hiring new slavers from <<lore region_deep>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("hiringsquare"), qres.Building("scouttunnel")],
    ],
    on_build: [[qc.Contact("recruiterdeep")]],
    main_room_template_key: "hiringsquaredeep",
  },
});
