import type { QUEST_POOL_DEFINITIONS } from "../../data/questpools";
import { TwineClass } from "../_TwineClass";
import type { ContentTemplate } from "../content/ContentTemplate";
import type { Deck } from "../deck/Deck";
import type { Rarity } from "../deck/Rarity";
import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "../opportunity/OpportunityTemplate";
import type { Unit, UnitKey } from "../unit/Unit";
import type { QuestTemplate, QuestTemplateKey } from "./QuestTemplate";

interface AllQuestGeneratableRes {
  template: QuestTemplate | OpportunityTemplate;
  rarity: Rarity;
}

export interface QuestPoolDefinition {
  name: string;
}

export type QuestPoolKey = keyof typeof QUEST_POOL_DEFINITIONS;

/**
 * Represents a group of quest bases. Responsible for generating quests.
 * The quests will register themselves to some quest pools.export class QuestPool extends TwineClass {
 */
export class QuestPool extends TwineClass {
  key: QuestPoolKey;
  name: string;

  quest_template_rarity_map: { [k in QuestTemplateKey]?: Rarity } = {};
  opportunity_template_rarity_map: { [k in OpportunityTemplateKey]?: Rarity } =
    {};

  constructor(key: string, def: Readonly<QuestPoolDefinition>) {
    super();

    this.key = key as QuestPoolKey;
    this.name = def.name;

    if (key in setup.questpool)
      throw new Error(`Quest Pool ${key} already exists`);
    setup.questpool[key as QuestPoolKey] = this;
  }

  getDeck(): Deck {
    return setup.Deck.get(`questdeck_${this.key}`);
  }

  rep(): string {
    return this.getName();
  }

  getName(): string {
    return this.name;
  }

  /**
   * returns: [[quest, rarity], ...]
   */
  getAllQuestsAndOpportunities(): AllQuestGeneratableRes[] {
    const result: AllQuestGeneratableRes[] = [];

    for (const [quest_key, rarity] of objectEntries(
      this.quest_template_rarity_map,
    )) {
      const quest_template = setup.questtemplate[quest_key];
      result.push({
        template: quest_template,
        rarity,
      });
    }

    for (const [opp_key, rarity] of objectEntries(
      this.opportunity_template_rarity_map,
    )) {
      const opportunity_template = setup.opportunitytemplate[opp_key];
      result.push({
        template: opportunity_template,
        rarity: rarity!,
      });
    }

    return result;
  }

  registerQuest(quest_template: QuestTemplate, rarity: Rarity) {
    if (
      !State.variables.qDevTool &&
      quest_template.key in this.quest_template_rarity_map
    )
      throw new Error(`Quest already in pool`);
    this.quest_template_rarity_map[quest_template.key] = rarity;
  }

  registerOpportunity(
    opportunity_template: OpportunityTemplate,
    rarity: Rarity,
  ) {
    if (
      !State.variables.qDevTool &&
      opportunity_template.key in this.opportunity_template_rarity_map
    )
      throw new Error(`Opportunity already in pool`);
    this.opportunity_template_rarity_map[opportunity_template.key] = rarity;
  }

  static getYourUnitBaseCandidates(restrictions: Restriction[]): Unit[] {
    if (setup.Living.isRestrictionsAllowRetired(restrictions)) {
      // special case
      return State.variables.retiredlist.getUnits();
    } else {
      return State.variables.company.player.getUnits({});
    }
  }

