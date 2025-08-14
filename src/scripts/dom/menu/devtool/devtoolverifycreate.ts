import type { ActivityTemplate } from "../../../classes/activity/ActivityTemplate";
import type { EventTemplate } from "../../../classes/event/EventTemplate";
import type { InteractionTemplate } from "../../../classes/interaction/InteractionTemplate";
import type { OpportunityTemplate } from "../../../classes/opportunity/OpportunityTemplate";

type ErrorDetails = Array<{
  title: string;
  errors: Array<{
    line: number;
    error: string;
    context: string | null;
  }>;
}>;

export function display_errors({
  error_details,
  continue_callback,
  is_retain_key,
}: {
  error_details: ErrorDetails;
  continue_callback?: Function;
  is_retain_key?: boolean;
}) {
  const fragments: DOM.Attachable[] = [];

  if (!error_details.length) {
    fragments.push(html`
      <p>
        Test is completed! No fatal errors found, but there may be textual
        errors. Please check the javascript console (Ctrl + Shift + J) for
        leftover errors.
      </p>
    `);
  } else {
    fragments.push(html`
      <p>We have detected the following formatting errors:</p>
    `);
  }

  for (const details of error_details) {
    fragments.push(html`
      <hr />
      <div><b>${details.title}</b></div>
    `);
    for (const error of details.errors) {
      fragments.push(html`
        <div>Line <b>${error.line}</b>: ${setup.escapeHtml(error.error)}</div>
        <small>
          <pre>
            ${error.context ? setup.escapeHtml(error.context) : ""}
          </pre
          >
        </small>
      `);
    }
  }

  if (continue_callback) {
    fragments.push(html`
      <hr />
      <div>
        Since this is a beta feature, you can ignore these errors and continue
        if you wish:
      </div>
      <div>
        ${setup.DOM.Nav.button(`Ignore these errors and continue`, () => {
          Dialog.close();
          continue_callback(is_retain_key);
        })}
      </div>
    `);
  }

  setup.Dialogs.open({
    title: `Errors encountered`,
    content: setup.DOM.create("div", {}, fragments),
  });
}

function continue_callback(is_retain_key?: boolean) {
  const sv = State.variables;
  const devtooltype = sv.devtooltype;
  const dtquest_raw = sv.dtquest!;

  if (devtooltype == "quest") {
    /* normalize role weights */
    const dtquest = dtquest_raw as QuestTemplate;
    const slavers =
      Object.keys(dtquest.getUnitCriterias()).filter(
        (actor) => dtquest.getActorResultJob(actor) == setup.job.slaver,
      ).length || 1;

    for (const actor_name of Object.keys(dtquest.getUnitCriterias())) {
      dtquest.unit_criteria_map[actor_name].offsetmod = 3.0 / slavers;
    }

    /* create passage names etc */
    if (is_retain_key && dtquest.old_key) {
      sv.qkey = dtquest.old_key;
    } else {
      sv.qkey = setup.getKeyFromName(
        dtquest.name,
        setup.questtemplate,
        is_retain_key,
      );
    }
    sv.qfilename = `${sv.qkey}.twee`;
    sv.qpassagesetup = `QuestSetup_${sv.qkey}`;
    sv.qpassagedesc = `Quest_${sv.qkey}`;
    sv.qpassageoutcomes = [
      `Quest_${sv.qkey}Crit`,
      `Quest_${sv.qkey}Success`,
      `Quest_${sv.qkey}Failure`,
      `Quest_${sv.qkey}Disaster`,
    ];
    setup.runSugarCubeCommand(`<<goto 'QGCreate'>>`);
  } else if (devtooltype == "opportunity") {
    const dtquest = dtquest_raw as OpportunityTemplate;
    sv.okey = setup.getKeyFromName(
      dtquest.name,
      setup.opportunitytemplate,
      is_retain_key,
    );

    /* create passage names */
    sv.qfilename = `${sv.okey}.twee`;
    sv.opassagesetup = `OpportunitySetup_${sv.okey}`;
    sv.opassagedesc = `Opportunity_${sv.okey}`;
    setup.runSugarCubeCommand(`<<goto 'OGCreate'>>`);
  } else if (devtooltype == "event") {
    const dtquest = dtquest_raw as EventTemplate;
    sv.ekey = setup.getKeyFromName(dtquest.name, setup.event, is_retain_key);

    /* create passage names etc */
    sv.qfilename = `${sv.ekey}.twee`;
    sv.epassagesetup = `EventSetup_${sv.ekey}`;
    sv.epassagedesc = `Event_${sv.ekey}`;
    setup.runSugarCubeCommand(`<<goto 'EGCreate'>>`);
  } else if (devtooltype == "interaction") {
    const dtquest = dtquest_raw as InteractionTemplate;
    sv.ikey = setup.getKeyFromName(
      dtquest.name,
      setup.interaction,
      is_retain_key,
    );

    /* create passage names etc */
    sv.qfilename = `${sv.ikey}.twee`;
    sv.ipassagesetup = `InteractionSetup_${sv.ikey}`;
    sv.ipassagedesc = `Interaction_${sv.ikey}`;
    setup.runSugarCubeCommand(`<<goto 'IGCreate'>>`);
  } else if (devtooltype == "activity") {
    const dtquest = dtquest_raw as ActivityTemplate;

    sv.akey = setup.getKeyFromName(
      dtquest.name,
      setup.activitytemplate,
      is_retain_key,
    );

    /* create passage names etc */
    sv.qfilename = `${sv.akey}.twee`;
    sv.apassagesetup = `ActivitySetup_${sv.akey}`;
    sv.apassagedesc = `Activity_${sv.akey}`;
    setup.runSugarCubeCommand(`<<goto 'AGCreate'>>`);
  } else {
    throw new Error(`Unrecognized devtooltype: ${devtooltype}`);
  }
}

