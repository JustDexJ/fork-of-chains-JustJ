import type { FilterMenu } from "./_filter";
import { _MENUS_unit } from "./filter_unit";

export const _MENUS_unitquick: FilterMenu<Unit> = {
  job: _MENUS_unit.job,
  status: _MENUS_unit.status,
  sort: { ..._MENUS_unit.sort },
};

delete _MENUS_unitquick.sort.resets;
