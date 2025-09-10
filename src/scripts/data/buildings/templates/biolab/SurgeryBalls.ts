export const BUILDINGS = definitions<BuildingDefinition>()({
  surgeryballs: {
    name: "Surgery: Balls Operating Table",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of you and your slavers' balls.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery")]],
  },
});
