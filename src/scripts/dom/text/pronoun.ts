import type { Unit } from "../../classes/unit/Unit";
import {
  getBasePronoun,
  getRelevantCharacter,
  pronouns,
} from "../../lib/pronouns";

export const Pronoun: Record<string, (unit: Unit) => string> = {};
export const PronounYou: Record<string, (unit: Unit) => string> = {};

function getFunc(index: number) {
  return (unit: Unit) => {
    if (unit.isMale()) return pronouns.he[index];
    return pronouns.she[index];
  };
}

function getFuncYou(index: number) {
  return (unit: Unit) => {
    if (unit.isYou() && index < pronouns.you.length) return pronouns.you[index];
    if (unit.isMale()) return pronouns.he[index];
    return pronouns.she[index];
  };
}

for (let i = 0; i < pronouns.they.length; ++i) {
  Pronoun[pronouns.they[i]] = getFunc(i);
  PronounYou[pronouns.they[i]] = getFuncYou(i);
}

type PronounloadResult = Record<(typeof pronouns.he)[number], string>;

export function pronounload(
  object: Record<string, string>,
  unit: Unit,
): PronounloadResult {
  for (let i = 0; i < pronouns["he"].length; ++i) {
    if (pronouns["he"][i] in object) continue;
    object[pronouns["he"][i]] =
      pronouns[getBasePronoun(getRelevantCharacter(unit), i)][i];
  }
  return object as PronounloadResult;
}
