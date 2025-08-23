export const ROOMS = definitions<RoomDefinition>()({
  recreationwingservice: {
    tags: [],
    width: 4,
    height: 4,
    skill_bonus: [
      {
        type: "near",
        skill_key: "aid",
        room_keys: ["courtyard", "cleaning", "pasture", "tavern", "theatre"],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  recreationwingservice: {
    name: "Recreation wing: Service",
    tags: ["recreation", "unlocker"],
    description: `Designate a part of your <<rep setup.buildingtemplate.recreationwing>> for dining and
drinking activities.
Unlocks the Service Pimp duty, who can earn money from dining-related slaves that can be unlocked
by further building the
<<rep setup.buildingtemplate.courtyard>>, the
<<rep setup.buildingtemplate.cleaning>>, the
<<rep setup.buildingtemplate.pasture>>, the
<<rep setup.buildingtemplate.tavern>>, and the
<<rep setup.buildingtemplate.theatre>> improvements.`,
    costs: [[qc.Money(-5000)]],
    restrictions: [[qres.Building("recreationwing")]],
    on_build: [[qc.Duty("servicepimp")]],
    main_room_template_key: "recreationwingservice",
  },
});
