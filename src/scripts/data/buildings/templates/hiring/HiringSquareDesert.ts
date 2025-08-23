export const ROOMS = definitions<RoomDefinition>()({
  hiringsquaredesert: {
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
  hiringsquaredesert: {
    name: "Recruitment Booth: Desert",
    tags: ["hiring"],
    description: `A booth in the <<rep setup.buildingtemplate.hiringsquare>> where you can attempt
to recruit the people and orcs living on the <<lore region_desert>> into your company.
Unlocks a contact which gives you a quest for hiring new slavers from the <<lore region_desert>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("hiringsquare"), qres.Building("scoutcarriage")],
    ],
    on_build: [[qc.Contact("recruiterdesert")]],
    main_room_template_key: "hiringsquaredesert",
  },
});
