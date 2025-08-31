import { FilterableList } from "../components/misc/FilterableList";

interface TraitPickerArgs<IsMulti extends boolean> {
  raw_traits: Trait[];
  init_selected?: Trait[];
  /** optional, if given then there willl be a confirm button. */
  finish_callback?: (traits: IsMulti extends true ? Trait[] : Trait) => void;
  /** optional, called everytime the selection changes */
  on_change_callback?: (traits: Trait[]) => void;
  is_multiple?: boolean;
  no_overlap?: boolean;
}

/**
 * Traits picker
 */
function doTraitPick<IsMulti extends boolean>({
  raw_traits,
  init_selected,
  finish_callback,
  is_multiple,
  no_overlap,
  on_change_callback,
}: TraitPickerArgs<IsMulti>): DOM.Node {
  const traits = raw_traits.filter((a) => true);

  const timestamp = +new Date();
  const divid1 = `traitselectordiv1${timestamp}`;
  const divid2 = `traitselectordiv2${timestamp}`;

  let selected: Trait[] = init_selected ?? [];

  function callback(my_trait: Trait) {
    return () => {
      if (!is_multiple) {
        finish_callback?.(my_trait as any);
      } else {
        if (selected.includes(my_trait)) {
          selected.splice(selected.indexOf(my_trait), 1);
        } else {
          // remove overlapping trait
          if (no_overlap && my_trait.getTraitGroup()) {
            const to_remove = selected.filter(
              (trait) => trait.getTraitGroup() == my_trait.getTraitGroup(),
            );
            for (const trait of to_remove) {
              if (selected.includes(trait)) {
                selected.splice(selected.indexOf(trait), 1);
              }
            }
          }

          selected.push(my_trait);
        }
        if (on_change_callback) {
          on_change_callback(selected);
        }
        setup.DOM.refresh(`#${divid1}`);
        setup.DOM.refresh(`#${divid2}`);
      }
    };
  }

  const all_fragments = [];
  let filter_value = "";

  if (is_multiple) {
    all_fragments.push(
      setup.DOM.createRefreshable("div", { id: divid1 }, () => {
        const fragments: DOM.Attachable[] = [];

        {
          /* selected traits */
          fragments.push(html` <div>Selected: ${selected.length}</div> `);

          const traitreps = [];
          for (const trait of selected) {
            traitreps.push(
              setup.DOM.create(
                "div",
                { style: "margin: 0 4px; cursor: pointer" },
                setup.DOM.Util.onEvent(
                  "click",
                  trait.rep(true),
                  callback(trait),
                ),
              ),
            );
          }

          fragments.push(
            setup.DOM.create(
              "div",
              {
                style: "display: flex; flex-wrap: wrap",
              },
              traitreps,
            ),
          );

          if (!traitreps.length) {
            fragments.push(html`<div>(none)</div>`);
          }
        }
        return setup.DOM.create("div", {}, fragments);
      }),
    );

    const button_fragments = [];
    button_fragments.push(
      setup.DOM.Nav.link("(Clear)", () => {
        selected.splice(0, selected.length);
        if (on_change_callback) {
          on_change_callback(selected);
        }
        setup.DOM.refresh(`#${divid1}`);
        setup.DOM.refresh(`#${divid2}`);
      }),
    );

    if (finish_callback) {
      button_fragments.push(
        setup.DOM.Nav.button("Confirm", () => {
          finish_callback(selected as any);
        }),
      );
    }
    all_fragments.push(setup.DOM.create("div", {}, button_fragments));

    all_fragments.push(html`<hr />`);
  }

  /*
  {  // filter
    all_fragments.push(html`
      <div>
        Search by name:
        ${twee`<<textbox '_devtraitpickerfilter_dummy' ''>>`}
        ${setup.DOM.Nav.button('Search', () => {
          filter_value = State.temporary.devtraitpickerfilter_dummy || ''
          filter_value = filter_value.trim().toLowerCase()
          setup.DOM.refresh(`#${divid2}`)
        })}
      </p>
    `)
  }
  */
  if (is_multiple) {
    all_fragments.push(html`
      <div>Click on a trait to add it to selection:</div>
    `);
  }

  all_fragments.push(
    setup.DOM.createRefreshable("div", { id: divid2 }, () => {
      return setup.DOM.renderComponent(FilterableList, {
        menu: "trait" as const,
        filter_objects: traits,
        style_override:
          "display: grid; grid-template-columns: repeat(auto-fill, minmax(34px, 1fr))",
        display_callback: (trait) => {
          return setup.DOM.create(
            "div",
            { style: "cursor: pointer" },
            setup.DOM.Util.onEvent(
              "click",
              selected.includes(trait)
                ? trait.repPositive(true)
                : trait.rep(true),
              callback(trait),
            ),
          );
        },
      });
    }),
  );

  return setup.DOM.create("div", {}, all_fragments);
}

/**
 * Traits picker
 */
export const DOM_Menu_traitpickermulti = function ({
  raw_traits,
  init_selected,
  finish_callback,
  no_overlap,
  on_change_callback,
}: TraitPickerArgs<true>): DOM.Node {
  return doTraitPick<true>({
    raw_traits: raw_traits,
    init_selected: init_selected,
    finish_callback: finish_callback,
    is_multiple: true,
    no_overlap: no_overlap,
    on_change_callback: on_change_callback,
  });
};

/**
 * Traits picker
 */
export const DOM_Menu_traitpickersingle = function ({
  raw_traits,
  finish_callback,
}: TraitPickerArgs<false>): DOM.Node {
  return doTraitPick<false>({
    raw_traits: raw_traits,
    init_selected: [],
    finish_callback: finish_callback,
    is_multiple: false,
  });
};
