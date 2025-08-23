import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  armorystorage: {
    tags: [],
    description:
      "An extension to your armory, allowing you to store more equipment sets.",
    name: "Armory storage",
    width: 2,
    height: 2,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: false,
    is_outdoors: false,
  },

  armory: {
    tags: [],
    width: 3,
    height: 3,
    door_column: 1,
    skill_bonus: [
      {
        type: "adjacent",
        skill_key: "brawn",
        room_keys: ["armorystorage"],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

const restrictions = BuildingTemplate.getLodgingsRestrictions();
restrictions[0].push(qres.Building("greathall"));

export const BUILDINGS = definitions<BuildingDefinition>()({
  armory: {
    name: "Armory",
    tags: ["critical", "storage", "unlocker"],
    description: `Where you store are all your spare equipment, and allows you to manage them more efficiently.
Unlocks the management of equipment sets.
Initially, there are only enough space for a few equipment sets, but this can be
expanded by
upgrading the armory.
Each upgrade adds
<<= setup.EQUIPMENTSET_PER_STORAGE>>
extra spaces for equipment sets.`,
    costs: BuildingTemplate.getLodgingsCost(2000),
    restrictions: restrictions,
    main_room_template_key: "armory",
    sub_room_template_key: "armorystorage",
  },
});
