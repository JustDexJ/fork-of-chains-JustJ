import { Show } from "solid-js";
import type { Company } from "../../classes/Company";
import { Twee } from "../components/common";
import {
  MenuItemAction,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { repFavor } from "../util/favor";

const CompanyFavorStatusFragment: Component<{ company: Company }> = (props) => {
  const getText = (): Node => {
    const favor = State.variables.favor.getFavor(props.company);
    if (favor >= setup.FAVOR_EFFECT_THRESHOLDS[2]) {
      return setup.DOM.Text.success("[Ally]");
    } else if (favor >= setup.FAVOR_EFFECT_THRESHOLDS[1]) {
      return setup.DOM.Text.successlite("[Trusting]");
    } else if (favor >= setup.FAVOR_EFFECT_THRESHOLDS[0]) {
      return setup.DOM.Text.successlite("[Friendly]");
    } else {
      return document.createTextNode("[Neutral]");
    }
  };

  return (
    <Show
      when={props.company.isFavorActive()}
      fallback={setup.DOM.Text.danger("[Disabled]")}
    >
      <span
        data-tooltip={
          `When you have at least ${repFavor(setup.FAVOR_EFFECT_THRESHOLDS[0])} favor with this company, ` +
          `you will get certain bonuses. This bonus increases at ${repFavor(setup.FAVOR_EFFECT_THRESHOLDS[1])} and ` +
          `${repFavor(setup.FAVOR_EFFECT_THRESHOLDS[2])} favor.`
        }
      >
        {getText()}
      </span>
    </Show>
  );
};

const CompanyIreFragment: Component<{ company: Company }> = (props) => {
  return (
    <span
      data-tooltip={
        "This represents how annoyed certain members of this company is against your company. " +
        "When their annoyance hits a breaking point, you should be wary of retaliation " +
        "against your company. " +
        "It is possible that you have a high favor and a high level of ire at the same time, because " +
        "the favor and the ire came from two different group of people from the same company."
      }
    >
      <Show
        when={State.variables.favor
          .getManagedCompanies()
          .includes(props.company)}
      >
        <span data-tooltip="Your relationship manager is managing the favor of this company right now">
          {setup.DOM.Text.success("[Managed]")}
        </span>
      </Show>

      {State.variables.ire.getIreDisplay(props.company)}
    </span>
  );
};

const CompanyFavorDecayInfoFragment: Component<{ company: Company }> = (
  props,
) => {
  return (
    <>
      Favor:{" "}
      {setup.DOM.Util.favor(State.variables.favor.getFavor(props.company))}
      <Show when={State.variables.favor.getDecay(props.company)}>
        <span
          data-tooltip={
            "Favor will tend to decay over time. This can be mitigated " +
            "by building the Relations Office and hiring a Relationship Manager, " +
            " who can reduce or eliminate favor decay from some chosen companies."
          }
        >
          (
          {setup.DOM.Util.favor(-State.variables.favor.getDecay(props.company))}
          )
        </span>
      </Show>
    </>
  );
};

const CompanyNameActionMenu: Component<{
  company: Company;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.company)} />

      <MenuItemText
        text={<CompanyFavorStatusFragment company={props.company} />}
      />

      <MenuItemText
        text={<CompanyFavorDecayInfoFragment company={props.company} />}
      />

      <MenuItemText text={<CompanyIreFragment company={props.company} />} />

      <Show when={props.show_actions}>
        <MenuItemExtras>
          <MenuItemAction
            text="Favor bonus active"
            tooltip="If unchecked, you will stop receiving bonuses from being allied with this company"
            checked={props.company.isFavorActive()}
            callback={() => {
              props.company.toggleIsFavorActive();
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const CompanyCompactCard = CompanyNameActionMenu;

export const CompanyCard: Component<{
  company: Company;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="companycard">
      <CompanyNameActionMenu {...props} />

      <Twee>{props.company.getTemplate().getDescription()}</Twee>
    </div>
  );
};

export default {
  company(
    company_or_key: Company | Company["key"],
    show_actions?: boolean,
  ): DOM.Node {
    const company = resolveObject(company_or_key, State.variables.company);
    return setup.DOM.renderComponent(CompanyCard, { company, show_actions });
  },

  companycompact(company: Company, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(CompanyNameActionMenu, {
      company,
      show_actions,
    });
  },
};
