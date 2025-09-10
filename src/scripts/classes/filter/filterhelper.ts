import { TwineClass } from "../_TwineClass";
import type { Rarity } from "../deck/Rarity";
import type { QuestDifficulty } from "../quest/QuestDifficulty";
import { down, up, type FilterMenuOption } from "./_filter";

interface FilterHelper<T> {
  title: string;
  sort: (a: T, b: T) => number;
}

/**
 * Various helper menu objects for making menus
 */
export class MenuFilterHelper extends TwineClass {
  static namedown: FilterHelper<{ getName(): string }> = {
    title: down("Name"),
    sort: (a, b) => a.getName().localeCompare(b.getName()),
  };

  static nameup: FilterHelper<{ getName(): string }> = {
    title: up("Name"),
    sort: (a, b) => b.getName().localeCompare(a.getName()),
  };

  static leveldown: FilterHelper<{ getLevel(): number }> = {
    title: down("Level"),
    sort: (a, b) => a.getLevel() - b.getLevel(),
  };

  static levelup: FilterHelper<{ getLevel(): number }> = {
    title: up("Level"),
    sort: (a, b) => b.getLevel() - a.getLevel(),
  };

  static joindown: FilterHelper<{ getWeeksWithCompany(): number }> = {
    title: down("Join"),
    sort: (a, b) => b.getWeeksWithCompany() - a.getWeeksWithCompany(),
  };

  static joinup: FilterHelper<{ getWeeksWithCompany(): number }> = {
    title: up("Join"),
    sort: (a, b) => a.getWeeksWithCompany() - b.getWeeksWithCompany(),
  };

  static slavevaluedown: FilterHelper<{ getSlaveValue(): number }> = {
    title: down("Value"),
    sort: (a, b) => a.getSlaveValue() - b.getSlaveValue(),
  };

  static slavevalueup: FilterHelper<{ getSlaveValue(): number }> = {
    title: up("Value"),
    sort: (a, b) => b.getSlaveValue() - a.getSlaveValue(),
  };

  static valuedown: FilterHelper<{ getValue(): number | null | undefined }> = {
    title: down("Value"),
    sort: (a, b) => (a.getValue() ?? 0) - (b.getValue() ?? 0),
  };

  static valueup: FilterHelper<{ getValue(): number | null | undefined }> = {
    title: up("Value"),
    sort: (a, b) => (b.getValue() ?? 0) - (a.getValue() ?? 0),
  };

  static sluttinessdown: FilterHelper<{ getSluttiness(): number }> = {
    title: down("Sluttiness"),
    sort: (a, b) => a.getSluttiness() - b.getSluttiness(),
  };

  static sluttinessup: FilterHelper<{ getSluttiness(): number }> = {
    title: up("Sluttiness"),
    sort: (a, b) => b.getSluttiness() - a.getSluttiness(),
  };

  static raritydown: FilterHelper<{ getRarity(): Rarity }> = {
    title: down("Rarity"),
    sort: (a, b) => setup.Rarity.RarityCmp(a.getRarity(), b.getRarity()),
  };

  static rarityup: FilterHelper<{ getRarity(): Rarity }> = {
    title: up("Rarity"),
    sort: (a, b) => setup.Rarity.RarityCmp(b.getRarity(), a.getRarity()),
  };

  static templateleveldown: FilterHelper<{ getTemplate(): ContentTemplate }> = {
    title: down("Level"),
    sort: (a, b) =>
      a.getTemplate().getDifficulty().getLevel() -
      b.getTemplate().getDifficulty().getLevel(),
  };

  static templatelevelup: FilterHelper<{ getTemplate(): ContentTemplate }> = {
    title: up("Level"),
    sort: (a, b) =>
      b.getTemplate().getDifficulty().getLevel() -
      a.getTemplate().getDifficulty().getLevel(),
  };

  static difficultyleveldown: FilterHelper<{
    getDifficulty(): QuestDifficulty;
  }> = {
    title: down("Level"),
    sort: (a, b) => a.getDifficulty().getLevel() - b.getDifficulty().getLevel(),
  };

  static difficultylevelup: FilterHelper<{ getDifficulty(): QuestDifficulty }> =
    {
      title: up("Level"),
      sort: (a, b) =>
        b.getDifficulty().getLevel() - a.getDifficulty().getLevel(),
    };

  static makeRarityFilter(rarity_keys: readonly string[]) {
    return (obj: { getRarity(): Rarity }) =>
      rarity_keys.includes(obj.getRarity().key);
  }

  static makeTagsFilter(tags: readonly string[]) {
    return (obj: { getTags(): readonly string[] }) =>
      obj.getTags().some((tag) => tags.includes(tag));
  }

  static rarityFilters<T extends { getRarity(): Rarity }>() {
    const options: FilterMenuOption<T>[] = [];

    for (const rarity of Object.values(setup.rarity)) {
      options.push({
        title: rarity.repJSX(),
      });
    }

    return options;
  }
}
