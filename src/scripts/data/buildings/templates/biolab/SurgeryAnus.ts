export const BUILDINGS = definitions<BuildingDefinition>()({
  surgeryanus: {
    name: "Surgery: Anus Operating Table",
    tags: ["biolab"],
    description: `Unlocks tightening and loosening of you and your slavers' anus.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery"), qres.HasItem("rear_technology")]],
  },
});
