import { For, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { Message, Twee } from "../components/common";
import { CostsCard } from "./cost";

/**
 * Explain a restriction array, with optional unit/quest to supply to it
 * <<requirementcard>>
 *
 * @param Ws_show_all - Whether to show all restrictions, instead of hiding satisfied ones
 */
export function RestrictionsCard<T>(props: {
  restrictions: readonly Restriction<T>[];
  obj?: T;
  is_show_all?: boolean;
}): JSX.Element {
  return (
    <div>
      <Show
        when={
          props.obj instanceof setup.Unit &&
          props.obj.isDefiant() &&
          !setup.RestrictionLib.isRestrictionsAllowDefiant(props.restrictions)
        }
      >
        <span class="restrictioncard">
          {(props.obj as Unit).repJSX()} is{" "}
          {setup.DOM.Text.dangerlite("defiant")}
        </span>
      </Show>

      <For each={props.restrictions}>
        {(restriction) => (
          <Show when={props.is_show_all || !restriction.isOk(props.obj as any)}>
            <span class="restrictioncard">
              {" "}
              <Twee>{restriction.explain(props.obj)}</Twee>
            </span>
          </Show>
        )}
      </For>

      <Show when={!props.is_show_all && props.restrictions.length}>
        <Message label="(all requirements)">
          <CostsCard costs={props.restrictions} obj={props.obj as any} />
        </Message>
      </Show>
    </div>
  );
}

function restriction<T>(
  restrictions: readonly Restriction<T>[],
  obj: T,
  is_show_all?: boolean,
): DOM.Attachable;

function restriction(
  restrictions: readonly Restriction<undefined>[],
  obj?: undefined,
  is_show_all?: boolean,
): DOM.Attachable;

function restriction<T>(
  restrictions: readonly Restriction<T>[],
  obj: T,
  is_show_all?: boolean,
): DOM.Attachable {
  return setup.DOM.renderComponent(RestrictionsCard, {
    restrictions,
    obj,
    is_show_all,
  });
}

export default { restriction };
