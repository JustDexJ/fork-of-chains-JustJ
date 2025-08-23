const _portal_price = [
  [qc.Money(-1000), qc.LoseItem("potion_portal", 1)],
  [qc.Money(-50000), qc.LoseItem("potion_portal", 1)],
  [qc.Money(-1000000), qc.LoseItem("potion_portal", 1)],
];

export const ROOMS = definitions<RoomDefinition>()({
  portalindoors: {
    tags: ["hidename"],
    width: 1,
    height: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: true,
    is_outdoors: false,
  },

  portaloutdoors: {
    tags: ["hidename"],
    width: 1,
    height: 1,
    skill_bonus: [],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: true,
    is_outdoors: true,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  portalindoors: {
    name: "Portal (Indoors)",
    tags: ["misc"],
    description: `A paraphernalia for opening a stable temporal gate between portals, allowing
people to travel instantly between any two of them.
Allows your units to pass from a portal to any other,
which can make two physically distant rooms become nearby with
each other.
<br/>
This portal can only be built indoors.`,
    costs: _portal_price,
    restrictions: [[qres.HasItem("technology_portal")], [], []],
    main_room_template_key: "portalindoors",
    sub_room_template_key: "portalindoors",
  },

  portaloutdoors: {
    name: "Portal (Outdoors)",
    tags: ["misc"],
    description: `A paraphernalia for opening a stable temporal gate between portals, allowing
people to travel instantly between any two of them.
Allows your units to pass from a portal to any other,
which can make two physically distant rooms become nearby with
each other.
<br/>
This portal can only be built outdoors.`,
    costs: _portal_price,
    restrictions: [[qres.HasItem("technology_portal")], [], []],
    main_room_template_key: "portaloutdoors",
    sub_room_template_key: "portaloutdoors",
  },
});
