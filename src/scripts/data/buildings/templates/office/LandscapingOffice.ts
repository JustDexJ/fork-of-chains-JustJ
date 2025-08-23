export const ROOMS = definitions<RoomDefinition>()({
  landscapingoffice: {
    tags: [],
    name: "Landscaping office",
    width: 3,
    height: 2,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  landscapingoffice: {
    name: "Landscaping office",
    tags: ["office", "unlocker", "critical"],
    description: `An office where you can ensure your fort looks presentable to visitors.
Once built, your improvements will be able to receive adjacency and vicinity
bonuses from being built close to others, which grant a small but company-wide
boosts to all skills.
Also unlocks various decoration improvements for your fort, which
increases some skills in exchange for some others.
<br/>
Note that skill bonus from adjacencies are <<successtext 'very small'>>, and you can ignore
this mechanic altogether without any noticable effect.`,
    costs: [[qc.Money(-1000)]],
    restrictions: [[qres.Building("greathall")]],
    on_build: [
      [
        qc.Function(() => {
          State.variables.roomlist.resetCacheAll();
        }),
      ],
    ],
    main_room_template_key: "landscapingoffice",
  },
});
