import { Show } from "solid-js";
import type { BuildingInstance } from "../../classes/BuildingInstance";
import type { BuildingTemplate } from "../../classes/BuildingTemplate";
import { Message, Twee } from "../components/common";
import {
  MenuItemAction,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./CostsCard";
import { RestrictionsCard } from "./RestrictionsCard";

export const BuildingTemplateNameFragment: Component<{
  template: BuildingTemplate;
}> = (props) => {
  return (
    <>
      {setup.TagHelper.getTagsRep("buildingtemplate", props.template.getTags())}
      {domCardRep(props.template)}
    </>
  );
};

export const BuildingTemplateDescriptionFragment: Component<{
  template: BuildingTemplate;
}> = (props) => {
  return <Twee>{props.template.getDescription()}</Twee>;
};

const BuildingNameFragment: Component<{ building: BuildingInstance }> = (
  props,
) => {
  return (
    <span>
      {setup.TagHelper.getTagsRep(
        "buildinginstance",
        props.building.getTemplate().getTags(),
      )}

      <Show when={props.building.getTemplate().getMaxLevel() > 1}>
        {setup.DOM.Util.level(props.building.getLevel())} /{" "}
        {props.building.getTemplate().getMaxLevel()}
      </Show>

      {domCardRep(props.building)}
    </span>
  );
};

const BuildingInstanceNameActionMenu: Component<{
  building: BuildingInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={<BuildingNameFragment building={props.building} />}
      />

      <Show when={props.show_actions && props.building.isHasUpgrade()}>
        <Show
          when={props.building.isUpgradable()}
          fallback={<MenuItemText text="Cannot upgrade" />}
        >
          <MenuItemAction
            text="Upgrade"
            tooltip="Upgrade this improvement, potentially getting a new room to place"
            callback={() => {
              const room = props.building.getUpgradeRoom();
              if (room) {
                State.variables.gFortGridBuildRoomKey = room.key;
                delete setup.gFortGridControl;
                setup.DOM.Nav.goto("FortGridBuild");
              } else {
                props.building.upgrade();
                setup.DOM.Nav.goto();
              }
            }}
          />

          <MenuItemAction
            text="Upgrade and auto-place"
            tooltip="Upgrade this improvement and automatically place its room (if any) on the fort"
            callback={() => {
              const room = props.building.getUpgradeRoom();
              if (!room || State.variables.fortgrid.placeAnywhere(room)) {
                props.building.upgrade(room);
                setup.DOM.Nav.goto();
              } else {
                if (room) {
                  room.delete();
                }
                setup.DOM.Nav.goto();
              }
            }}
          />
        </Show>
      </Show>

      <Show when={props.building.isHasUpgrade()}>
        <Show when={props.building.getUpgradeCost().length}>
          <MenuItemText
            text={<CostsCard costs={props.building.getUpgradeCost()} />}
          />
        </Show>

        <Show when={props.building.getTemplate().getSubRoomTemplate()}>
          <MenuItemText
            text={props.building
              .getTemplate()
              .getSubRoomTemplate()!
              .repFullJSX()}
          />
        </Show>
      </Show>
    </MenuItemToolbar>
  );
};

const BuildingDescriptionFragment: Component<{
  building: BuildingInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <Show
      when={
        props.show_actions &&
        State.variables.menufilter.get("buildinginstance", "display") == "short"
      }
      fallback={<Twee>{props.building.getTemplate().getDescription()}</Twee>}
    >
      <Message label="(description)">
        <Twee>{props.building.getTemplate().getDescription()}</Twee>
      </Message>
    </Show>
  );
};

