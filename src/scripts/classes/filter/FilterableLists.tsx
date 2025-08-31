import { Match, Show, Switch } from "solid-js";
import {
  BuildingInstanceCard,
  BuildingInstanceCompactCard,
  BuildingTemplateCard,
  BuildingTemplateCompactCard,
} from "../../dom/card/building";
import { CompanyCard, CompanyCompactCard } from "../../dom/card/company";
import { ContactCard, ContactCompactCard } from "../../dom/card/contact";
import { DutyInstanceCard, DutyInstanceCompactCard } from "../../dom/card/duty";
import { EquipmentCard, EquipmentCompactCard } from "../../dom/card/equipment";
import {
  EquipmentSetCard,
  EquipmentSetCompactCard,
} from "../../dom/card/equipmentset";
import { ItemCard, ItemCompactCard } from "../../dom/card/item";
import { LoreCard, LoreCompactCard } from "../../dom/card/lore";
import { OpportunityInstanceCard } from "../../dom/card/opportunity";
import { PartyCard, PartyCompactCard } from "../../dom/card/party";
import { QuestCard, QuestCompactCard } from "../../dom/card/quest";
import { SexActionCard, SexActionCompactCard } from "../../dom/card/sexaction";
import {
  SlaveOrderCard,
  SlaveOrderCompactCard,
} from "../../dom/card/slaveorder";
import { TeamCard, TeamCompactCard } from "../../dom/card/team";
import {
  UnitActionCard,
  UnitActionCompactCard,
} from "../../dom/card/unitaction";
import { FilterableList } from "../../dom/components/misc/FilterableList";
import type { UnitAction } from "../unitaction/UnitAction";

