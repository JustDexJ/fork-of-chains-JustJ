import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  endtable: {
    tags: ["hidename", "hideskill"],
    description: "An end table to make your fort looks less desolate.",
    name: "End table",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "knowledge",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "sex",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  diningroom: {
    tags: [],
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [
      {
        type: "always",
        skill_key: "knowledge",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "sex",
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
  diningroom: {
    name: "DiningRoom",
    tags: ["decoration"],
    description: `A room where your slavers can gather and enjoy a meal together, like a family.
When placed at your fort, will increase
<<rep setup.skill.knowledge>> in exchange for <<rep setup.skill.sex>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "diningroom",
    sub_room_template_key: "endtable",
  },
});
