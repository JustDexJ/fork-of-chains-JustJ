import type { PerkDefinition } from "../classes/trait/Perk";
import type {
  InlineTraitGroupDefinition,
  TraitDefinition,
  TraitOrGroupDefinition,
} from "../classes/trait/Trait";
import type { TraitGroupDefinition } from "../classes/trait/TraitGroup";
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
      new klass(key, def as any);
    }
  }

  export function loadTraitsAndInlineTraitGroups(
    defs: Record<string, TraitOrGroupDefinition | PerkDefinition>,
  ) {
    for (const [key, def] of objectEntries(defs)) {
      if (key.startsWith("group:")) {
        const group_key = key.substring(6);
        const group_def = Object.assign(def as InlineTraitGroupDefinition, {
          key: group_key,
        });

        const trait_defs = group_def.sequence ?? group_def.pool;
        if (!trait_defs) {
          throw new Error(
            `Invalid TraitGroup definition for "${key}": either 'sequence' or 'pool' must be defined`,
          );
        }

        const traits = trait_defs.map((trait_def) => {
          if (!trait_def) return null;

          const trait = new setup.Trait(trait_def.key, trait_def);
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
}