const BuildingTemplateNameActionMenu: Component<{
  template: BuildingTemplate;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={<BuildingTemplateNameFragment template={props.template} />}
      />
      <Show
        when={
          props.show_actions &&
          !State.variables.fort.player.isHasBuilding(props.template)
        }
      >
        <Show
          when={props.template.isBuildable()}
          fallback={<MenuItemText text="Not buildable" />}
        >
          <MenuItemAction
            text="Build"
            tooltip="Build this improvement and place its room on the fort"
            callback={() => {
              const room = State.variables.fort.player.getBuildRoom(
                props.template,
              );
              if (room) {
                State.variables.gFortGridBuildRoomKey = room.key;
                delete setup.gFortGridControl;
                setup.DOM.Nav.goto("FortGridBuild");
              } else {
                State.variables.fort.player.build(props.template);
                setup.DOM.Nav.goto();
              }
            }}
          />
          <MenuItemAction
            text="Build and auto-place"
            tooltip="Build this improvement and automatically place its room somewhere on the fort"
            callback={() => {
              const room = State.variables.fort.player.getBuildRoom(
                props.template,
              );
              if (!room || State.variables.fortgrid.placeAnywhere(room)) {
                State.variables.fort.player.build(props.template, room);
                setup.DOM.Nav.goto();
              } else {
                if (room) {
                  room.delete();
                }
                setup.DOM.Nav.goto();
              }
            }}
          />
        </Show>

        <MenuItemText text={<CostsCard costs={props.template.getCost(0)} />} />

        <Show when={props.template.getMainRoomTemplate()}>
          <MenuItemText
            text={props.template.getMainRoomTemplate().repFullJSX()}
          />
        </Show>
      </Show>
      const extras = [];
      <Show
        when={
          props.show_actions &&
          State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.greathall,
          )
        }
      >
        <MenuItemExtras>
          <MenuItemAction
            text="Hidden"
            checked={State.variables.fort.player.isTemplateIgnored(
              props.template,
            )}
            callback={() => {
              if (
                State.variables.fort.player.isTemplateIgnored(props.template)
              ) {
                State.variables.fort.player.unignoreTemplate(props.template);
              } else {
                State.variables.fort.player.ignoreTemplate(props.template);
              }
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const BuildingTemplateCompactCard = BuildingTemplateNameActionMenu;

export const BuildingTemplateCard: Component<{
  template: BuildingTemplate;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div
      class={
        props.show_actions && !props.template.isBuildable()
          ? `card buildingtemplatebadcard`
          : `card buildingtemplatecard`
      }
    >
      <BuildingTemplateNameActionMenu {...props} />

      <Show when={props.template.getPrerequisite(0).length}>
        <RestrictionsCard restrictions={props.template.getPrerequisite(0)} />
      </Show>

      <BuildingTemplateDescriptionFragment template={props.template} />
    </div>
  );
};

export const BuildingInstanceCompactCard = BuildingInstanceNameActionMenu;

export const BuildingInstanceCard: Component<{
  building: BuildingInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card buildingcard">
      <BuildingInstanceNameActionMenu
        building={props.building}
        show_actions={props.show_actions}
      />

      <Show when={props.building.isHasUpgrade()}>
        <div>
          <Show when={props.building.getUpgradePrerequisite().length}>
            <RestrictionsCard
              restrictions={props.building.getUpgradePrerequisite()}
            />
          </Show>
        </div>
      </Show>

      <BuildingDescriptionFragment
        building={props.building}
        show_actions={props.show_actions}
      />
    </div>
  );
};

export default {
  buildingtemplate(
    template_or_key: BuildingTemplate | BuildingTemplate["key"],
    show_actions?: boolean,
  ): DOM.Node {
    const template = resolveObject(template_or_key, setup.buildingtemplate);
    return setup.DOM.renderComponent(BuildingTemplateCard, {
      template,
      show_actions,
    });
  },

  buildingtemplatecompact(template: BuildingTemplate, show_actions?: boolean) {
    return setup.DOM.renderComponent(BuildingTemplateNameActionMenu, {
      template,
      show_actions,
    });
  },

  buildinginstance(
    building_or_key: BuildingInstance | BuildingInstance["key"],
    show_actions?: boolean,
  ) {
    const building = resolveObject(
      building_or_key,
      State.variables.buildinginstance,
    );
    return setup.DOM.renderComponent(BuildingInstanceCard, {
      building,
      show_actions,
    });
  },

  buildinginstancecompact(
    building: BuildingInstance,
    show_actions?: boolean,
  ): DOM.Node {
    return setup.DOM.renderComponent(BuildingInstanceNameActionMenu, {
      building,
      show_actions,
    });
  },
};
