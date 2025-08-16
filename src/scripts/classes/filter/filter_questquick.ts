import type { FilterMenu } from "./_filter";
import { _MENUS_quest } from "./filter_quest";

export const _MENUS_questquick: FilterMenu<QuestInstance> = {
  tag_region: _MENUS_quest.tag_region,
  status: _MENUS_quest.status,
  sort: _MENUS_quest.sort,
};
