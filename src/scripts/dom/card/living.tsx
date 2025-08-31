import { createMemo } from "solid-js";
import type { Living } from "../../classes/retire/Living";
import { domCardName } from "../util/cardnamerep";
import { RestrictionsCard } from "./restriction";

export const LivingCard: Component<{ living: Living }> = (props) => {
  const getPrefs = createMemo(() => {
    const positive = [];
    const negative = [];
    const preferences = props.living.getTraitPreferences();
    for (const [trait_key, pref] of objectEntries(preferences)) {
      const trait = setup.trait[trait_key];
      if (pref > 0) {
        positive.push(trait);
      } else {
        negative.push(trait);
      }
    }
    return { positive, negative };
  });

  return (
    <div class="livingcard card">
      <span class="toprightspan">
        <div>Default preference: {props.living.default_preference}</div>
      </span>

      <div>
        {setup.DOM.Nav.link(
          `(test)`,
          () => {
            State.variables.gUnit_key = setup.rng.choice(
              State.variables.company.player.getUnits({
                job: setup.job.slaver,
              }),
            ).key;
            State.variables.gDebugLiving_key = props.living.key;
          },
          "LivingDebugDo",
        )}
        {domCardName(props.living)}
      </div>
      <div>
        <RestrictionsCard
          restrictions={props.living.getUnitRestrictions()}
          obj={null}
          is_show_all={true}
        />
      </div>
      <div>
        {getPrefs().positive.map((trait) => trait.repJSX())}
        {getPrefs().negative.map((trait) => trait.repNegativeJSX())}
      </div>
    </div>
  );
};

export default {
  living(living: Living): DOM.Attachable {
    return setup.DOM.renderComponent(LivingCard, { living });
  },
};
