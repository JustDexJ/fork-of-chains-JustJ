const on_build: Cost = qc.Function(() =>
  State.variables.bedchamberlist.newBedchamber(),
);

export const ROOMS = definitions<RoomDefinition>()({
  bedchambersuite: {
    tags: [],
    description: "A suite for your a lucky slaver to have all for their own.",
    name: "Bedchamber suite",
    width: 3,
    height: 3,
    door_column: 0,
    skill_bonus: [],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
  bedchamberwing: {
    tags: [],
    width: 5,
    height: 3,
    door_column: 0,
    skill_bonus: [
      {
        type: "near",
        skill_key: "sex",
        room_keys: ["bedchambersuite"],
      },
    ],
    is_fixed: false,
    is_passable: false,
    is_door: true,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  bedchamberwing: {
    name: "Bedchamber wing",
    tags: ["critical", "accomodation"],
    description: `
Transforms a small wing of your fort into a luxurious area for you and your
slavers to revel in your success.
Unlocks private bedchambers, in which you can give ownership of some slaves to yourself
or your slavers.
Very, very slightly increases the slaver's skills, but the main reason this improvement exists
is to roleplay.
<br/>
Each upgrade unlocks one extra bedchamber.
<br/>
You can assign slaves to bedchambers via the "Duty" menu.

`,
    costs: [
      [qc.Money(-3000)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],

      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],

      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],

      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],

      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
      [qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)],
    ],
    restrictions: [
      [qres.Building("greathall"), qres.Building("dutyroom")],
      [qres.Building("veteranhall")],
      [],
      [],
      [],

      [],
      [],
      [],
      [],
      [],

      [],
      [],
      [],
      [],
      [],

      [],
      [],
      [],
      [],
      [],

      [],
      [],
      [],
      [],
      [],
    ],
    on_build: [
      [on_build],
      [on_build],
      [on_build],
      [on_build],
      [on_build],

      [on_build],
      [on_build],
      [on_build],
      [on_build],
      [on_build],

      [on_build],
      [on_build],
      [on_build],
      [on_build],
      [on_build],

      [on_build],
      [on_build],
      [on_build],
      [on_build],
      [on_build],

      [on_build],
      [on_build],
      [on_build],
      [on_build],
      [on_build],
    ],
    main_room_template_key: "bedchamberwing",
    sub_room_template_key: "bedchambersuite",
  },
});
