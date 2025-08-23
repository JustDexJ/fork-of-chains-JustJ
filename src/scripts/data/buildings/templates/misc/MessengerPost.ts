export const ROOMS = definitions<RoomDefinition>()({
  messengerpost: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  messengerpost: {
    name: "Messenger post",
    tags: ["critical", "misc"],
    description: `Where you send and receive messages from all across the realm.
Unlocks managing your contacts.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("questoffice"), qres.Building("veteranhall")],
    ],
    main_room_template_key: "messengerpost",
  },
});
