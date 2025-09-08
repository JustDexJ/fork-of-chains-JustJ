export const BUILDINGS = definitions<BuildingDefinition>()({
  breastlab: {
    name: "Breastlab",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of slave breasts.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_MEDIUM_MULT)]],
    restrictions: [[qres.Building("biolab")]],
  },
});
