export const BUILDINGS = definitions<BuildingDefinition>()({
  anuslab: {
    name: "Anuslab",
    tags: ["biolab"],
    description: `Unlocks tightening and loosening of slave's anus.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("biolab"), qres.HasItem("rear_technology")]],
  },
});
