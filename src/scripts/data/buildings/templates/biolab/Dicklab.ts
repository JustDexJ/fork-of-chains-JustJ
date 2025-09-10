export const BUILDINGS = definitions<BuildingDefinition>()({
  dicklab: {
    name: "Dicklab",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of slave dicks.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("biolab")]],
  },
});
