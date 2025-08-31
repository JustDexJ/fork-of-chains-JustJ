import { createSignal, For, Show } from "solid-js";
import {
  BuildingTemplateCard,
  BuildingTemplateCompactCard,
} from "../card/BuildingCards";
import { CompanyCard, CompanyCompactCard } from "../card/CompanyCard";
import {
  ActivityTemplateCard,
  EventTemplateCard,
  InteractionTemplateCard,
  OpportunityTemplateCard,
  QuestTemplateCard,
} from "../card/ContentTemplateCard";
import { EquipmentCard, EquipmentCompactCard } from "../card/EquipmentCard";
import { ItemCard, ItemCompactCard } from "../card/ItemCard";
import { LivingCard } from "../card/LivingCard";
import { LoreCard, LoreCompactCard } from "../card/LoreCard";
import { RoomTemplateCard, RoomTemplateCompactCard } from "../card/RoomCards";
import { SexActionCard, SexActionCompactCard } from "../card/SexActionCard";
import {
  FilterableList,
  type FilterableListProps,
  type ObjectWithKey,
} from "./misc/FilterableList";

export interface Section<T extends ObjectWithKey, D = T> {
  title: string;
  get_objects: () => readonly T[];
  get_display_object?: (obj: T) => D;

  menu: FilterableListProps<T, D>["menu"];
  display_callback: FilterableListProps<T, D>["display_callback"];
  style_override?: FilterableListProps<T, D>["style_override"];
}

function wikiSection<T extends ObjectWithKey, D = T>(args: Section<T, D>) {
  return args;
}

const WIKI_SECTIONS = [
  wikiSection({
    title: "Quests",
    menu: "questtemplate",
    get_objects: () => Object.values(setup.questtemplate),
    display_callback(quest_template) {
      return <QuestTemplateCard template={quest_template} />;
    },
  }),
  wikiSection({
    title: "Opportunities",
    menu: "opportunitytemplate",
    get_objects: () => Object.values(setup.opportunitytemplate),
    display_callback(opportunity_template) {
      return <OpportunityTemplateCard template={opportunity_template} />;
    },
  }),

  wikiSection({
    title: "Events",
    menu: "event",
    get_objects: () => Object.values(setup.event),
    display_callback(event) {
      return <EventTemplateCard template={event} />;
    },
  }),

  wikiSection({
    title: "Interactions",
    menu: "interaction",
    get_objects: () => Object.values(setup.interaction),
    display_callback(interaction) {
      return <InteractionTemplateCard template={interaction} />;
    },
  }),

  wikiSection({
    title: "Activities",
    menu: "activitytemplate",
    get_objects: () => Object.values(setup.activitytemplate),
    display_callback(template) {
      return <ActivityTemplateCard template={template} />;
    },
  }),

  wikiSection({
    title: "Traits",
    menu: "trait",
    get_objects: () => Object.values(setup.trait),
    style_override:
      "display: grid; grid-template-columns: repeat(auto-fill, minmax(34px, 1fr))",
    display_callback(trait) {
      return trait.repJSX();
    },
  }),

  wikiSection({
    title: "Items and Furniture",
    menu: "item",
    get_objects: () => Object.values(setup.item),
    get_display_object: (item) => ({ item: item, quantity: 1 }),
    display_callback(item_obj, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<ItemCard item={item_obj.item} />}
        >
          <ItemCompactCard item={item_obj.item} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Equipments",
    menu: "equipment",
    get_objects: () => Object.values(setup.equipment),
    display_callback(equipment_obj, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<EquipmentCard equipment={equipment_obj} />}
        >
          <EquipmentCompactCard equipment={equipment_obj} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Buildings",
    menu: "buildingtemplate",
    get_objects: () => Object.values(setup.buildingtemplate),
    display_callback(buildingtemplate, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<BuildingTemplateCard template={buildingtemplate} />}
        >
          <BuildingTemplateCompactCard template={buildingtemplate} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Rooms",
    menu: "roomtemplate",
    get_objects: () => Object.values(setup.roomtemplate),
    display_callback(roomtemplate, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<RoomTemplateCard template={roomtemplate} />}
        >
          <RoomTemplateCompactCard template={roomtemplate} />
        </Show>
      );
    },
  }),

  wikiSection<any, any>({
    title: "Sex Actions",
    menu: "sexaction",
    get_objects: () => setup.sexaction.filter((action) => action.desc()),
    display_callback(sexaction, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<SexActionCard action={sexaction} />}
        >
          <SexActionCompactCard action={sexaction} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Companies",
    menu: "company",
    get_objects: () => Object.values(State.variables.company),
    display_callback(company, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<CompanyCard company={company} />}
        >
          <CompanyCompactCard company={company} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Lore",
    menu: "lore",
    get_objects: () => Object.values(setup.lore),
    display_callback(lore, getDisplayMode) {
      return (
        <Show
          when={getDisplayMode() === "compact"}
          fallback={<LoreCard lore={lore} />}
        >
          <LoreCompactCard lore={lore} />
        </Show>
      );
    },
  }),

  wikiSection({
    title: "Duties",
    menu: "dutytemplate",
    get_objects: () => Object.values(setup.dutytemplate),
    display_callback(duty_template) {
      return (
        <>
          {setup.DutyTemplate.getTypeRep(duty_template.getType())}
          {setup.DOM.Util.domCardName(duty_template)}
        </>
      );
    },
  }),

  wikiSection({
    title: "Living",
    menu: "living",
    get_objects: () => Object.values(setup.living),
    display_callback(living) {
      return <LivingCard living={living} />;
    },
  }),

  wikiSection({
    title: "Titles",
    menu: "title",
    get_objects: () => Object.values(setup.title),
    display_callback(title) {
      return title.repJSX();
    },
  }),
] as const;

function renderSection<T extends ObjectWithKey, D = T>(section: Section<T, D>) {
  const objects = section.get_objects();

  return (
    <FilterableList
      menu={section.menu}
      filter_objects={objects}
      style_override={section.style_override}
      display_objects={
        section.get_display_object
          ? objects.map(section.get_display_object)
          : undefined
      }
      display_callback={section.display_callback}
    />
  );
}

let lastWikiSection: number | null = null;

export const IngameWiki: Component = () => {
  const [getSection, setSection] = createSignal<number | null>(lastWikiSection);
  return (
    <>
      <For each={WIKI_SECTIONS}>
        {(section, i) => {
          return (
            <>
              {i() > 0 && " · "}
              <a
                style={
                  i() === getSection()
                    ? { color: "cyan", "text-decoration": "underline" }
                    : undefined
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  lastWikiSection = i();
                  setSection(i());
                }}
              >
                {section.title}
              </a>
            </>
          );
        }}
      </For>

      <hr />

      <Show when={getSection() !== null}>
        <div>{renderSection(WIKI_SECTIONS[getSection()!] as any)}</div>
      </Show>
    </>
  );
};
