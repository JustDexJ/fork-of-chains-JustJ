export const ROOMS = definitions<RoomDefinition>()({
  specialistoffice: {
    tags: [],
    width: 2,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  specialistoffice: {
    name: "Specialist office",
    tags: ["office"],
    description: `An office reserved for contract specialists hired by your company.
Once build, your on-duty units can still keep performing their duties
even when they are away or injured by hiring temporary replacements.
The replacements are specialists at their job, but need to be paid a hefty
<<money setup.DUTY_SPECIALIST_WEEKLY_UPKEEP>>
per week when your slaver is away.`,
    costs: [[qc.Money(-5000)]],
    restrictions: [[qres.Building("greathall")]],
    main_room_template_key: "specialistoffice",
  },
});
