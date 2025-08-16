import type { DutyTemplateQuestBrothelManager } from "../../../duty/subtypes/quest/QuestBrothelManager";
import { SlaveOrderTemplate } from "../SlaveOrderTemplate";

export default class SlaveOrderHeadCourtesan extends SlaveOrderTemplate {
  constructor() {
    super();

    this.base_price = 0;
    this.trait_multi = 0;
    this.value_multi = 0.5;

    this.name = "Head Courtesan";
    this.company_key = "player";
    this.expires_in = 50;

    this.fulfilled_outcomes = [
      setup.qc.HideAll(
        [
          setup.qc.VarSet("quest_brothel_progress", "108", -1),
          setup.qc.VarSet("quest_brothel_wait", "4", -1),
        ],
        "Improves your brothel",
      ),
    ];
    this.destination_unit_group_key =
      setup.unitgroup.brothel_head_courtesan.key;
  }

  override text() {
    return `setup.qc.SlaveOrderHeadCourtesan()`;
  }

  override getCriteria() {
    const dutytemplate = setup.dutytemplate
      .questbrothelmanager as DutyTemplateQuestBrothelManager;

    const class_level = dutytemplate.class();

    const sub = dutytemplate.sub();

    const req: Restriction[] = [
      setup.qres.Job(setup.job.slave),
      setup.qres.Trait(setup.trait.training_obedience_advanced),
      setup.qres.AnyTrait([
        setup.trait.magic_fire,
        setup.trait.magic_water,
        setup.trait.magic_earth,
        setup.trait.magic_wind,
        setup.trait.magic_dark,
        setup.trait.magic_light,
      ]),
    ];

    if (sub == "sub") {
      req.push(setup.qres.Trait("per_submissive"));
      req.push(
        setup.qres.AnyTrait(
          [
            setup.trait.value_high3,
            setup.trait.value_high4,
            setup.trait.value_high5,
            setup.trait.value_high6,
            setup.trait.value_high7,
          ],
          true,
        ),
      );
    } else if (sub == "dom") {
      req.push(setup.qres.Trait("per_dominant"));
      req.push(
        setup.qres.AnyTrait(
          [
            setup.trait.value_high3,
            setup.trait.value_high4,
            setup.trait.value_high5,
            setup.trait.value_high6,
            setup.trait.value_high7,
          ],
          true,
        ),
      );
    } else {
      req.push(setup.qres.NoTrait("per_dominant"));
      req.push(setup.qres.NoTrait("per_submissive"));
      req.push(
        setup.qres.AnyTrait(
          [
            setup.trait.value_high4,
            setup.trait.value_high5,
            setup.trait.value_high6,
            setup.trait.value_high7,
          ],
          true,
        ),
      );
    }

    if (dutytemplate.gender() == "male") {
      req.push(setup.qres.Trait("gender_male"));
    } else {
      req.push(setup.qres.Trait("gender_female"));
    }

    const critical: Trait[] = [];
    const disaster: Trait[] = [];

    const criteria = new setup.UnitCriteria(
      null /* key */,
      this.name /* title */,
      critical,
      disaster,
      req,
      {} /* skill effects */,
    );
    return criteria;
  }
}
