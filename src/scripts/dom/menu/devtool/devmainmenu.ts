/**
 * Generate menu on the left.
 */
export const DOM_Menu_devmainmenu = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  fragments.push(html`
    <div>
      ${setup.DOM.Nav.link("Settings", () => {
        setup.Dialogs.open({
          title: "Settings",
          passage: "SettingsBase",
        });
      })}
    </div>
  `);
  return setup.DOM.create("span", {}, fragments);
};
