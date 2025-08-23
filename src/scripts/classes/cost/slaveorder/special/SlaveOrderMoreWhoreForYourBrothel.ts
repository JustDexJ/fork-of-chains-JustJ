import type { DutyTemplateQuestBrothelManager } from "../../../duty/subtypes/quest/QuestBrothelManager";
import { SlaveOrderTemplate } from "../SlaveOrderTemplate";

export default class SlaveOrderMoreWhoreForYourBrothel extends SlaveOrderTemplate {
  constructor() {
    super();

    this.base_price = 0;
    this.trait_multi = 1000;
    this.value_multi = 0;

    this.name = "More Whore for Your Brothel";
    this.company_key = "player";
    this.expires_in = 50;

    this.fulfilled_outcomes = [
      setup.qc.HideAll(
        [
          setup.qc.VarSet("quest_brothel_progress", "68", -1),
          setup.qc.VarSet("quest_brothel_wait", "4", -1),
        ],
        "Improves your brothel",
      ),
    ];
    this.destination_unit_group_key = setup.unitgroup.soldslaves.key;
  }

  override text(): string {
    return `setup.qc.SlaveOrderMoreWhoreForYourBrothel()`;
  }

  override getCriteria() {
    const dutytemplate = setup.dutytemplate
      .questbrothelmanager as DutyTemplateQuestBrothelManager;

    const class_level = dutytemplate.class();

    let critical;
    let disaster;
    if (class_level > 0) {
      // courtesan
      critical = [
        setup.trait.bg_courtesan,
        setup.trait.bg_royal,
        setup.trait.bg_noble,
        setup.trait.skill_connected,
        setup.trait.training_dominance_master,
      ];
      disaster = [
        setup.trait.bg_slave,
        setup.trait.bg_whore,
        setup.trait.bg_thug,
        setup.trait.per_lunatic,
      ];
    } else if (class_level < 0) {
      // whore
      critical = [
        setup.trait.bg_whore,
        setup.trait.bg_slave,
        setup.trait.per_sexaddict,
        setup.trait.training_obedience_master,
      ];
      disaster = [
        setup.trait.bg_courtesan,
        setup.trait.bg_noble,
        setup.trait.bg_royal,
        setup.trait.per_chaste,
        setup.trait.per_lunatic,
      ];
    } else {
      // in-between
      critical = [
        setup.trait.bg_informer,
        setup.trait.bg_entertainer,
        setup.trait.bg_artist,
        setup.trait.skill_entertain,
        setup.trait.training_horny_master,
      ];
      disaster = [setup.trait.per_lunatic, setup.trait.per_masochistic];
    }

    critical.push(setup.trait.value_high4);
    critical.push(setup.trait.value_high5);
    critical.push(setup.trait.value_high6);
    critical.push(setup.trait.value_high7);

    const sub = dutytemplate.sub();

    const req = [
      setup.qres.Job(setup.job.slave),
      setup.qres.Trait(setup.trait.training_obedience_advanced),
    ];

    if (sub == "sub") {
      critical.push(setup.trait.per_submissive);
      disaster.push(setup.trait.per_dominant);
    } else {
      critical.push(setup.trait.per_dominant);
      disaster.push(setup.trait.per_submissive);
    }

    if (dutytemplate.gender() == "male") {
      req.push(setup.qres.Trait("gender_male"));
    } else {
      req.push(setup.qres.Trait("gender_female"));
    }

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
