import type {
  ActorUnitgroupKeyMap,
  ActorUnitgroupsInit,
  ResolvedActorUnitgroupKeyMap,
} from "../classes/content/ContentTemplate";
import Job from "../classes/restriction/unit/Job";
import { UnitGroup } from "../classes/unit/UnitGroup";

export namespace ActorHelper {
  export function parseMap(
    actor_unitgroups: ActorUnitgroupsInit,
  ): ActorUnitgroupKeyMap {
    let actor_unitgroup_key_map: ActorUnitgroupKeyMap = {};
    for (let actor_name in actor_unitgroups) {
      if (!actor_unitgroups[actor_name]) {
        actor_unitgroup_key_map[actor_name] = null;
      } else {
        let value = actor_unitgroups[actor_name];
        if (setup.isString(value)) {
          actor_unitgroup_key_map[actor_name] = {
            type: "unitgroup",
            key: value,
          };
        } else if (Array.isArray(value)) {
          actor_unitgroup_key_map[actor_name] = {
            type: "companyunit",
            val: setup.deepCopy(value),
          };
          const status_restriction_classes = [
            setup.qresImpl.HomeExceptOnLeave,
            setup.qresImpl.NotEngaged,
            setup.qresImpl.Home,
          ];
          let found = false;
          for (const status_class of status_restriction_classes) {
            if (value.filter((a) => a instanceof status_class).length) {
              found = true;
              break;
            }
          }
          if (!found) {
            // assign one

            // check if it allows for retired slavers
            if (setup.Living.isRestrictionsAllowRetired(value)) {
              // has retired slaver.
              actor_unitgroup_key_map[actor_name].val.push(
                setup.qres.NotEngaged(),
              );
            } else {
              actor_unitgroup_key_map[actor_name].val.push(setup.qres.Home());
            }
          }
        } else if (value instanceof setup.ContactTemplate) {
          actor_unitgroup_key_map[actor_name] = {
            type: "contact",
            key: value.key,
          };
        } else if (value instanceof setup.UnitGroup) {
          actor_unitgroup_key_map[actor_name] = {
            type: "unitgroup",
            key: value.key,
          };
        } else if (value && typeof value === "object" && "type" in value) {
          actor_unitgroup_key_map[actor_name] = value;
        }
      }
    }
    return actor_unitgroup_key_map;
  }

  export function parseUnitGroups(
    actor_unitgroup_key_map: ActorUnitgroupKeyMap,
  ): ResolvedActorUnitgroupKeyMap {
    const result: ResolvedActorUnitgroupKeyMap = {};
    for (const [criteria_key, unitgroupkey] of objectEntries(
      actor_unitgroup_key_map,
    )) {
      if (unitgroupkey) {
        if (unitgroupkey.type == "contact") {
          result[criteria_key] = setup.contacttemplate[unitgroupkey.key];
        } else if (unitgroupkey.type == "unitgroup") {
          result[criteria_key] = setup.unitgroup[unitgroupkey.key];
        } else if (unitgroupkey.type == "companyunit") {
          if (!Array.isArray(unitgroupkey.val))
            throw new Error(`unrecognized unit group: ${unitgroupkey}`);
          // here, its the [res1, res2] version
          result[criteria_key] = unitgroupkey.val;
        } else {
          throw new Error(
            `Unknown actor type: ${(unitgroupkey as { type: string }).type}`,
          );
        }
      } else {
        result[criteria_key] = null;
      }
    }
    return result;
  }
}

export namespace DebugActor {
  export function getActors(
    actor_unit_groups: ActorUnitgroupKeyMap,
    is_efficient?: boolean,
  ): ActorUnitMap {
    let actors: ActorUnitMap = {};
    const player_units = State.variables.company.player
      .getUnits({})
      .filter(
        (unit) => !unit.isEngaged() && !State.variables.leave.isOnLeave(unit),
      );
    setup.rng.shuffleArray(player_units);
    let player_unit_idx = 0;
    for (const actor_key in actor_unit_groups) {
      let unitgroup = actor_unit_groups[actor_key];
      if (Array.isArray(unitgroup)) {
        let unit;
        if (is_efficient && player_unit_idx < player_units.length) {
          unit = player_units[player_unit_idx];
          player_unit_idx += 1;
        } else {
          let slave = false;
          let you = false;

          const restrictions: Restriction[] = unitgroup;
          for (const restriction of restrictions) {
            if (
              restriction instanceof Job &&
              restriction.job_key == setup.job.slave.key
            ) {
              slave = true;
            } else if (restriction instanceof setup.qresImpl.You) {
              you = true;
            }
          }
          if (
            you &&
            !is_efficient &&
            !State.variables.unit.player.isEngaged() &&
            !State.variables.leave.isOnLeave(State.variables.unit.player)
          ) {
            unit = State.variables.unit.player;
          } else {
            // just create new people for this
            unit = setup.unitpool["subrace_humankingdom"].generateUnit();
            State.variables.company.player.addUnit(
              unit,
              slave ? setup.job.slave : setup.job.slaver,
            );
          }
        }
        actors[actor_key] = unit;
      } else {
        let unitgroup_: UnitGroup;
        if (!(unitgroup instanceof UnitGroup) || unitgroup.reuse_chance) {
          unitgroup_ = setup.unitgroup.all;
        } else {
          unitgroup_ = unitgroup;
        }

        let unit = unitgroup_.getUnit();
        actors[actor_key] = unit;
        if (actor_key == "trainee") {
          State.variables.company.player.addUnit(unit, setup.job.slave);
        }
      }
    }
    return actors;
  }
}
