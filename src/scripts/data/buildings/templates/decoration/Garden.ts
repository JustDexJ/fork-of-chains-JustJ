import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  flowerbed: {
    tags: ["hidename", "hideskill"],
    description: "A beautiful patch of flowers.",
    name: "Flowerbed",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "aid",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "slaving",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },

  garden: {
    tags: [],
    width: 2,
    height: 2,
    skill_bonus: [
      {
        type: "always",
        skill_key: "aid",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "slaving",
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
  garden: {
    name: "Garden",
    tags: ["decoration"],
    description: `
A small patch of land designated to grow flowers on.
When placed at your fort, will increase
<<rep setup.skill.aid>> in exchange for <<rep setup.skill.slaving>>.
`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "garden",
    sub_room_template_key: "flowerbed",
  },
});
