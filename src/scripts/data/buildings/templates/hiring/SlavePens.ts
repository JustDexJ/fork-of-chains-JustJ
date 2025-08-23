export const ROOMS = definitions<RoomDefinition>()({
  slavepens: {
    tags: [],
    width: 2,
    height: 4,
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
  slavepens: {
    name: "Slave pens",
    tags: ["hiring", "critical"],
    description: `A must have after you build your dungeons, the slave pens are where
you temporarily keep slaves you capture, as well as slaves
that are being offered to you at a price.
Unlocks getting new slaves.`,
    costs: [[qc.Money(-700)]],
    restrictions: [[qres.Building("dungeons")]],
    main_room_template_key: "slavepens",
  },
});
