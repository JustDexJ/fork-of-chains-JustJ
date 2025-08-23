import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  tree: {
    tags: ["hidename", "hideskill"],
    description: `A normal, regular-sized tree. Not everything in this world has to be abnormally large, you know.`,
    name: "Tree",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "brawn",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "intrigue",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },

  yard: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [
      {
        type: "always",
        skill_key: "brawn",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "intrigue",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS_MAIN,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  yard: {
    name: "Yard",
    tags: ["decoration"],
    description: `A small clearing for your slavers to just enjoy nature.
When placed at your fort, will increase
<<rep setup.skill.brawn>> in exchange for <<rep setup.skill.intrigue>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "yard",
    sub_room_template_key: "tree",
  },
});