export function get_errors_from_texts_to_check(
  texts_to_check: Record<string, string>,
  set_to?: Record<string, { obj: {}; field: string | number }>,
): ErrorDetails {
  const error_details = [];
  for (const check_key in texts_to_check) {
    const check_value = texts_to_check[check_key];
    const result = setup.beautifyTwine(check_value);
    if (result.errors.length) {
      error_details.push({
        title: check_key,
        errors: result.errors,
      });
    }
    if (!result.errors.length && set_to) {
      const aobj = set_to[check_key];
      (aobj.obj as any)[aobj.field] = result.text;
    }
  }
  return error_details;
}

export const DOM_Menu_devtoolverifycreate = function (
  is_retain_key?: boolean,
): void {
  const sv = State.variables as any;
  const devtooltype = sv.devtooltype;

  const texts_to_check: Record<string, string> = {};
  const set_to: Record<string, { obj: {}; field: number | string }> = {};
  if (devtooltype == "quest") {
    texts_to_check["Description"] = sv.qdesc;
    set_to["Description"] = {
      obj: sv,
      field: "qdesc",
    };
    for (let i = 0; i < setup.QUEST_OUTCOMES.length; ++i) {
      const key = `Outcome ${setup.QUEST_OUTCOMES[i]}`;
      texts_to_check[key] = sv.qoutcomedesc[i];
      set_to[key] = {
        obj: sv.qoutcomedesc,
        field: i,
      };
    }
  } else if (devtooltype == "opportunity") {
    const dtquest = sv.dtquest as OpportunityTemplate;
    texts_to_check["Description"] = sv.odesc;
    set_to["Description"] = {
      obj: sv,
      field: "odesc",
    };
    for (let i = 0; i < dtquest.options.length; ++i) {
      const option_key = `Option Title #${i + 1}`;
      texts_to_check[option_key] = sv.ooptiontitle[i];
      set_to[option_key] = {
        obj: sv.ooptiontitle,
        field: i,
      };
      if (sv.ooptiondesc[i]) {
        const option_desc_key = `Option Description #${i + 1}`;
        texts_to_check[option_desc_key] = sv.ooptiondesc[i];
        set_to[option_desc_key] = {
          obj: sv.ooptiondesc,
          field: i,
        };
      }
    }
  } else if (devtooltype == "event") {
    texts_to_check["Description"] = sv.edesc;
    set_to["Description"] = {
      obj: sv,
      field: "edesc",
    };
  } else if (devtooltype == "interaction") {
    texts_to_check["Description"] = sv.idesc;
    set_to["Description"] = {
      obj: sv,
      field: "idesc",
    };
  } else if (devtooltype == "activity") {
    const dtquest = sv.dtquest as ActivityTemplate;
    for (let i = 0; i < dtquest.dialogues.length; ++i) {
      for (const speech_key of objectKeys(dtquest.dialogues[i].texts)) {
        for (
          let j = 0;
          j < dtquest.dialogues[i].texts[speech_key].length;
          ++j
        ) {
          const key = `Variant #${j + 1} of Dialogue #${i + 1} for ${speech_key}`;
          texts_to_check[key] = dtquest.dialogues[i].texts[speech_key][j];
          set_to[key] = {
            obj: dtquest.dialogues[i].texts[speech_key],
            field: j,
          };
        }
      }
    }
  } else {
    throw new Error(`Unrecognized dev tool type: ${devtooltype}`);
  }

  const error_details = get_errors_from_texts_to_check(texts_to_check, set_to);

  if (error_details.length) {
    display_errors({
      error_details: error_details,
      continue_callback: continue_callback,
      is_retain_key: is_retain_key,
    });
  } else {
    continue_callback(is_retain_key);
  }
};
