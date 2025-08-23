const mapping = {
  activitycard: setup.DOM.Card.activity,
  bedchambercard: setup.DOM.Card.bedchamber,
  buildingcard: setup.DOM.Card.buildinginstance,
  buildingtemplatecard: setup.DOM.Card.buildingtemplate,
  companycard: setup.DOM.Card.company,
  companycardcompact: setup.DOM.Card.companycompact,
  dutycard: setup.DOM.Card.duty,
  dutycardcompact: setup.DOM.Card.dutycompact,
  contactcard: setup.DOM.Card.contact,
  contactcardcompact: setup.DOM.Card.contactcompact,
  equipmentcard: setup.DOM.Card.equipment,
  equipmentsetcard: setup.DOM.Card.equipmentset,
  equipmentpoolcard: setup.DOM.Card.equipmentpool,
  notificationscard: setup.DOM.Card.notifications,
  opportunitycard: setup.DOM.Card.opportunity,
  partycard: setup.DOM.Card.party,
  partycardcompact: setup.DOM.Card.partycompact,
  questcard: setup.DOM.Card.quest,
  questauthorcardtext: setup.DOM.Card.author,
  roominstancecard: setup.DOM.Card.roominstance,
  roomtemplatecard: setup.DOM.Card.roomtemplate,
  sexactioncard: setup.DOM.Card.sexaction,
  sexactioncardcompact: setup.DOM.Card.sexactioncompact,
  slaveordercard: setup.DOM.Card.slaveorder,
  slaveordercardcompact: setup.DOM.Card.slaveordercompact,
  teamcard: setup.DOM.Card.team,
  teamcardcompact: setup.DOM.Card.teamcompact,
  titlecard: setup.DOM.Card.title,
  unitactioncard: setup.DOM.Card.unitaction,
  unitactioncardcompact: setup.DOM.Card.unitactioncompact,
  unitcard: setup.DOM.Card.unit,
  unitskillcard: setup.DOM.Card.unitskill,
  itemcard: setup.DOM.Card.item,
  itempoolcard: setup.DOM.Card.itempool,
  lorecardcompact: setup.DOM.Card.lorecompact,
  lorecard: setup.DOM.Card.lore,

  costcard: setup.DOM.Card.cost,
  requirementcard: setup.DOM.Card.restriction,
  criteriacard: setup.DOM.Card.criteria,
} satisfies Record<string, (...args: any[]) => DOM.Node | null | undefined>;

for (const [macro_name, card] of objectEntries(mapping)) {
  Macro.add(macro_name, {
    handler() {
      const node: DOM.Node | null | undefined = (card as any)(...this.args);
      if (node) {
        this.output.appendChild(node);
      }
    },
  });
}
