import type { RarityKey } from "../../classes/deck/Rarity";
import type { Market } from "../../classes/market/Market";

function marketObjectsDescriptor(...markets: Market[]): string | null {
  const rarity_map = Object.fromEntries(
    objectKeys(setup.rarity).map((k) => [k, 0]),
  ) as Record<RarityKey, number>;

  for (const market of markets) {
    const objects = market.getMarketObjects();
    for (const object of objects) {
      const rarity_class = object.getRarity();
      rarity_map[rarity_class.key] += 1;
    }
  }

  const rarities = [];
  for (const [rarity_key, amount] of objectEntries(rarity_map)) {
    const rarity = setup.rarity[rarity_key];
    if (amount) {
      rarities.push(
        `<span data-tooltip="${rarity.getName()}" class="${rarity.getTextColorClass()}">${amount}</span>`,
      );
    }
  }
  if (!rarities.length) return null;
  return `${rarities.join("|")}`;
}

export { marketObjectsDescriptor as DOM_Menu_marketObjectsDescriptor };

const MAINMENU_ITEMS = [
  [
    {
      title: "Quests",
      passage: "QuestHub",
      icon: "img/menu/quests.svg",
      restrictions: [setup.qres.Building("questoffice")],
      extra() {
        const open = State.variables.company.player.getOpenQuests().length;
        if (open) {
          return setup.DOM.Text.success(open);
        } else {
          return null;
        }
      },
    },
  ],

  [
    {
      title: "Teams",
      passage: "TeamManagement",
      icon: "img/menu/teams.svg",
      restrictions: [setup.qres.Building("missioncontrol")],
    },
    {
      title: "Mail",
      passage: "OpportunityList",
      icon: "img/menu/mail.svg",
      restrictions: [setup.qres.Building("mailroom")],
      extra() {
        const open = State.variables.opportunitylist.getOpportunities().length;
        if (open) {
          return html`${setup.DOM.Text.success(open)}`;
        } else {
          return null;
        }
      },
    },
  ],

  [
    // Row: unit lists
    {
      title: "Slavers",
      passage: "Lodgings",
      icon: "img/job/slaver.svg",
      restrictions: [setup.qres.Building("lodgings")],
      extra() {
        const current = State.variables.company.player.getUnits({
          job: setup.job.slaver,
        }).length;
        const limit = State.variables.company.player.getMaxUnitOfJob(
          setup.job.slaver,
        );
        return html`${current}/${limit}`;
      },
    },
    {
      title: "Slaves",
      passage: "Dungeons",
      icon: "img/job/slave.svg",
      restrictions: [setup.qres.Building("dungeons")],
      extra() {
        const current = State.variables.company.player.getUnits({
          job: setup.job.slave,
        }).length;
        const limit = State.variables.company.player.getMaxUnitOfJob(
          setup.job.slave,
        );
        return html`${current}/${limit}`;
      },
    },
  ],

  [
    // Row: new hires
    {
      title: "Recruit",
      passage: "MarketSlaver",
      icon: "img/tag_room/hiring.svg",
      restrictions: [setup.qres.Building("prospectshall")],
      extra() {
        return marketObjectsDescriptor(State.variables.market.slavermarket);
      },
    },
    {
      title: "Pen",
      passage: "MarketSlave",
      icon: "img/menu/slave_pens.svg",
      restrictions: [setup.qres.Building("slavepens")],
      extra() {
        return marketObjectsDescriptor(State.variables.market.slavemarket);
      },
    },
  ],

  [
    /* Team, duty */
    {
      title: "Parties",
      passage: "PartyManagement",
      icon: "img/menu/parties.svg",
      restrictions: [setup.qres.Building("moraleoffice")],
    },
    {
      title: "Duty",
      passage: "DutyList",
      icon: "img/tag_room/office.svg",
      restrictions: [setup.qres.Building("dutyroom")],
      extra() {
        const open = State.variables.dutylist.getOpenDutiesCount();
        if (open) {
          return html`${setup.DOM.Text.successlite(open)}`;
        } else {
          return null;
        }
      },
    },
  ],

  [
    {
      title: "Injured",
      passage: "Hospital",
      icon: "img/tag_room/heal.svg",
      restrictions: [setup.qres.Building("hospital")],
      extra() {
        const injured = State.variables.company.player.getUnits({
          injured: true,
        }).length;
        if (injured) {
          return html`${setup.DOM.Text.dangerlite(injured)}`;
        } else {
          return null;
        }
      },
    },
    {
      title: "Orders",
      passage: "SlaveOrderList",
      icon: "img/tag_quest/order.svg",
      restrictions: [setup.qres.Building("marketingoffice")],
      extra() {
        const orders = State.variables.slaveorderlist.countSlaveOrders();
        if (orders) {
          return html`${setup.DOM.Text.successlite(orders)}`;
        } else {
          return null;
        }
      },
    },
  ],

  [
    {
      title: "Fort",
      passage: "FortGrid",
      icon: "img/tag_quest/fort.svg",
      restrictions: [setup.qres.Building("constructionoffice")],
      extra() {
        const unplaced = State.variables.roomlist.getUnplacedRooms();
        if (unplaced.length) {
          return html`${setup.DOM.Text.success(unplaced.length)}`;
        } else {
          return null;
        }
      },
    },
    {
      title: "Library",
      passage: "Library",
      icon: "img/tag_lore/concept.svg",
      restrictions: [
        setup.qres.Or([
          setup.qres.Building("library"),
          setup.qres.Building("classroom"),
        ]),
      ],
    },
  ],

  [
    {
      title: "Market",
      //passage: "MarketItem",
      //passage: "MarketEquipment",
      passage: "Market",
      icon: "img/tag_quest/money.svg",
      //restrictions: [setup.qres.Or([setup.qres.Building("market")])],
      //restrictions: [
      //  setup.qres.Or([
      //    setup.qres.Building("forge"),
      //    setup.qres.Building("sexshop"),
      //  ]),
      //],
      restrictions: [
        setup.qres.Or([
          setup.qres.Building("market"),
          setup.qres.Building("forge"),
          setup.qres.Building("sexshop"),
        ]),
      ],
      extra() {
        return marketObjectsDescriptor(
          State.variables.market.itemmarket,
          State.variables.market.equipmentmarket,
        );
        //return marketObjectsDescriptor(State.variables.market.itemmarket);
        //return marketObjectsDescriptor(State.variables.market.equipmentmarket);
      },
    },
  ],
  [
    {
      title: "Items",
      passage: "Inventory",
      icon: "img/tag_quest/item.svg",
      restrictions: [setup.qres.Building("warehouse")],
    },
    {
      title: "Equipment",
      passage: "Armory",
      icon: "img/tag_sexaction/equipment.svg",
      restrictions: [setup.qres.Building("armory")],
    },
  ],

  [
    /* Rec wing, bedchamber */
    {
      title: "Bedchamber",
      passage: "BedchamberList",
      icon: "img/tag_duty/bedchamber.svg",
      restrictions: [setup.qres.Building("bedchamberwing")],
    },
    {
      title: "Rec. Wing",
      passage: "RecreationWing",
      icon: "img/tag_room/recreation.svg",
      restrictions: [setup.qres.Building("recreationwing")],
    },
  ],

  [
    /* Relations, contact */
    {
      title: "Relations",
      passage: "RelationsOffice",
      icon: "img/tag_quest/favor.svg",
      restrictions: [setup.qres.Building("relationsoffice")],
    },
    {
      title: "Contacts",
      passage: "ContactList",
      icon: "img/tag_quest/contact.svg",
      restrictions: [setup.qres.Building("messengerpost")],
    },
  ],

  [
    {
      title: "Company",
      passage: "CompanyInfo",
      icon: "img/tag_quest/veteran.svg",
      restrictions: [setup.qres.Building("greathall")],
    },
    {
      title: "Retirees",
      passage: "RetiredList",
      icon: "img/job/retired.svg",
      restrictions: [setup.qres.Building("inn")],
      extra() {
        const current = State.variables.retiredlist.getUnits().length;
        const limit = State.variables.retiredlist.getMaxTrackedUnits();
        return html`${current}/${limit}`;
      },
    },
  ],
];

