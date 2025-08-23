import { Furniture } from "../classes/furniture/Furniture";
import type { ItemDefinition } from "../classes/inventory/Item";
import { ItemLorebook } from "../classes/inventory/subtypes/ItemLorebook";
import { ItemNotUsable } from "../classes/inventory/subtypes/ItemNotUsable";
import { ItemQuest } from "../classes/inventory/subtypes/ItemQuest";
import { ItemSexManual } from "../classes/inventory/subtypes/ItemSexManual";
import { ItemTechnology } from "../classes/inventory/subtypes/ItemTechnology";
import { ItemUnitUsable } from "../classes/inventory/subtypes/ItemUnitUsable";
import { ItemUsable } from "../classes/inventory/subtypes/ItemUsable";
import type { PerkDefinition } from "../classes/trait/Perk";
import type {
  InlineTraitGroupDefinition,
  TraitDefinition,
  TraitOrGroupDefinition,
} from "../classes/trait/Trait";
import type { TraitGroupDefinition } from "../classes/trait/TraitGroup";
import {
  UnitAction,
  type UnitActionDefinition,
} from "../classes/unitaction/UnitAction";
import { UnitAction_RepeatSelf } from "../classes/unitaction/UnitAction_RepeatSelf";
import type { InstalledMod } from "./modmanager";

export namespace DataUtil {
  /** Will reference the current mod being loaded, if any. */
  export let CURRENT_MOD: InstalledMod | null = null;

  export function load<T extends {}, A extends Readonly<T>>(
    klass: { new (key: string, def: A): any },
    definitions: Record<string, T>,
    mod?: InstalledMod,
  ) {
    for (const [key, def] of Object.entries(definitions)) {
      if (def) {
        new klass(key, def as any);
      }
    }
  }

  export function loadUnitActions(defs: Record<string, UnitActionDefinition>) {
    for (const [key, def] of objectEntries(defs)) {
      if (def.repeat_self) {
        new UnitAction_RepeatSelf(key, def);
      } else {
        new UnitAction(key, def);
      }
    }
  }

  export function loadTraitsAndInlineTraitGroups(
    defs: Record<string, TraitOrGroupDefinition | PerkDefinition>,
  ) {
    for (const [key, def] of objectEntries(defs)) {
      if (key.startsWith("group:")) {
        const group_key = key.substring(6);
        const group_def = Object.assign(
          def as InlineTraitGroupDefinition<string>,
          {
            key: group_key,
          },
        );

        const trait_defs = group_def.sequence ?? group_def.pool;
        if (!trait_defs) {
          throw new Error(
            `Invalid TraitGroup definition for "${key}": either 'sequence' or 'pool' must be defined`,
          );
        }

        const traits = objectEntries(trait_defs).map(([key, trait_def]) => {
          if (!trait_def) return null;

          const trait = new setup.Trait(key, trait_def);
          if (group_def.add_tags) {
            trait.tags = [...trait.tags, ...group_def.add_tags];
          }
          return trait;
        });

        const actual_def: TraitGroupDefinition = group_def.sequence
          ? { sequence: traits }
          : { pool: traits as Trait[] };

        new setup.TraitGroup(group_def.key, actual_def);
      } else if ("perk_choice_restrictions" in def) {
        new setup.Perk(key, def);
      } else {
        new setup.Trait(key, def as TraitDefinition);
      }
    }
  }

  export function loadItems(defs: Record<string, ItemDefinition>) {
    for (const [key, def] of objectEntries(defs)) {
      switch (def.type) {
        case "lore":
          new ItemLorebook(key, def);
          break;

        case "notusable":
          new ItemNotUsable(key, def);
          break;

        case "quest":
          new ItemQuest(key, def);
          break;

        case "sexmanual":
          new ItemSexManual(key, def);
          break;

        case "technology":
          new ItemTechnology(key, def);
          break;

        case "unitusable":
          new ItemUnitUsable(key, def);
          break;

        case "usable":
          new ItemUsable(key, def);
          break;

        case "furniture":
          new Furniture(key, def);
          break;
      }
    }
  }

  export function registerVeteranQuests() {
    const _basequestpools = [
      setup.questpool.vale,
      setup.questpool.forest,
      setup.questpool.city,
      setup.questpool.deep,
      setup.questpool.desert,
      setup.questpool.sea,
    ];

    let done: Record<string, boolean> = {};
    for (let qp of _basequestpools) {
      for (let q of qp.getAllQuestsAndOpportunities()) {
        if (q.template.getTags().includes("veteran")) {
          if (!(q.template.key in done)) {
            done[q.template.key] = true;
            if (q.template.TYPE == "quest") {
              setup.questpool.veteran.registerQuest(q.template, q.rarity);
            } else {
              setup.questpool.veteran.registerOpportunity(q.template, q.rarity);
            }
          }
        }
      }
    }
  }
}
