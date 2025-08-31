import { createSignal, For, Show } from "solid-js";
import type { BanterInstance } from "../../../classes/banter/BanterInstance";
import { BanterCard } from "../../card/BanterCard";
import { Link } from "../../components/common";

const WeekEndBanters: Component<{ banters: BanterInstance[] }> = (props) => {
  const [getShowBanters, setShowBanters] = createSignal(
    !setup.globalsettings.endweek_hide_banters,
  );

  return (
    <div>
      <div>
        <Link
          onClick={() => {
            setup.globalsettings.endweek_hide_banters =
              !setup.globalsettings.endweek_hide_banters;

            setShowBanters(!setup.globalsettings.endweek_hide_banters);
          }}
        >
          {getShowBanters() ? `Hide Banters` : `Show Banters`}
        </Link>
      </div>

      <Show when={getShowBanters() && props.banters.length}>
        <For each={props.banters}>
          {(banter) => (
            <div>
              <BanterCard banter={banter} />
            </div>
          )}
        </For>
        <hr />
      </Show>
    </div>
  );
};

export function showWeekendBanters(): DOM.Attachable {
  const banters: BanterInstance[] = [];

  // perform the random banters
  for (const unit of State.variables.company.player.getUnits({
    job: setup.job.slaver,
  })) {
    const banter = setup.BanterHelper.doBanter(unit);

    // sometimes no banter is done, so check if a banter was actually done
    if (banter) {
      banters.push(banter);
    }
  }

  let return_value: DOM.Attachable = null;

  // show the banters if you have built the morale office
  if (
    State.variables.fort.player.isHasBuilding(
      setup.buildingtemplate.moraleoffice,
    )
  ) {
    return_value = setup.DOM.renderComponent(WeekEndBanters, { banters });
  }

  State.variables.friendship.advanceWeek();
  return return_value;
}