/**
 * Generate menu on the left.
 */
export const DOM_Menu_mainmenu = function (): DOM.Node {
  const fragments: DOM.Node[] = [];
  for (const row of MAINMENU_ITEMS) {
    const row_children = [];
    for (const cell of row) {
      if (
        setup.RestrictionLib.isPrerequisitesSatisfied(null, cell.restrictions)
      ) {
        const cell_children: DOM.Attachable[] = [];
        // push separator between menus in the same row
        //if (row_childdren.length) cell_children.push(html` | `);

        cell_children.push(html`<img src="${cell.icon}" />`);

        cell_children.push(cell.title);

        if (cell.extra) {
          cell_children.push(setup.DOM.create("span", {}, cell.extra()));
        }
        row_children.push(setup.DOM.Nav.move(cell_children, cell.passage));
      }
    }
    if (row_children.length) {
      fragments.push(
        setup.DOM.create(
          "div",
          {
            style: `grid-template-columns: repeat(${row_children.length}, 1fr)`,
          },
          row_children,
        ),
      );
    }
  }
  return setup.DOM.create("span", {}, fragments);
};

export const DOM_Menu_mainmenufooter = function (): DOM.Node {
  // software version footer
  let debugtext: DOM.Node | null = null;
  if (State.variables.gDebug) {
    debugtext = setup.DOM.Nav.link(setup.DOM.Text.dangerlite("[DEBUG]"), () => {
      setup.DOM.Nav.goto("DebugMenu");
    });
  }

  const title_div = setup.DOM.create("div", {}, [
    setup.DOM.create("span", {}, `Fort of Chains ${setup.VERSION}`),
    debugtext,
  ]);

  return setup.DOM.create("div", { id: "site-version" }, [title_div]);
};
