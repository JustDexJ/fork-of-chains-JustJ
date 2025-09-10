export const BUILDINGS = definitions<BuildingDefinition>()({
  vaginalab: {
    name: "Vaginalab",
    tags: ["biolab"],
    description: `Unlocks tightening and loosening of a slave vaginas.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("biolab"), qres.HasItem("rear_technology")]],
  },
});
