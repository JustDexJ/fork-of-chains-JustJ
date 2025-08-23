export const ROOMS = definitions<RoomDefinition>()({
  damagecontroloffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  damagecontroloffice: {
    name: "Damage control office",
    tags: ["office"],
    description: `Unlocks the Damage Control Officer duty, which can decrease ire
with the other forces, in exchange for some money.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("relationsoffice"), qres.Building("dutyroom")],
    ],
    on_build: [[qc.Duty("damagecontrolofficer")]],
    main_room_template_key: "damagecontroloffice",
  },
});
