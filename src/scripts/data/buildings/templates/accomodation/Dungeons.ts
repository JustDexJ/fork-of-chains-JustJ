import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  dungeonscell: {
    tags: [],
    description: "A cell to host even more of your slaves.",
    name: "Dungeons cell",
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

  dungeons: {
    tags: [],
    width: 4,
    height: 2,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "slaving",
        room_keys: ["dungeonscell"],
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
  dungeons: {
    name: "Dungeons",
    tags: ["critical", "unlocker", "accomodation"],
    description: `
A dark complex where you can keep your slaves.
While initially limited in size, you can build more cells to keep more slaves.
Each upgrade adds
<<= setup.FORT_SLAVE_CAPACITY_PER_CELL>>
extra space for keeping slaves.

<br>

Also unlocks having arbitrary sex with your slavers and slaves, although your options
will be quite limited at the start of your career...
`,
    costs: BuildingTemplate.getLodgingsCost(600),
    restrictions: BuildingTemplate.getLodgingsRestrictions(),
    main_room_template_key: "dungeons",
    sub_room_template_key: "dungeonscell",
  },
});
