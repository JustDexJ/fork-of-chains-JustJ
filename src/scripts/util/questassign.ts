import type {
  UnitCriteria,
  UnitCriteriaKey,
} from "../classes/criteria/UnitCriteria";
import type { QuestInstance } from "../classes/quest/QuestInstance";
import type { QuestUnitCriteria } from "../classes/quest/QuestTemplate";
import type { Unit, UnitKey } from "../classes/unit/Unit";

export namespace QuestAssignHelper {
  const QUEST_AUTO_ASSIGN_MAX_PERMUTATIONS = 24;

  export function assignUnit(
    actor_name: string,
    unit: Unit,
    criteria: UnitCriteria,
  ) {
    const unitused = State.variables.gAdhocUnitUsed!;

    const actormap = State.variables.gAdhocQuestActorMap!;

    // If this unit is already there, do nothing
    if (actormap[actor_name] == unit.key) return;

    // Get old unit, if any
    let old_unit = null;
    if (actormap[actor_name]) {
      old_unit = State.variables.unit[actormap[actor_name]];

      // Remove old unit from its position
      delete unitused[old_unit.key];
      delete actormap[actor_name];
    }

    // Get old position, if any
    const old_actor_name = unitused[unit.key];

    if (old_actor_name) {
      // remove new unit from this position
      delete unitused[unit.key];
      delete actormap[old_actor_name];
    }

    // put unit in position
    unitused[unit.key] = actor_name;
    actormap[actor_name] = unit.key;

    // swap with old unit, if appropriate
    if (old_unit && old_actor_name && criteria.isCanAssign(old_unit)) {
      unitused[old_unit.key] = old_actor_name;
      actormap[old_actor_name] = old_unit.key;
    }
  }

  export function isAllActorsFilled(): boolean {
    const quest =
      State.variables.questinstance[State.variables.gAdhocQuest_key!];

    const actormap = State.variables.gAdhocQuestActorMap!;

    for (const actor_name in quest.getTemplate().getUnitCriterias()) {
      if (!(actor_name in actormap)) {
        return false;
      }
    }
    return true;
  }

  export function computeSuccessObjRep() {
    const quest =
      State.variables.questinstance[State.variables.gAdhocQuest_key!];
    const actormap = State.variables.gAdhocQuestActorMap;

    const actor_unit_map: ActorUnitMap = {};
    for (const key in actormap) {
      actor_unit_map[key] = State.variables.unit[actormap[key]];
    }

    const success_obj = setup.QuestDifficulty.computeSuccessObj(
      quest.getTemplate().getDifficulty(),
      quest.getTemplate().getUnitCriterias(),
      actor_unit_map,
    );
    return setup.QuestDifficulty.explainChance(success_obj);
  }

  export function doFinalize(
    quest: QuestInstance,
    actor_unitkey_map: ActorUnitKeyMap,
  ) {
    const actor_unit_map: ActorUnitMap = {};
    for (const key in actor_unitkey_map) {
      actor_unit_map[key] = State.variables.unit[actor_unitkey_map[key]];
    }

    // Create ad hoc team
    const team = new setup.Team();
    State.variables.company.player.addTeam(team);
    for (const unit of Object.values(actor_unit_map)) {
      team.addUnit(unit);
    }

    quest.assignTeam(team, actor_unit_map);
  }

  export function finalize(quest: QuestInstance) {
    const actormap = State.variables.gAdhocQuestActorMap!;

    // remove the old team, if any
    if (quest.getTeam()) {
      quest.cancelAssignTeam();
    }

    doFinalize(quest, actormap);
  }

  export function initialize(quest: QuestInstance) {
    State.variables.gAdhocQuest_key = quest.key;

    const actor_map: ActorUnitKeyMap = {};
    const unit_used: Record<UnitKey, string> = {};

    const unit_assignment = quest.getUnitCriteriasList();
    for (const [actor_name, _, unit] of unit_assignment) {
      if (unit) {
        actor_map[actor_name] = unit.key;
        unit_used[unit.key] = actor_name;
      }
    }

    State.variables.gAdhocQuestActorMap = actor_map;
    State.variables.gAdhocUnitUsed = unit_used;
  }

