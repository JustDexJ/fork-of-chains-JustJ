import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  rack: {
    tags: ["hidename", "hideskill"],
    description:
      "A bondage rack, empty right now, but still instills great fear into your many slaves.",
    name: "Rack",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "slaving",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "aid",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  bondageroom: {
    tags: [],
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [
      {
        type: "always",
        skill_key: "slaving",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "aid",
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
  bondageroom: {
    name: "BondageRoom",
    tags: ["decoration"],
    description: `A room filled to the brim with bondage tools, for your more adventurous slavers.
When placed at your fort, will increase
<<rep setup.skill.slaving>> in exchange for <<rep setup.skill.aid>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "bondageroom",
    sub_room_template_key: "rack",
  },
});
