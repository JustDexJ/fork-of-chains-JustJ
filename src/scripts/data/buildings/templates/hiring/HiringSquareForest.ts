export const ROOMS = definitions<RoomDefinition>()({
  hiringsquareforest: {
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
  hiringsquareforest: {
    name: "Recruitment Booth: Forest",
    tags: ["hiring"],
    description: `A booth in the <<rep setup.buildingtemplate.hiringsquare>> where you can attempt
to recruit the neko and elves living on the <<lore region_forest>> into your company.
Unlocks a contact which gives you a quest for hiring new slavers from the <<lore region_forest>>.`,
    costs: [[qc.Money(-1500)]],
    restrictions: [
      [qres.Building("hiringsquare"), qres.Building("scouttower")],
    ],
    on_build: [[qc.Contact("recruiterforest")]],
    main_room_template_key: "hiringsquareforest",
  },
});
