export const ROOMS = definitions<RoomDefinition>()({
  traininggrounds: {
    tags: [],
    width: 4,
    height: 6,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  traininggrounds: {
    name: "Training Grounds",
    tags: ["critical", "misc"],
    description: `The training grounds are where your slavers can practice their skills.
Unlocks the Drill Sergeant duty, who can give all your on-duty units
some experience each week. They will also train your low-level slavers,
increasing their level rapidly.`,
    costs: [[qc.Money(-2500)]],
    restrictions: [[qres.Building("dutyroom"), qres.Building("greathall")]],
    on_build: [[qc.Duty("trainer")]],
    main_room_template_key: "traininggrounds",
  },
});
