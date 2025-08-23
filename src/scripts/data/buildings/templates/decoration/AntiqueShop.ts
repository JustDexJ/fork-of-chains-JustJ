import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  vase: {
    tags: ["hidename", "hideskill"],
    description:
      "An exotic-looking vase from the south. It's balanced precariously on its small base.",
    name: "Vase",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "intrigue",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "brawn",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },

  antiqueshop: {
    tags: [],
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [
      {
        type: "always",
        skill_key: "intrigue",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "brawn",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS_MAIN,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: true,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  antiqueshop: {
    name: "AntiqueShop",
    tags: ["decoration"],
    description: `A small shop selling various antiquities within your fort.
Many fragile-looking valuables are stored within, and you best
keep your most brutish slavers from wandering in.
When placed at your fort, will increase
<<rep setup.skill.intrigue>> in exchange for <<rep setup.skill.brawn>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "antiqueshop",
    sub_room_template_key: "vase",
  },
});
