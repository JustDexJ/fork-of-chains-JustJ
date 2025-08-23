export const ROOMS = definitions<RoomDefinition>()({
  moraleoffice: {
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
  moraleoffice: {
    name: "Morale office",
    tags: ["critical", "heal"],
    description: `An office for you to manage the growing number of members of your company.
Unlocks Parties, which allow you to organize your units for better viewing and filtering
(it has no direct gameplay effects).
Also unlocks viewing banters at week ends, as well as viewing the relationships between slavers
and between a slaver and a slave.`,
    costs: [[qc.Money(-2400)]],
    restrictions: [[qres.Building("hospital"), qres.Building("greathall")]],
    main_room_template_key: "moraleoffice",
  },
});
