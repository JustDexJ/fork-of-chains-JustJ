import { BuildingTemplate } from "../../../../classes/BuildingTemplate";

export const ROOMS = definitions<RoomDefinition>()({
  sofa: {
    tags: ["hidename", "hideskill"],
    description:
      "A lush and beautiful sofa that looks out of place in your fort.",
    name: "Sofa",
    width: 1,
    height: 1,
    skill_bonus: [
      {
        type: "always",
        skill_key: "combat",
        bonus_amount: Constants.ROOM_DECORATION_BONUS,
      },
      {
        type: "always",
        skill_key: "arcane",
        bonus_amount: -Constants.ROOM_DECORATION_BONUS,
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  commonroom: {
    tags: [],
    width: 2,
    height: 2,
    door_column: 0,
    skill_bonus: [
      {
        type: "always",
        skill_key: "combat",
        bonus_amount: Constants.ROOM_DECORATION_BONUS_MAIN,
      },
      {
        type: "always",
        skill_key: "arcane",
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
  commonroom: {
    name: "CommonRoom",
    tags: ["decoration"],
    description: `A small room for your slavers to relax and enjoy themselves.
When placed at your fort, will increase
<<rep setup.skill.combat>> in exchange for <<rep setup.skill.arcane>>.`,
    costs: BuildingTemplate.getDecorationCosts(),
    restrictions: BuildingTemplate.getDecorationRestrictions(),
    main_room_template_key: "commonroom",
    sub_room_template_key: "sofa",
  },
});
