import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  pottedplant: {
    tags: ["hidename", "hideskill"],
    description: "RoomPottedPlant",
    name: "A small plant growing happily in its pot.",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "survival",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "social",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  farm: {
    tags: [],
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [
      {
        type: "always",
        skill_key: "survival",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "social",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS_MAIN,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: true,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  farm: {
    name: "Farm",
    tags: ["decoration"],
    description: `A lush and well-planted patch of land, ensuring your fort has some access to food
in emergencies.
When placed at your fort, will increase
<<rep setup.skill.survival>> in exchange for <<rep setup.skill.social>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "farm",
    sub_room_template_key: "pottedplant",
  },
});
