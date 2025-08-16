import type { DutyTemplateKey } from "../duty/DutyTemplate";
import type { Job, JobKey } from "../job/Job";
import type { Skill } from "../Skill";
import type { Title, TitleKey } from "../title/Title";
import type { Trait, TraitKey } from "../trait/Trait";
import type { Unit } from "./Unit";

interface GetUnitOptions {
  job?: Job | JobKey;
  tag?: string;
  duty?: string;
  title?: Title | TitleKey;
  available?: boolean;
  skill_max?: Skill;
  trait?: Trait | TraitKey;
  alltraits?: (Trait | TraitKey)[];
  anytraits?: (Trait | TraitKey)[];
  random?: boolean;
  notyou?: boolean;
  injured?: boolean;
}

/** Retrieves any unit that satisfies something */
export function getUnit({
  job,
  tag,
  duty,
  title,
  available,
  skill_max,
  trait,
  random,
  alltraits,
  anytraits,
  notyou,
  injured,
}: GetUnitOptions): Unit | null {
  let candidates = [];
  if (duty && !(duty in setup.dutytemplate)) {
    throw new Error(`Unrecognized duty template key: ${duty}`);
  }
  for (let [unitkey, unit] of objectEntries(State.variables.unit)) {
    if (job && unit.getJob() != resolveObject(job, setup.job)) continue;
    if (tag && !unit.getTags().includes(tag)) continue;
    if (title && !unit.isHasTitle(resolveObject(title, setup.title))) continue;
    if (available && !unit.isAvailable()) continue;
    if (trait && !unit.isHasTrait(trait)) continue;
    if (
      alltraits &&
      alltraits.filter((trait) => !unit.isHasTraitExact(trait)).length
    )
      continue;
    if (anytraits && !unit.isHasAnyTraitExact(anytraits)) continue;
    if (notyou && unit.isYou()) continue;
    if (injured && !unit.isInjured()) continue;
    if (duty && (!unit.getDuty() || unit.getDuty()!.getTemplate().key != duty))
      continue;
    if (!random && !skill_max) return unit;
    candidates.push(unit);
  }
  if (!candidates.length) return null;

  if (skill_max) {
    candidates.sort((a, b) => b.getSkill(skill_max) - a.getSkill(skill_max));
    return candidates[0];
  }

  return setup.rng.choice(candidates);
}

/**
 * Retrieves a unit that satisfies something, if any. Otherwise, return yourself (useful for testing)
 */
export function getUnitOrAny(options: GetUnitOptions) {
  const unit = setup.getUnit(options);
  if (unit) return unit;
  return State.variables.unit.player;
}

/**
 * Like getUnit but randomly pick the unit
 */
export function getUnitRandom(options: GetUnitOptions) {
  options["random"] = true;
  return setup.getUnit(options);
}

function getDutySlaverForTalkingTo({
  preferences,
  forbidden,
}: {
  preferences: DutyTemplateKey[];
  forbidden?: Unit[];
}): Unit {
  const parsed_forbidden = forbidden || [];
  for (const pref of preferences) {
    const unit = State.variables.dutylist.getUnitIfAvailable(pref);
    if (
      unit &&
      !unit.isYou() &&
      unit.isAvailable() &&
      !parsed_forbidden.includes(unit)
    )
      return unit;
  }
  let units = State.variables.company.player
    .getUnits({
      available: true,
      job: setup.job.slaver,
    })
    .filter((unit) => !unit.isYou() && !parsed_forbidden.includes(unit));
  if (units.length) return setup.rng.choice(units);

  units = State.variables.company.player
    .getUnits({ job: setup.job.slaver })
    .filter((a) => !a.isYou() && !parsed_forbidden.includes(a));
  return setup.rng.choice(units);
}

/**
 * Retrieves any available slaver unit on duty, with preference for a certain job
 * The prefrences is strings, which is lowercase version of the duty (e.g., Marketer becomes marketer)
 * This is done for writer's convenience
 */
export function getDutySlaver(...preference: DutyTemplateKey[]): Unit {
  return getDutySlaverForTalkingTo({ preferences: preference });
}

/**
 * Gets any slaver for talking to in quest descriptions
 */
export function getAnySlaver(forbidden?: Unit[]): Unit {
  return getDutySlaverForTalkingTo({
    preferences: ["viceleader"],
    forbidden: forbidden,
  });
}

export function selectUnit(
  units: Unit[],
  {
    trait,
    anytrait,
    notrait,
    alltrait,
  }: {
    trait?: Trait | TraitKey;
    anytrait?: (Trait | TraitKey)[];
    notrait?: (Trait | TraitKey)[];
    alltrait?: (Trait | TraitKey)[];
  },
): Unit | null {
  if (trait) {
    units = units.filter((unit) =>
      unit.isHasTrait(resolveObject(trait, setup.trait)),
    );
  }
  if (anytrait) {
    units = units.filter((unit) =>
      unit.isHasAnyTraitExact(
        anytrait.map((key) => resolveObject(key, setup.trait)),
      ),
    );
  }
  if (notrait) {
    units = units.filter(
      (unit) =>
        !unit.isHasAnyTraitExact(
          notrait.map((key) => resolveObject(key, setup.trait)),
        ),
    );
  }
  if (alltrait) {
    units = units.filter(
      (unit) =>
        !unit.isHasTraitsExact(
          alltrait.map((key) => resolveObject(key, setup.trait)),
        ),
    );
  }
  if (units.length) {
    return setup.rng.choice(units);
  } else {
    return null;
  }
}
