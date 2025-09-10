export const BUILDINGS = definitions<BuildingDefinition>()({
  surgeryvagina: {
    name: "Surgery: Vagina Operating Table",
    tags: ["biolab"],
    description: `Unlocks tightening of you and your slavers' vagina.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery"), qres.HasItem("rear_technology")]],
  },
});