  export function computeGreedyAutoAssignment(
    criterias: { [x: string]: QuestUnitCriteria | { criteria: UnitCriteria } },
    units: Unit[],
    actor_name_permutation: string[],
    criteria_actor_score_map: {
      [k in UnitCriteriaKey]?: Record<UnitKey, number>;
    },
  ) {
    const actor_unitkey_map: ActorUnitKeyMap = {};
    const used_unitkeys: Record<UnitKey, boolean> = {};

    let total_score = 0;

    for (const actor_name of actor_name_permutation) {
      const criteria: UnitCriteria = criterias[actor_name].criteria;
      let best_unit: Unit | null = null;
      let best_score = 0;
      for (const unit of units) {
        if (unit.key in used_unitkeys || !criteria.isCanAssign(unit)) continue;
        const score = criteria_actor_score_map[criteria.key!]![unit.key];
        if (!best_unit || score > best_score) {
          best_unit = unit;
          best_score = score;
        }
      }

      // no assignment case:
      if (!best_unit)
        return { actor_unitkey_map: null, total_score: -Infinity };

      used_unitkeys[best_unit.key] = true;
      actor_unitkey_map[actor_name] = best_unit.key;
      total_score += best_score;
    }

    // all found:
    return { actor_unitkey_map: actor_unitkey_map, total_score: total_score };
  }

  /**
   * Returns null if no assignment is found.
   * @param forced_units if supplied, will limit units to this set. IGNORES INJURIES
   */
  export function computeAutoAssignment(
    quest: QuestInstance,
    forced_units?: Unit[],
  ): ActorUnitKeyMap | null {
    let units: Unit[] = [];
    if (forced_units) {
      units = forced_units;
    } else {
      units = State.variables.company.player
        .getUnits({ available: true })
        .filter((unit) => unit.isCanGoOnQuestsAuto());
    }

    let score_func:
      | "computeScore"
      | "computeScoreCrit"
      | "computeScoreSuccess"
      | "computeScoreFailure" = "computeScore";

    const score_type = State.variables.menufilter.get("questassign", "score");
    if (score_type == "crit") {
      score_func = "computeScoreCrit";
    } else if (score_type == "success") {
      score_func = "computeScoreSuccess";
    } else if (score_type == "failure") {
      score_func = "computeScoreFailure";
    }

    const criterias = quest.getTemplate().getUnitCriterias();
    const difficulty = quest.getTemplate().getDifficulty();

    const criteria_actor_score_map: {
      [k in UnitCriteriaKey]?: Record<UnitKey, number>;
    } = {};
    for (const actor_name in criterias) {
      const criteria: UnitCriteria = criterias[actor_name].criteria;
      for (const unit of units) {
        if (!criteria.isCanAssign(unit)) continue;
        const criteria_key = criteria.key!;
        if (criteria_actor_score_map[criteria_key] === undefined)
          criteria_actor_score_map[criteria_key] = {};
        criteria_actor_score_map[criteria_key][unit.key] = criteria[score_func](
          unit,
          difficulty,
        );
      }
    }

    let best_result = {
      actor_unitkey_map: null as ActorUnitKeyMap | null,
      total_score: -Infinity,
    };
    for (const permutation of setup.PermuteHelper.permute(
      Object.keys(criterias),
      QUEST_AUTO_ASSIGN_MAX_PERMUTATIONS,
    )) {
      const result = setup.QuestAssignHelper.computeGreedyAutoAssignment(
        criterias,
        units,
        permutation,
        criteria_actor_score_map,
      );
      if (result.total_score > best_result.total_score) {
        best_result = result;
      }
    }
    return best_result.actor_unitkey_map;
  }

  export function computeAutoAssignmentScoreRepIfAny(
    quest: QuestInstance,
  ): string {
    const assignment = setup.QuestAssignHelper.computeAutoAssignment(quest);
    if (!assignment) return "";
    const assignment_units: ActorUnitMap = {};
    for (const [key, value] of objectEntries(assignment)) {
      assignment_units[key] = State.variables.unit[value];
    }
    const success_obj = setup.QuestDifficulty.computeSuccessObj(
      quest.getTemplate().getDifficulty(),
      quest.getTemplate().getUnitCriterias(),
      assignment_units,
    );
    return setup.QuestDifficulty.explainChance(success_obj);
  }

  /**
   * Try to auto assign units to this quest, if possible.
   */
  export function tryAutoAssign(quest: QuestInstance): boolean {
    if (
      State.variables.company.player.isCanDeployTeam() &&
      quest.isCostsSatisfied()
    ) {
      const assignment = setup.QuestAssignHelper.computeAutoAssignment(quest);
      if (assignment) {
        doFinalize(quest, assignment);
        return true;
      }
    }
    return false;
  }
}
