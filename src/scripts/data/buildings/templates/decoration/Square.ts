import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  fountain: {
    tags: ["hidename", "hideskill"],
    description: "A pedestal of stone everflowing with water.",
    name: "Fountain",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "social",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "survival",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },

  square: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [
      {
        type: "always",
        skill_key: "social",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "survival",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS_MAIN,
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  square: {
    name: "Square",
    tags: ["decoration"],
    description: `A small empty spot on the courtyards of your fort where people can gather and converse.
When placed at your fort, will increase
<<rep setup.skill.social>> in exchange for <<rep setup.skill.survival>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "square",
    sub_room_template_key: "fountain",
  },
});