export namespace FilterableLists {
  export function armory_equipments() {
    const display = State.variables.armory.getEquipments();
    const forfilter = display.map((a) => a[0]);
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="equipment"
        filter_objects={forfilter}
        display_objects={display}
        display_callback={(equipment_obj, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <EquipmentCard equipment={equipment_obj[0]} show_actions={true} />
            }
          >
            <EquipmentCompactCard
              equipment={equipment_obj[0]}
              show_actions={true}
            />
          </Show>
        )}
      />
    ));
  }

  export function armory_equipmentsets() {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="equipmentset"
        filter_objects={State.variables.armory.getEquipmentSets()}
        display_callback={(equipment_set, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <EquipmentSetCard
                equipment_set={equipment_set}
                show_actions={true}
              />
            }
          >
            <EquipmentSetCompactCard
              equipment_set={equipment_set}
              show_actions={true}
            />
          </Show>
        )}
      />
    ));
  }

  export function buildinginstances() {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="buildinginstance"
        filter_objects={State.variables.fort.player.getBuildings()}
        display_callback={(buildinginstance, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <BuildingInstanceCard
                building={buildinginstance}
                show_actions={true}
              />
            }
          >
            <BuildingInstanceCompactCard
              building={buildinginstance}
              show_actions={true}
            />
          </Show>
        )}
      />
    ));
  }

  export function buildingtemplates() {
    const forfilter = Object.values(setup.buildingtemplate).filter(
      (a) => !a.isHidden(),
    );

    forfilter.sort((a, b) => {
      const ba = a.isBuildable(0);
      const bb = b.isBuildable(0);
      if (ba && !bb) {
        return -1;
      }
      if (bb && !ba) {
        return 1;
      }
      return 0;
    });

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="buildingtemplate"
        filter_objects={forfilter}
        display_callback={(buildingtemplate, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <BuildingTemplateCard
                template={buildingtemplate}
                show_actions={true}
              />
            }
          >
            <BuildingTemplateCompactCard
              template={buildingtemplate}
              show_actions={true}
            />
          </Show>
        )}
      />
    ));
  }

  export function inventory() {
    const display = State.variables.inventory.getItems();
    const forfilter = display.map((a) => a.item);

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="item"
        filter_objects={forfilter}
        display_objects={display}
        display_callback={(item_obj, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<ItemCard item={item_obj.item} show_actions={true} />}
          >
            <ItemCompactCard item={item_obj.item} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function classroom() {
    const forfilter = setup.sexaction.filter((a) => a.isVisibleInClassroom());

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="sexaction"
        filter_objects={forfilter}
        display_callback={(sexaction, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<SexActionCard action={sexaction} show_actions={true} />}
          >
            <SexActionCompactCard action={sexaction} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function dutylist() {
    const dutylist = State.variables.dutylist
      .getDuties()
      .sort(setup.DutyInstance.cmp);

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="duty"
        filter_objects={dutylist}
        display_callback={(duty, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<DutyInstanceCard duty={duty} show_actions={true} />}
          >
            <DutyInstanceCompactCard duty={duty} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function lores() {
    const lores = Object.values(setup.lore).filter((a) => a.isVisible());

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="lore"
        filter_objects={lores}
        display_callback={(lore, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<LoreCard lore={lore} show_actions={true} />}
          >
            <LoreCompactCard lore={lore} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function slaveorders(show_actions = true) {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="slaveorder"
        filter_objects={State.variables.slaveorderlist.getSlaveOrders()}
        display_callback={(order, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <SlaveOrderCard slave_order={order} show_actions={show_actions} />
            }
          >
            <SlaveOrderCompactCard
              slave_order={order}
              show_actions={show_actions}
            />
          </Show>
        )}
      />
    ));
  }

  export function contacts() {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="contact"
        filter_objects={State.variables.contactlist.getContacts()}
        display_callback={(contact, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<ContactCard contact={contact} show_actions={true} />}
          >
            <ContactCompactCard contact={contact} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function teams() {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="team"
        filter_objects={State.variables.company.player.getTeams()}
        display_callback={(team, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<TeamCard team={team} show_actions={true} />}
          >
            <TeamCompactCard team={team} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function partylist() {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="party"
        filter_objects={State.variables.partylist.getParties()}
        display_callback={(party, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<PartyCard party={party} show_actions={true} />}
          >
            <PartyCompactCard party={party} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function companies() {
    const companies = Object.values(State.variables.company).filter(
      (c) =>
        c != State.variables.company.player &&
        State.variables.favor.isCompanyKnown(c),
    );
    companies.sort((a, b) => {
      return a.getName().localeCompare(b.getName());
    });

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="company"
        filter_objects={companies}
        display_callback={(company, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={<CompanyCard company={company} show_actions={true} />}
          >
            <CompanyCompactCard company={company} show_actions={true} />
          </Show>
        )}
      />
    ));
  }

  export function opportunities() {
    const opportunities = State.variables.opportunitylist.getOpportunities();

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="opportunity"
        filter_objects={opportunities}
        display_callback={(opp) => (
          <OpportunityInstanceCard opportunity={opp} show_actions={true} />
        )}
      />
    ));
  }

  export function unitactions(actions: UnitAction[], unit: Unit) {
    const tofilter: UnitAction[] = [];
    for (const _unitaction of actions) {
      if (!_unitaction.isHidden(unit) && _unitaction.isCanTrain(unit)) {
        tofilter.push(_unitaction);
      }
    }
    for (const _unitaction of actions) {
      if (!_unitaction.isHidden(unit) && !_unitaction.isCanTrain(unit)) {
        tofilter.push(_unitaction);
      }
    }

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="unitaction"
        filter_objects={tofilter}
        display_callback={(unitaction, getDisplayMode) => (
          <Show
            when={getDisplayMode() === "compact"}
            fallback={
              <UnitActionCard
                action={unitaction}
                unit={unit}
                show_actions={true}
              />
            }
          >
            <UnitActionCompactCard
              action={unitaction}
              unit={unit}
              show_actions={true}
            />
          </Show>
        )}
      />
    ));
  }

  export function questhub() {
    const quests = State.variables.company.player.getQuests();

    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu="quest"
        filter_objects={quests}
        display_callback={(quest, getDisplayMode) => (
          <Switch fallback={<QuestCard quest={quest} show_actions={true} />}>
            <Match when={getDisplayMode() === "compact"}>
              <QuestCompactCard quest={quest} show_actions={true} />
            </Match>
            <Match when={getDisplayMode() === "short"}>
              <QuestCompactCard quest={quest} show_actions={true} />
            </Match>
          </Switch>
        )}
      />
    ));
  }
}
