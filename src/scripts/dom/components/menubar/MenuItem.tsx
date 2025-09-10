import {
  createContext,
  createSignal,
  Show,
  useContext,
  type JSX,
} from "solid-js";
import { MenuFilter, type MenuKey } from "../../../classes/filter/_filter";
import { TweeSpan } from "../common";

export interface MenuItemProps {
  /** Text label for the item */
  text: JSX.Element;
  /** Callback executed when item is clicked */
  callback?: (ev: MouseEvent) => unknown;
  /** Additional CSS class(es) to add to this menu item */
  cssclass?: string;
  /** If not undefined, will render a checkbox, checked or unchecked depending on the truthiness of the value  */
  checked?: boolean;
  /** If true, will open on click instead of on hover */
  clickonly?: boolean;
  /** The submenus (if any) */
  children?: JSX.Element | (() => JSX.Element);
  tooltip?: string;
  /** If true, won't automatically close once an option has been clicked. */
  is_no_close?: boolean;
}

const MenuItemContext = createContext<{ close?: () => void }>({});

/**
 * Component to generate the DOM structure for a menu
 * using the CSS classes at "menu.css"
 */
export const MenuItem: Component<MenuItemProps> = (props) => {
  const context = useContext(MenuItemContext);

  const [getIsOpen, setIsOpen] = createSignal(false);

  let elemRef = undefined as HTMLDivElement | undefined;
  let navRef = undefined as HTMLElement | undefined;

  const onMouseEnter = (ev: MouseEvent) => {
    if (getIsOpen()) return;

    if (!props.clickonly) {
      setIsOpen(true);
    }

    if (elemRef && navRef) {
      // if submenu would overflow the window right border, open it to the left
      const div_bounds = elemRef.getBoundingClientRect();
      const nav_bounds = navRef.getBoundingClientRect();
      if (div_bounds.right + nav_bounds.width > 0.95 * window.innerWidth) {
        elemRef.classList.add("menu-left");
      } else {
        elemRef.classList.remove("menu-left");
      }

      // if menu was closed (an item was clicked, reopen it)
      if (!props.clickonly && navRef.style.display) {
        navRef.style.display = "";
      }
    }
  };

  const onMouseLeave = (ev: MouseEvent) => {
    if (!getIsOpen()) return;

    if (!props.clickonly) {
      setIsOpen(false);
    }
  };

  const onClick = (ev: MouseEvent) => {
    ev.preventDefault();

    if (props.clickonly) {
      if (getIsOpen())
        // the $(window).one("click", ...) will handle the click
        return;

      const parent = (ev.currentTarget as HTMLElement).closest(
        ".menu-clickonly",
      );
      const nav = parent && parent.children[1];
      if (nav instanceof HTMLElement) {
        setIsOpen(true);
        setTimeout(function () {
          $(window).one("click", function (ev) {
            setIsOpen(false);
          });
        }, 1);
      }
    }

    if (props.callback) {
      if (!props.is_no_close) {
        // force-close the menu
        context.close?.();
      }

      props.callback(ev);
    }
  };

  return (
    <div
      ref={elemRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      classList={{
        "menu-clickonly": props.clickonly,
        [props.cssclass || ""]: true,
      }}
    >
      <header
        data-tooltip={props.tooltip ? props.tooltip : undefined}
        onMouseDown={(ev) => {
          // prevent from gaining focus
          ev.preventDefault();
        }}
        onClick={onClick}
      >
        <Show when={props.checked !== undefined}>
          <i
            class={props.checked ? "icon-checkbox checked" : "icon-checkbox"}
          />
        </Show>

        <span>
          {typeof props.text === "string" ? (
            <TweeSpan>{props.text}</TweeSpan>
          ) : (
            props.text
          )}
        </span>
      </header>

      <Show when={props.children}>
        <nav ref={navRef} style={{ display: getIsOpen() ? undefined : "none" }}>
          <Show when={getIsOpen()}>
            <MenuItemContext.Provider
              value={{
                close() {
                  setIsOpen(false);
                  context.close?.();
                },
              }}
            >
              <Show
                when={typeof props.children === "function"}
                fallback={props.children as DOM.JSXElement}
              >
                {(props.children as () => DOM.JSXElement)()}
              </Show>
            </MenuItemContext.Provider>
          </Show>
        </nav>
      </Show>
    </div>
  );
};

export const MenuItemTitle: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} cssclass="submenu-filter-title" />;
};

export const MenuItemText: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} cssclass="submenu-filter-text" />;
};

export const MenuItemDanger: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} cssclass="submenu-danger" />;
};

export const MenuItemAction: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} cssclass="submenu-action" />;
};

export const MenuItemActionOrText: Component<MenuItemProps> = (props) => {
  return (
    <MenuItem
      {...props}
      cssclass={props.callback ? "submenu-action" : "submenu-filter-text"}
    />
  );
};

export const MenuItemValue: Component<MenuItemProps> = (props) => {
  return <MenuItem {...props} cssclass="submenu-value" />;
};

export const MenuItemExtras: Component<Omit<MenuItemProps, "text">> = (
  props,
) => {
  return (
    <MenuItem
      {...props}
      clickonly={true}
      text={<i class="sfa sfa-ellipsis-v" />}
    />
  );
};

export const MenuItemToolbar: Component<ParentProps> = (props) => {
  return <div class="menu toolbar">{props.children}</div>;
};

/**
 * Return menu filter as this checked.
 * If the value is something other than default, will remove the checked.
 */
export const MenuItemMenuChecked: Component<{
  menu: MenuKey;
  filter_key: string;
  on_change_callback: () => void;
  tooltip?: string;
}> = (props) => {
  const menu_parsed = MenuFilter.getMenus(props.menu);

  const getCurrentValue = () =>
    State.variables.menufilter.get(props.menu, props.filter_key);

  return (
    <MenuItemAction
      text={menu_parsed[props.menu]![props.filter_key].title}
      checked={!getCurrentValue()}
      tooltip={props.tooltip}
      callback={() => {
        if (getCurrentValue()) {
          State.variables.menufilter.set(props.menu, props.filter_key, null);
        } else {
          const options = menu_parsed[props.menu]![props.filter_key].options;
          State.variables.menufilter.set(
            props.menu,
            props.filter_key,
            Array.isArray(options) ? options[0] : Object.keys(options)[0],
          );
        }
        props.on_change_callback();
      }}
    />
  );
};
