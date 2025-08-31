import type { Lore, LoreKey } from "../../classes/Lore";
import { Twee } from "../components/common";
import { MenuItemTitle, MenuItemToolbar } from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { RestrictionsCard } from "./RestrictionsCard";

const LoreNameActionMenu: Component<{ lore: Lore; show_actions?: boolean }> = (
  props,
) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {setup.TagHelper.getTagsRep("lore", props.lore.getTags())}{" "}
            {domCardRep(props.lore)}
          </>
        }
      />
    </MenuItemToolbar>
  );
};

export const LoreCompactCard = LoreNameActionMenu;

export const LoreCard: Component<{ lore: Lore; show_actions?: boolean }> = (
  props,
) => {
  return (
    <div class="lorecard">
      <div>
        <LoreNameActionMenu {...props} />
        <div>
          <RestrictionsCard
            restrictions={props.lore.getRestrictions()}
            obj={null}
            is_show_all={true}
          />
        </div>
        <Twee>{props.lore.getLoreText()}</Twee>
      </div>
    </div>
  );
};

export default {
  lore(lore_or_key: Lore | LoreKey, show_actions?: boolean): DOM.Attachable {
    const lore = resolveObject(lore_or_key, setup.lore);
    return setup.DOM.renderComponent(LoreCard, { lore, show_actions });
  },

  lorecompact(lore: Lore, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(LoreNameActionMenu, {
      lore,
      show_actions,
    });
  },
};
