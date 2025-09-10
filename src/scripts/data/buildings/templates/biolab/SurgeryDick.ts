export const BUILDINGS = definitions<BuildingDefinition>()({
  surgerydick: {
    name: "Surgery: Dick Operating Table",
    tags: ["biolab"],
    description: `Unlocks limited growing and shrinking of you and your slavers' dicks.`,
    costs: [[qc.MoneyMult(-Constants.BUILDING_HIGH_MULT)]],
    restrictions: [[qres.Building("surgery")]],
  },
});
