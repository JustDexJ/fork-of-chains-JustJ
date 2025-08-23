export const ROOMS = definitions<RoomDefinition>()({
  hiringsquaresea: {
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
  hiringsquaresea: {
    name: "Recruitment Booth: Sea",
    tags: ["hiring"],
    description: `A booth in the <<rep setup.buildingtemplate.hiringsquare>> where you can attempt
to recruit the people and lizardkin living off the <<lore region_sea>> into your company.
Unlocks a contact which gives you a quest for hiring new slavers from the <<lore region_sea>>.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [qres.Building("hiringsquare"), qres.Building("scoutharbor")],
    ],
    on_build: [[qc.Contact("recruitersea")]],
    main_room_template_key: "hiringsquaresea",
  },
});
