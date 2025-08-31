export const ROOMS = definitions<RoomDefinition>()({
  researchroom: {
    tags: [],
    width: 5,
    height: 3,
    door_column: 2,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  researchroom: {
    name: "Research Room",
    tags: ["training"],
    description: `You can assign your slavers to work here, figuring out the best way to break
a <<rep setup.trait.will_defiant>> slave.
Unlocks a training that can give you a way to remove <<rep setup.trait.will_defiant>> from a slave.
It will be incredibly difficult, however, and you best be prepared...`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [
      [qres.HasItem("technology_research"), qres.Building("trainingchamber")],
    ],
    on_build: [[qc.Event("an_offer_for_a_slave", 0)]],
    main_room_template_key: "researchroom",
  },
});
