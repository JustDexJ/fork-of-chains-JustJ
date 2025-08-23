import { qres } from "../../../../_init/preinit_costrestrictions";
import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  innroom: {
    tags: [],
    description:
      "A room to host even more people at the <<rep setup.buildingtemplate.inn>>.",
    name: "Inn room",
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
  inn: {
    tags: [],
    width: 4,
    height: 4,
    door_column: 1,
    skill_bonus: [
      {
        type: "near",
        skill_key: "intrigue",
        room_keys: ["innroom"],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

const restrictions = BuildingTemplate.getLodgingsRestrictions();
restrictions[0].push(qres.Building("greathall"));

export const BUILDINGS = definitions<BuildingDefinition>()({
  inn: {
    name: "Inn",
    tags: ["critical", "accomodation"],
    description: `
  A place for visitors to stay at your fort.
You can host guests here, including some of your former slavers,
and you can also keep track of your retired slavers here.
While only few rooms have been prepared initially, you can prepare more rooms
to keep track of more retired slavers.
Each upgrade allows you to keep track of
<<= setup.FORT_GUEST_ROOM_CAPACITY_PER_LEVEL>>
more retired slavers.
`,
    costs: BuildingTemplate.getLodgingsCost(1500),
    restrictions,
    main_room_template_key: "inn",
    sub_room_template_key: "innroom",
  },
});
