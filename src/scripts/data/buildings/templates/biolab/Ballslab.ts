export const BUILDINGS = definitions<BuildingDefinition>()({
  ballslab: {
    name: "Ballslab",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of slave balls.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("biolab")]],
  },
});
