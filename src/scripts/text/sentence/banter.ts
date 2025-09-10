import { BANTER_TOPIC } from "../raw/banter/topic";
import {
  BANTER_TRAINING_MINDBREAK,
  BANTER_TRAINING_NONE,
  BANTER_TRAINING_OBJECT,
  BANTER_TRAINING_VERB,
  BANTER_VERB_SLAVER_FRIEND,
  BANTER_VERB_SLAVER_LOVER,
  BANTER_VERB_SLAVER_RIVAL,
  BANTER_VERB_SLAVE_ABUSE,
  BANTER_VERB_SLAVE_CARE,
} from "../raw/banter/verb";

export interface BanterVerbSpec {
  initiator?: TraitKey[];
  target?: TraitKey[];
  verbs: string[];
}

export namespace TextBanter {
  // get random from a text specs: [{initiator: [], target: [], verbs: []}]
  export function _getRandom(
    specs: Array<BanterVerbSpec>,
    initiator: Unit,
    target: Unit,
  ): string {
    let eligibles: ChanceArray<string[]> = [];
    for (let i = 0; i < specs.length; ++i) {
      let spec = specs[i];
      let ok = true;
      if (spec.initiator) {
        for (let j = 0; j < spec.initiator.length; ++j) {
          let trait = setup.trait[spec.initiator[j]];
          if (!initiator.isHasTrait(trait)) {
            ok = false;
            break;
          }
        }
      }
      if (!ok) continue;
      if (spec.target) {
        for (let j = 0; j < spec.target.length; ++j) {
          let trait = setup.trait[spec.target[j]];
          if (!target.isHasTrait(trait)) {
            ok = false;
            break;
          }
        }
      }
      if (!ok) continue;
      eligibles.push([spec.verbs, spec.verbs.length]);
    }
    if (!eligibles.length) throw new Error(`??? eligibles missing???`);
    setup.rng.normalizeChanceArray(eligibles);
    let chosen = setup.rng.sampleArray(eligibles)!;
    return setup.rng.choice(chosen)!;
  }

  export function _getTopic() {
    return setup.rng.choice(BANTER_TOPIC);
  }

  export function _getAdverb(
    unit: Unit,
    is_care?: boolean,
    is_abuse?: boolean,
  ) {
    let candidates: string[] = [];
    let speech = unit.getSpeech();
    let adverbs = speech.getAdverbs();
    if (is_care) {
      if (
        speech == setup.speech.friendly ||
        speech == setup.speech.cool ||
        speech == setup.speech.witty
      ) {
        candidates = candidates.concat(adverbs);
      }
    } else if (is_abuse) {
      if (speech != setup.speech.friendly) {
        candidates = candidates.concat(adverbs);
      }
    } else {
      candidates = candidates.concat(adverbs);
    }

    let traits = unit.getAllTraitsWithTag("per");
    for (let i = 0; i < traits.length; ++i) {
      let text = traits[i].text();
      if (is_care && !text.care) continue;
      if (is_abuse && !text.abuse) continue;
      if ("adverbs" in text) {
        let adverbs = text.adverbs!;
        candidates = candidates.concat(adverbs);
      }
    }

    if (!candidates.length) return "";
    return setup.rng.choice(candidates);
  }

  export function _generateSlaver(initiator: Unit, target: Unit, amt: number) {
    let verb_candidate: BanterVerbSpec[];
    let connector: string;
    if (amt < 0) {
      verb_candidate = BANTER_VERB_SLAVER_RIVAL;
      connector = "";
    } else if (initiator.getLover() == target) {
      verb_candidate = BANTER_VERB_SLAVER_LOVER;
      connector = setup.rng.choice([
        `as a reward for`,
        `for`,
        `rewarding`,
        `after appreciating`,
        `after a show of`,

        `appreciating`,
        `as an appreciation for`,
        `to show appreciation for`,
        `while fantasizing about`,
        `all while thinking about`,
      ]);
    } else {
      verb_candidate = BANTER_VERB_SLAVER_FRIEND;
      connector = setup.rng.choice([
        "about",
        "on the topic of",
        "regarding",
        "concerning",
        "on the subject of",
      ]);
    }
    let verb = _getRandom(verb_candidate, initiator, target);

    let adverb = _getAdverb(initiator);

    let topic;
    if (amt >= 0 && initiator.getLover() == target) {
      topic = setup.Text.Praise.noun(target);
      topic = `b|their ${topic}`;
    } else {
      topic = _getTopic();
    }

    return `a|Rep ${adverb} ${verb} ${connector} ${topic}.`;
  }

  export function _generateSlave(initiator: Unit, target: Unit, amt: number) {
    let verb_candidate: BanterVerbSpec[];
    let adverb: string;
    if (amt > 0) {
      verb_candidate = BANTER_VERB_SLAVE_CARE;
      adverb = _getAdverb(initiator, /* is care = */ true);
    } else {
      verb_candidate = BANTER_VERB_SLAVE_ABUSE;
      adverb = _getAdverb(
        initiator,
        /* is care = */ false,
        /* is abuse = */ true,
      );
    }
    let verb = _getRandom(verb_candidate, initiator, target);
    let extra = slaveTrainingText(target);
    return `a|Rep ${adverb} ${verb}. ${extra}.`;
  }

  export function generate(initiator: Unit, target: Unit, amt: number) {
    // generate a text banter from initiator to target with the given amt.

    if (!initiator.isSlaver())
      throw new Error(`Banter initiator must be a slaver`);

    let raw_text;
    if (target.isSlave()) {
      raw_text = _generateSlave(initiator, target, amt);
    } else {
      raw_text = _generateSlaver(initiator, target, amt);
    }

    return setup.Text.replaceUnitMacros(raw_text, { a: initiator, b: target });
  }

  export function slaveTrainingText(unit: Unit) {
    // generates a random sentence from the unit's main training
    let base = "";
    if (unit.isMindbroken()) {
      base = setup.rng.choice(BANTER_TRAINING_MINDBREAK);
    } else {
      let training = setup.UnitTitle.getMainTraining(unit);
      if (training == setup.trait.training_none) {
        base = setup.rng.choice(BANTER_TRAINING_NONE);
      } else {
        let smallest = training.getTraitGroup()!.getSmallestTrait();
        let index = training.getTraitGroup()!._getTraitIndex(training);
        let objectchoice = (BANTER_TRAINING_OBJECT as any)[smallest.key];
        let verbchoice = BANTER_TRAINING_VERB[index];
        let verb = setup.rng.choice(verbchoice);
        let obj = setup.rng.choice(objectchoice);
        base = `${verb} ${obj}`;
      }
    }
    return setup.Text.replaceUnitMacros(`a|Rep ${base}`, { a: unit });
  }
}
