export const ROOMS = definitions<RoomDefinition>()({
  hiringsquarevale: {
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
  hiringsquarevale: {
    name: "Recruitment Booth: Vale",
    tags: ["hiring"],
    description: `A booth in the <<rep setup.buildingtemplate.hiringsquare>> where you can attempt
to recruit the northerners and weres living in the <<lore region_vale>> into your company.
Unlocks a contact which gives you a quest for hiring new slavers from the <<lore region_vale>>.`,
    costs: [[qc.Money(-1000)]],
    restrictions: [[qres.Building("hiringsquare")]],
    on_build: [[qc.Contact("recruitervale")]],
    main_room_template_key: "hiringsquarevale",
  },
});
