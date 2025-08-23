import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  slaverroom: {
    tags: [],
    description: "A room for two of your slavers to call home.",
    name: "Slaver room",
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },

  lodgings: {
    tags: [],
    width: 4,
    height: 2,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "combat",
        room_keys: ["slaverroom"],
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
  lodgings: {
    name: "Lodgings",
    tags: ["critical", "unlocker", "accomodation"],
    description: `A room in your fort has been transformed into
a lodgings area for your slavers.
While only few rooms have been prepared initially, you can prepare more rooms
to house more slavers.
Each upgrade adds
<<= setup.FORT_SLAVER_CAPACITY_PER_LODGING>>
extra spaces for slavers.`,
    costs: BuildingTemplate.getLodgingsCost(0),
    restrictions: BuildingTemplate.getLodgingsRestrictions(),
    main_room_template_key: "lodgings",
    sub_room_template_key: "slaverroom",
  },
});
