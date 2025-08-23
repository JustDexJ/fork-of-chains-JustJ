import { TraitHelper } from "../../trait/Trait";
import { UnitCriteria } from "../UnitCriteria";

export class QuestUnitCriteriaRapeFetishist extends UnitCriteria {
  constructor() {
    super(
      "quest_unit_criteria_rape_fetishist",
      "Rape Victim",
      [],
      [],
      [
        setup.qres.Job("slave"),
        setup.qres.AnyTrait([
          setup.trait.training_none,
          setup.trait.training_roleplay_advanced,
        ]),
      ],
      {},
    );
  }

  static getRng(): number {
    const varname = "quest_unit_criteria_rape_fetishist_rng";
    if (State.variables.varstore.get(varname) == null) {
      State.variables.varstore.set(
        varname,
        Math.floor(Math.random() * 1000000000),
        -1,
      );
    }
    const base =
      State.variables.varstore.get<number | string>(
        "quest_unit_criteria_rape_fetishist_rng",
      ) ?? 0;
    return +base;
  }

  static getBgOptions(): Trait[] {
    return [
      setup.trait.bg_knight,
      setup.trait.bg_noble,
      setup.trait.bg_priest,
      setup.trait.bg_slaver,
    ];
  }

  static getBgTrait(): Trait {
    const bgs = this.getBgOptions();
    const rng = this.getRng();
    return bgs[rng % bgs.length];
  }

  static getSubraceOptions(): Trait[] {
    return TraitHelper.getAllTraitsOfTags(["subrace"]).filter((trait) =>
      [setup.rarity.common, setup.rarity.uncommon, setup.rarity.rare].includes(
        trait.getRarity(),
      ),
    );
  }

  static getSubraceTrait(): Trait {
    const bglength = this.getBgOptions().length;
    const rng = Math.floor(this.getRng() / bglength);
    const subraces = this.getSubraceOptions();
    return subraces[rng % subraces.length];
  }

  static getPerOptions(): Trait[] {
    return [
      setup.trait.per_dominant,
      setup.trait.per_submissive,
      setup.trait.per_chaste,
      setup.trait.per_sexaddict,
    ];
  }

  static getPerTrait(): Trait {
    const bglength = this.getBgOptions().length;
    const subracelength = this.getSubraceOptions().length;
    const rng = Math.floor(this.getRng() / (bglength * subracelength));
    const per = this.getPerOptions();
    return per[rng % per.length];
  }

  getCritTraits(): Trait[] {
    return [
      setup.QuestUnitCriteriaRapeFetishist.getBgTrait(),
      setup.QuestUnitCriteriaRapeFetishist.getSubraceTrait(),
      setup.QuestUnitCriteriaRapeFetishist.getPerTrait(),
    ];
  }
}