  static instantiateActors(
    template: ContentTemplate,
    default_assignment?: ActorUnitMap,
  ): ActorUnitMap | null {
    const actor_unit_groups = template.getActorUnitGroups();

    const actors: ActorUnitMap = {};
    let picked_unit_keys: Record<UnitKey, boolean> = {};

    // first, set from default_assignment as much as possible
    if (default_assignment) {
      for (const actor_name in default_assignment) {
        if (!(actor_name in actor_unit_groups)) {
          throw new Error(
            `Actor name ${actor_name} missing from ${template.key}`,
          );
        }
        const unit = default_assignment[actor_name];
        actors[actor_name] = unit;
        picked_unit_keys[unit.key] = true;
      }
    }

    // NEVER, EVER change this order below. This is because the order is important for
    // setup.qres.RememberUnit
    for (let actor_key in actor_unit_groups) {
      // if already filled from default assignment, continue
      if (actors[actor_key]) continue;

      const unit_group = actor_unit_groups[actor_key];

      if (!unit_group)
        throw new Error(
          `Actor ${actor_key} lacks unitgroup in ${template.key}`,
        );
      if (Array.isArray(unit_group)) {
        // pick a random unit from your company
        let units = setup.QuestPool.getYourUnitBaseCandidates(unit_group);
        setup.rng.shuffleArray(units);
        let found = null;
        for (let i = 0; i < units.length; ++i) {
          let unit = units[i];
          if (
            !(unit.key in picked_unit_keys) &&
            setup.RestrictionLib.isUnitSatisfyIncludeDefiancy(unit, unit_group)
          ) {
            found = unit;
            break;
          }
        }
        if (!found) {
          // no instantiation found
          return null;
        }
        picked_unit_keys[found.key] = true;
        actors[actor_key] = found;
      } else if (unit_group instanceof setup.UnitGroup) {
        const job = template.getActorResultJob(actor_key);
        actors[actor_key] = unit_group.getUnit({ job_hint: job });
      } else if (unit_group instanceof setup.ContactTemplate) {
        const contacts = State.variables.contactlist
          .getContacts(unit_group)
          .filter(
            (contact) => contact.getUnit() && !contact.getUnit()!.isEngaged(),
          );
        if (!contacts.length) {
          // no instantiation found
          return null;
        }

        const contact = setup.rng.choice(contacts);
        actors[actor_key] = contact.getUnit()!;
      } else {
        throw new Error(`Unrecognized actor type`);
      }
    }
    return actors;
  }

  static instantiateQuest(
    template: QuestTemplate,
    default_assignment?: ActorUnitMap,
  ) {
    // generate actors for this
    let actors = setup.QuestPool.instantiateActors(
      template,
      default_assignment,
    );
    if (!actors) {
      // not found
      return null;
    }

    let newquest = new setup.QuestInstance(template, actors);
    State.variables.company.player.addQuest(newquest);
    return newquest;
  }

  static instantiateOpportunity(
    template: OpportunityTemplate,
    default_assignment?: ActorUnitMap,
  ) {
    // generate actors for this
    let actors = setup.QuestPool.instantiateActors(
      template,
      default_assignment,
    );
    if (!actors) {
      // not found
      return null;
    }
    let newopportunity = new setup.OpportunityInstance(template, actors);
    State.variables.opportunitylist.addOpportunity(newopportunity);
    return newopportunity;
  }

  // Can return null if no available quest
  generateQuest() {
    State.variables.statistics.addScoutedQuest(this);

    const candidates = this.getAllQuestsAndOpportunities();
    const zero = this.getAllQuestsAndOpportunities().filter(
      (a) => a.rarity.isForced() && a.template.isCanGenerate(),
    );

    let template = null;
    if (zero.length) {
      template = setup.rng.choice(zero).template;
    } else {
      const deck = this.getDeck();
      for (let i = 0; i < setup.DECK_DRAW_RETRIES_QUEST; ++i) {
        if (deck.isEmpty()) {
          deck.regenerateDeck(
            candidates
              .filter((a) => !a.rarity.isForced())
              .map((a) => {
                return {
                  object: {
                    key: a.template.key,
                    type: a.template.TYPE,
                  },
                  rarity: a.rarity,
                };
              }),
          );
        }
        const drawn = deck.drawCard();
        let drawn_template;
        if (drawn.type == "quest") {
          drawn_template = setup.questtemplate[drawn.key];
        } else {
          drawn_template = setup.opportunitytemplate[drawn.key];
        }
        if (drawn_template.isCanGenerate()) {
          template = drawn_template;
          break;
        }
      }
    }

    if (!template) {
      // No quest is found
      return null;
    }

    // record it
    State.variables.calendar.record(template);

    if (template.TYPE == "quest") {
      // finally instantiate the quest
      return setup.QuestPool.instantiateQuest(template as QuestTemplate);
    } else if (template.TYPE == "opportunity") {
      return setup.QuestPool.instantiateOpportunity(
        template as OpportunityTemplate,
      );
    } else {
      throw new Error(`Unrecognized type ${template.TYPE}`);
    }
  }
}
