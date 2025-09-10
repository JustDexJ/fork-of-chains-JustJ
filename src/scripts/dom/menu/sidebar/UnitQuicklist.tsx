import { createMemo } from "solid-js";
import { FilterableList } from "../../components/misc/FilterableList";

/**
 * Display list of units on the right sidebar on wide screens.
 */
export const UnitQuicklist: Component = (props) => {
  const getUnits = createMemo(() => {
    const units = State.variables.company.player.getUnits({});

    // put slavers on top
    units.sort((a, b) => {
      if (a.isSlaver() && !b.isSlaver()) return -1;
      if (b.isSlaver() && !a.isSlaver()) return 1;
      return a.getName().localeCompare(b.getName());
    });

    return units;
  });

  return (
    <FilterableList
      menu="unitquick"
      filter_objects={getUnits()}
      display_callback={(unit) => (
        <div
          classList={{
            "UnitQuicklist-unit": true,
            [`UnitQuicklist-unit-${unit.busyInfo().state}`]: true,
          }}
        >
          <header data-tooltip={`<<tooltipunitstatus '${unit.key}'>>`} />
          <span>{unit.repLongJSX(undefined, true, true)}</span>
          <span>
            {unit.busyInfo().state !== "idle"
              ? unit.repBusyStateJSX(/* duty = */ true)
              : null}
            {unit.getSubrace().repJSX()}
          </span>
        </div>
      )}
    />
  );
};
