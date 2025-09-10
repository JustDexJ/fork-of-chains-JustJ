export const BUILDINGS = definitions<BuildingDefinition>()({
  surgerybreast: {
    name: "Surgery: Breast Operating Table",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of you and your slavers' breasts.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery")]],
  },
});
