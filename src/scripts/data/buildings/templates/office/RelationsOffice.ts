export const ROOMS = definitions<RoomDefinition>()({
  relationsoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "social",
        room_keys: [
          "greathall",
          "messengerpost",
          "damagecontroloffice",
          "relationshipmanageroffice",
          "questoffice",
        ],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  relationsoffice: {
    name: "Relations office",
    tags: ["office", "critical", "unlocker"],
    description: `A room for managing your company's relationship with other forces.
Allows you to see your current favors and ires with those forces.
Unlocks an improvement which opens up the Relationship Manager
as well as another improvement which allows you to manage your contacts.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [[qres.Building("greathall")]],
    main_room_template_key: "relationsoffice",
  },
});
