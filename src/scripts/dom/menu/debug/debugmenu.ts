export const DOM_Menu_debugmenu = (): DOM.Node => {
  const fragments: DOM.Attachable[] = [];
  //fragments.push(html`
  //  <div>
  //    ${setup.DOM.Nav.link(`(turn off debug mode)`, () => {
  //      State.variables.gDebug = false;
  //      setup.DOM.Nav.goto();
  //    })}
  //  </div>
  //`);

  fragments.push(html`
    <div>${twee`[[(TEST EVERYTHING)|DebugTestEverything]]`}</div>
    <div>
      ${setup.DOM.Util.message(`(Syntax check all content)`, () => {
        setup.DOM.Menu.devtoolcheckall();
      })}
    </div>
    <hr />
    <div>
      ${setup.DOM.Nav.move("(Test quests)", "QuestDebug")}
      ${setup.DOM.Nav.move("(See scoutable quests)", "GeneratableDebug")}
    </div>
    <div>${setup.DOM.Nav.move("(Test opportunities)", "OpportunityDebug")}</div>
    <div>${setup.DOM.Nav.move("(Test interactions)", "InteractionDebug")}</div>
    <div>${setup.DOM.Nav.move("(Test events)", "EventDebug")}</div>
    <div>${setup.DOM.Nav.move("(Test activites)", "ActivityDebug")}</div>
    <div>${setup.DOM.Nav.move("(Test all livings)", "LivingDebugDoAll")}</div>
    <hr />
    <div>${setup.DOM.Nav.move("(Test get item)", "ItemDebug")}</div>
    <div>${setup.DOM.Nav.move("(Test get equipment)", "EquipmentDebug")}</div>
    <div>
      ${setup.DOM.Nav.link(`(Test get 100,000 money)`, () => {
        State.variables.company.player.addMoney(100000);
        setup.DOM.Nav.goto();
      })}
    </div>
    <div>
      ${setup.DOM.Nav.move("(Test increase / decrease favor)", "FavorDebug")}
    </div>
    <div>
      ${setup.DOM.Nav.move("(Test increase / decrease ire)", "IreDebug")}
    </div>
    <hr />
    <div>
      ${setup.DOM.Nav.link("(Show variables)", () => {
        const in_fragments = [];
        for (const varname in State.variables.varstore.vars) {
          in_fragments.push(html`
            <div>${varname}: ${State.variables.varstore.get(varname)}</div>
          `);
        }
        setup.Dialogs.open({
          title: "All game variables",
          content: setup.DOM.create("div", {}, in_fragments),
        });
      })}
    </div>
    <div>
      ${setup.DOM.Util.message(`(Test trigger error)`, () => {
        return setup.debugCrash();
      })}
    </div>
  `);
  return setup.DOM.create("div", {}, fragments);
};
