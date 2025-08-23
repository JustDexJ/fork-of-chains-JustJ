export const ROOMS = definitions<RoomDefinition>()({
  recreationwingsex: {
    tags: [],
    width: 4,
    height: 4,
    skill_bonus: [
      {
        type: "near",
        skill_key: "sex",
        room_keys: [
          "analfuckhole",
          "oralfuckhole",
          "sissybooth",
          "stage",
          "vaginafuckhole",
        ],
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
  recreationwingsex: {
    name: "Recreation wing: Sex",
    tags: ["recreation", "unlocker"],
    description: `Designate a part of your <<rep setup.buildingtemplate.recreationwing>> for placing your
fuckholes and making them available for paying customers.
Unlocks the Fuckhole Pimp duty, who can earn money from fuckhole slaves that can be unlocked
by further building the
<<rep setup.buildingtemplate.analfuckhole>>, the
<<rep setup.buildingtemplate.oralfuckhole>>, the
<<rep setup.buildingtemplate.sissybooth>>, the
<<rep setup.buildingtemplate.stage>>, and the
<<rep setup.buildingtemplate.vaginafuckhole>> improvements.`,
    costs: [[qc.Money(-5000)]],
    restrictions: [[qres.Building("recreationwing")]],
    on_build: [[qc.Duty("sexpimp")]],
    main_room_template_key: "recreationwingsex",
  },
});
