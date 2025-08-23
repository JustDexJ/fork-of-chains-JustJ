export const ROOMS = definitions<RoomDefinition>()({
  veteranhall: {
    tags: [],
    width: 6,
    height: 8,
    skill_bonus: [
      {
        type: "near",
        skill_key: "slaving",
        room_keys: [
          "greathall",
          "bedchamberwing",
          "dungeons",
          "inn",
          "lodgings",
        ],
      },
    ],
    is_fixed: false,
    is_passable: true,
    is_door: false,
    is_optional: false,
    is_outdoors: false,
  },
});

export const BUILDINGS = definitions<BuildingDefinition>()({
  veteranhall: {
    name: "Veteran Hall",
    tags: ["critical", "unlocker", "structural"],
    description: `Renovates the floor above your great hall into a grand area suitable to display your company's
achievements.
Unlocks seeing your company statistics in the company info.
Also enables veteran quests to be scouted, which are considerably harder than normal quests.
Furthermore, this improvement is a requirement for many veteran improvements.
<br/>
Building this improvement will also <<successtextlite 'permanently'>> ramp up all the quest
rewards of low-level quests to the equivalent of a level <<= setup.LEVEL_VETERANHALL >> quest.
The difficulties do not change.`,
    costs: [[qc.MoneyMult(-20)]],
    restrictions: [
      [
        qres.Building("armory"),
        qres.Building("bedchamberwing"),
        qres.Building("classroom"),
        qres.Building("dutyroom"),
        qres.Building("inn"),
        qres.Building("hospital"),
        qres.Building("library"),
        qres.Building("moraleoffice"),
        qres.Building("recreationwing"),
        qres.Building("relationsoffice"),
        qres.Building("scouttunnel"),
        qres.Building("scoutcarriage"),
        qres.Building("scoutoffice"),
        qres.Building("trainingchamber"),
        qres.Building("traininggrounds"),
        qres.Building("viceleaderoffice"),
        qres.Building("warehouse"),
        qres.Building("warroom"),
      ],
    ],
    on_build: [
      [
        qc.IfThenElse(
          qres.UnitGroupHasUnit("new_game_plus_slaves"),
          qc.DoAll([qc.Event("slavecoming", 3, null)], undefined),
          qc.DoAll([], undefined),
        ),
        qc.IfThenElse(
          qres.Function(() => {
            return !State.variables.statistics.get("new_game_plus_count");
          }),
          qc.DoAll([qc.Event("retirement", 25, null)], undefined),
          qc.DoAll([], undefined),
        ),
      ],
    ],
    main_room_template_key: "veteranhall",
  },
});
