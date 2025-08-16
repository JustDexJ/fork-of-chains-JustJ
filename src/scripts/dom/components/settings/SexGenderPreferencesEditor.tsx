import { createSignal, Show } from "solid-js";
import {
  type SexgenderDistribution,
  type SexgenderKey,
} from "../../../classes/Settings";
import { SEXGENDERS } from "../../../data/sexgenders";
import { Twee } from "../common";
import "./SexGenderPreferencesEditor.css";

const TARGETS = [
  ["$settings.gender_preference.slave", "Slave"],
  ["$settings.gender_preference.slaver", "Slaver"],
  ["$settings.other_gender_preference", "Other (NPCs, etc.)"],
];

function initDistributions() {
  const distributions: Record<string, SexgenderDistribution> = {};
  for (const [target, varname] of TARGETS) {
    let distr = State.getVar(varname) as SexgenderDistribution | undefined;
    if (distr) {
      distr = { ...distr };
    } else {
      distr = { male: 0.5, female: 0.5 };
    }
    distributions[target] = distr;
  }
  return distributions;
}

export const SexGenderPreferencesEditor: Component = () => {
  const [getDistributions, setDistributions] =
    createSignal<Record<string, SexgenderDistribution>>(initDistributions());

  const SEXGENDERS_KEYS = objectKeys(SEXGENDERS);

  const setRatio = (
    target: string,
    sexgender: SexgenderKey,
    new_ratio_value: number,
  ) => {
    const distributions = getDistributions();
    const old_distr = distributions[target];
    const new_distr: SexgenderDistribution = {
      ...old_distr,
      [sexgender]: new_ratio_value,
    };

    const idx = SEXGENDERS_KEYS.findIndex((it) => it === sexgender);

    const to_reassign = SEXGENDERS_KEYS.filter((_, i) => i !== idx);
    let rem = 1 - new_ratio_value;
    if (new_ratio_value > (old_distr[sexgender] ?? 0)) {
      while (to_reassign.length) {
        const old_ratio = old_distr[to_reassign[0]] ?? 0;
        if (old_ratio <= rem) {
          rem -= old_ratio;
          to_reassign.shift();
        } else {
          break;
        }
      }
    }

    if (to_reassign.length) {
      const sum = to_reassign.reduce(
        (sum, it) => sum + (old_distr[it] || 0),
        0,
      );

      for (const it of to_reassign) {
        const old_ratio = old_distr[it] || 0;
        const normalized_ratio =
          sum > 0 ? old_ratio / sum : 1 / to_reassign.length;
        new_distr[it] = rem * normalized_ratio;
      }
    }

    setDistributions({
      ...distributions,
      [target]: new_distr,
    });

    State.setVar(target, new_distr);
  };

  //setup.SETTINGS_GENDER_PREFERENCE,
  return (
    <>
      <div>
        Unit gender preferences (can also be changed later in the game):
        {/*<message '(?)'>
      <div class='helpcard'>
        You can use this option to adjust the how often units of certain gender will be encountered in the game.
      </div>
    </message>*/}
        <div
          class="SexGenderPreferencesEditor-table"
          style={{
            "grid-template-columns": `auto auto auto auto auto repeat(${TARGETS.length}, 1fr)`,
          }}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          {TARGETS.map(([, target_label]) => (
            <div class="SexGenderPreferencesEditor-slider">{target_label}</div>
          ))}

          {SEXGENDERS_KEYS.map((sexgender) => (
            <>
              <div>
                <span>{SEXGENDERS[sexgender].name}</span>
              </div>
              <span>
                <Show when={SEXGENDERS[sexgender].dick}>
                  <Twee code={setup.trait.dick_medium.rep()} />
                </Show>
              </span>
              <span>
                <Show when={SEXGENDERS[sexgender].vagina}>
                  <Twee code={setup.trait.vagina_loose.rep()} />
                </Show>
              </span>
              <span>
                <Show when={SEXGENDERS[sexgender].breast}>
                  <Twee code={setup.trait.breast_medium.rep()} />
                </Show>
              </span>
              <span>
                <Twee
                  code={setup.trait[
                    SEXGENDERS[sexgender].gender_trait_key
                  ].rep()}
                />
              </span>
              {TARGETS.map(([target]) => (
                <div class="SexGenderPreferencesEditor-slider">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={100 * (getDistributions()[target][sexgender] ?? 0)}
                    onInput={(ev) =>
                      setRatio(target, sexgender, +ev.currentTarget.value / 100)
                    }
                  />
                  <div
                    class="SexGenderPreferencesEditor-percent"
                    style={{
                      opacity: !(getDistributions()[target][sexgender] ?? 0)
                        ? 0.3
                        : undefined,
                    }}
                  >
                    {Math.round(
                      100 * (getDistributions()[target][sexgender] ?? 0),
                    )}
                    %
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
};
