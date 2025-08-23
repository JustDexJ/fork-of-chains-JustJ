import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  candlestick: {
    tags: ["hidename", "hideskill"],
    description: "A tall candlestick illuminating its surroundings.",
    name: "Candlestick",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "arcane",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "combat",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  oilroom: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [
      {
        type: "always",
        skill_key: "arcane",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "combat",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS_MAIN,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  oilroom: {
    name: "OilRoom",
    tags: ["decoration"],
    description: `A storage for storing oil, a precious resource in this time and age.
When placed at your fort, will increase
<<rep setup.skill.arcane>> in exchange for <<rep setup.skill.combat>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "oilroom",
    sub_room_template_key: "candlestick",
  },
});
