export const ROOMS = definitions<RoomDefinition>()({
  convincingroom: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  convincingroom: {
    name: "Convincing Room",
    tags: ["training"],
    description: `Where you can practice your best manipulation techniques to convince a slave to do terrible things.
Unlocks a training that can convert a completely untrained slave into a
slaver, although it will cost you quite a bit of money. The slaver will
also be traumatized for a good while, but there is no long-term damage.`,
    costs: [[qc.Money(-3000)]],
    restrictions: [
      [qres.Building("trainingchamber"), qres.Building("greathall")],
    ],
    main_room_template_key: "convincingroom",
  },
});
