import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  statue: {
    tags: ["hidename", "hideskill"],
    description:
      "A beautiful yet somewhat indecent piece of work. Reminds you of yourself, really.",
    name: "Statue",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "sex",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "knowledge",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },

  gallery: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [
      {
        type: "always",
        skill_key: "sex",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "knowledge",
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
  gallery: {
    name: "Gallery",
    tags: ["decoration"],
    description: `A small clearing decorated with statues and sculptures of many kind.
Some of them are depicts their actors in rather compromising positions.
When placed at your fort, will increase
<<rep setup.skill.sex>> in exchange for <<rep setup.skill.knowledge>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "gallery",
    sub_room_template_key: "statue",
  },
});
