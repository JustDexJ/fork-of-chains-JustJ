export const ROOMS = definitions<RoomDefinition>()({
  relationshipmanageroffice: {
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
  relationshipmanageroffice: {
    name: "Relationship manager office",
    tags: ["office"],
    description: `Unlocks the Relationship Manager duty, which can prevent favor with other companies
from decaying.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_CHEAP_MULT)]],
    restrictions: [
      [qres.Building("relationsoffice"), qres.Building("dutyroom")],
    ],
    on_build: [[qc.Duty("relationshipmanager")]],
    main_room_template_key: "relationshipmanageroffice",
  },
});
