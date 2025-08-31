import type { ActivityTemplate } from "../classes/activity/ActivityTemplate";
import type { BuildingTemplate } from "../classes/BuildingTemplate";
import type { UnitCriteria } from "../classes/criteria/UnitCriteria";
import type { MenuKey } from "../classes/filter/_filter";
import type { Lore } from "../classes/Lore";
import type { SkillKey } from "../classes/Skill";
import type { Title } from "../classes/title/Title";
import { FilterableList } from "../dom/components/misc/FilterableList";

export namespace DevToolHelper {
  const REGEX_STRIP_NEWLINE_1 = /^\n+|\n+$/g;
  const REGEX_STRIP_NEWLINE_2 = /\n+/g;

  export function stripNewLine(text: string): string {
    return text
      .replace(REGEX_STRIP_NEWLINE_1, "")
      .replace(REGEX_STRIP_NEWLINE_2, " ");
  }

  export function fixDisplay(text: string): string {
    return text.split("‘").join("'").split("’").join("'");
  }

  export function debugDevToolTwine(text: string): string {
    return setup.DevToolHelper.fixDisplay(
      setup.DevToolHelper.stripNewLine(text),
    );
  }

  export function escapeTwine(text: string): string {
    return text
      .split(":")
      .join("&#58;")
      .split("$")
      .join("&#36;")
      .split("<")
      .join("&#60;")
      .split(">")
      .join("&#62;")
      .split("=")
      .join("&#61;")
      .split("/")
      .join("&#47;")
      .split("‘")
      .join("'")
      .split("’")
      .join("'")
      .split("@")
      .join("&#64;")
      .split("_")
      .join("&#95;");
  }

  export function devToolFormat(text: string): string {
    return escapeTwine(setup.beautifyTwine(text).text)
      .split(" ")
      .join("&nbsp;");
  }

  export function getActors(): [displayname: string, variable: string][] {
    // keys: roles + actors + player

    const keys = State.variables
      .dtquest!.getAllActorNames()
      .map((actor_key): [string, string] => [actor_key, `$g.${actor_key}`]);

    if (State.variables.devtooltype === "interaction")
      keys.push(["Target", "$g.target"]);

    keys.push(["Player", "$unit.player"]);
    return keys;
  }

  /** returns { skill_key: [criteria list] } */
  export function getCriteriasMap(): {
    [k in SkillKey | "SLAVE"]?: UnitCriteria[];
  } {
    let res: { [k in SkillKey | "SLAVE"]?: UnitCriteria[] } = {};
    for (let i = 0; i < setup.skill.length; ++i) {
      res[setup.skill[i].key] = [];
    }
    for (let [qukey, qu] of objectEntries(setup.qu)) {
      let multis = qu.getSkillMultis();
      for (let i = 0; i < multis.length; ++i) {
        if (multis[i]) {
          res[setup.skill[i].key]!.push(qu);
        }
      }
    }

    // slave job
    res["SLAVE"] = [];
    for (let [qukey, qu] of objectEntries(setup.qu)) {
      let reqs = qu.getRestrictions();
      for (let i = 0; i < reqs.length; ++i) {
        let req = reqs[i];
        if (
          req instanceof setup.qresImpl.Job &&
          req.job_key == setup.job.slave.key
        ) {
          res["SLAVE"].push(qu);
          break;
        }
      }
    }

    return res;
  }

  /**
   * Opens a dialog to pick one or more traits
   * When closed, resolves the promise with the trait keys (might be empty)
   */
  export function pickTraits(
    traits?: Trait[],
    init_traits?: Trait[],
  ): Promise<Trait[]> {
    State.temporary.seltraits = [];
    return setup.Dialogs.open({
      title: "Pick traits",
      classnames: "trait-picker-dialog",
      content: setup.DOM.Menu.traitpickermulti({
        raw_traits: traits || Object.values(setup.trait),
        init_selected: init_traits || [],
        finish_callback: (selected) => {
          State.temporary.seltraits = selected;
          Dialog.close();
        },
      }),
    }).then(() => State.temporary.seltraits);
  }

  /**
   * Opens a dialog to pick a trait
   * When closed, resolves the promise with the trait keys (might be empty)
   */
  export function pickTrait(traits?: Trait[]): Promise<Trait> {
    State.temporary.seltrait = null;
    return setup.Dialogs.open({
      title: "Pick trait",
      classnames: "trait-picker-dialog",
      content: setup.DOM.Menu.traitpickersingle({
        raw_traits: traits || Object.values(setup.trait),
        finish_callback: (selected) => {
          State.temporary.seltrait = selected;
          Dialog.close();
        },
      }),
    }).then(() => State.temporary.seltrait);
  }

  /**
   * Opens a dialog to pick a lore
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickLore(): Promise<Lore> {
    return setup.Dialogs.open({
      title: "Pick lore",
      classnames: "trait-picker-dialog",
      passage: "LorePickerDialog",
    }).then(() => State.temporary.sellore);
  }

  /**
   * Opens a dialog to pick a building
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickBuilding(): Promise<BuildingTemplate> {
    return setup.Dialogs.open({
      title: "Pick building",
      classnames: "trait-picker-dialog",
      passage: "BuildingPickerDialog",
    }).then(() => State.temporary.selbuilding);
  }

  /**
   * Opens a dialog to pick an item
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickItem(): Promise<Item> {
    return setup.Dialogs.open({
      title: "Pick item",
      classnames: "trait-picker-dialog",
      passage: "ItemPickerDialog",
    }).then(() => State.temporary.selitem);
  }

  function dialogMaker<T extends { key: string | number; rep(): string }>(
    menu: MenuKey,
    objects: T[],
    temporary_varname: string,
  ) {
    delete State.temporary[temporary_varname];
    return setup.DOM.renderComponent(FilterableList, {
      menu: menu,
      filter_objects: objects,
      display_callback: (obj) => html`
        ${obj.rep()}
        ${setup.DOM.Nav.button(`Select`, () => {
          State.temporary[temporary_varname] = obj;
          Dialog.close();
        })}
      `,
    });
  }

  export function pickCompany() {
    return setup.Dialogs.open({
      title: "Pick company",
      classnames: "trait-picker-dialog",
      content: dialogMaker(
        "company",
        Object.values(State.variables.company),
        "selcompany",
      ),
    }).then(() => State.temporary.selcompany);
  }

  export function pickDutyTemplate() {
    return setup.Dialogs.open({
      title: "Pick duty template",
      classnames: "trait-picker-dialog",
      content: dialogMaker(
        "dutytemplate",
        Object.values(setup.dutytemplate),
        "seldutytemplate",
      ),
    }).then(() => State.temporary.seldutytemplate);
  }

  /**
   * Opens a dialog to pick a title
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickTitle(titles?: Title[]) {
    return setup.Dialogs.open({
      title: "Pick title",
      classnames: "trait-picker-dialog",
      content: dialogMaker(
        "title",
        titles || Object.values(setup.title),
        "seltitle",
      ),
    }).then(() => State.temporary.seltitle);
  }

  /**
   * Opens a dialog to pick an item pool
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickItemPool() {
    return setup.Dialogs.open({
      title: "Pick item pool",
      classnames: "trait-picker-dialog",
      content: dialogMaker(
        "itempool",
        Object.values(setup.itempool),
        "selitempool",
      ),
    }).then(() => State.temporary.selitempool);
  }

  /**
   * Opens a dialog to pick a lore
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickEquipment() {
    return setup.Dialogs.open({
      title: "Pick equipment",
      classnames: "trait-picker-dialog",
      passage: "EquipmentPickerDialog",
    }).then(() => State.temporary.selequipment);
  }

  /**
   * Opens a dialog to pick an equipment pool
   * When closed, resolves the promise with the lore (or undefined if cancelled)
   */
  export function pickEquipmentPool() {
    return setup.Dialogs.open({
      title: "Pick equipment pool",
      classnames: "trait-picker-dialog",
      content: dialogMaker(
        "equipmentpool",
        Object.values(setup.equipmentpool),
        "selequipmentpool",
      ),
    }).then(() => State.temporary.selequipmentpool);
  }

  /**
   * THIS IS USED IN MAIN BODY GAME TOO!
   * Don't be too hacky with this method.
   */
  export function saveScrollPos() {
    State.variables.qscrolly = document.documentElement.scrollTop;
  }

  /**
   * THIS IS USED IN MAIN BODY GAME TOO!
   * Don't be too hacky with this method.
   */
  export function restoreScrollPos() {
    setTimeout(function () {
      if (State.variables.qscrolly !== undefined) {
        const y = State.variables.qscrolly;
        document.documentElement.scroll(0, y);
        delete State.variables.qscrolly;
      }
    }, 1);
  }

  function clearQueue() {
    State.variables.devqueue = {};
  }

  function getQueue(passage: string) {
    if (!("devqueue" in State.variables)) {
      State.variables.devqueue = {};
    }
    let devqueue = State.variables.devqueue!;
    if (!(passage in devqueue)) {
      devqueue[passage] = [];
    }
    return devqueue[passage];
  }

  export function devQueue(passage: string, obj: any) {
    let queue = getQueue(passage);
    queue.push([State.variables.qPassageName, obj]);
    State.variables.qPassageName = passage;
  }

  export function devPop(passage: string) {
    let queue = getQueue(passage);
    if (!queue.length) {
      throw new Error(`Missing queue in ${passage}`);
    }
    let oldvar = queue.pop()!;
    State.variables.qPassageName = oldvar[0];
    return oldvar[1];
  }

  export function getPassageIndex(outcomedescs: string[], idx: number): number {
    while (idx && !outcomedescs[idx].trim()) --idx;
    return idx;
  }

  export function printActivityDialogues(template: ActivityTemplate): string {
    const dialogues = template.getDialogues();
    let dials = [];
    let i = 0;
    for (const dialogue of dialogues) {
      i += 1;

      let texts_text;
      if (
        [
          dialogue.texts.bold,
          dialogue.texts.cool,
          dialogue.texts.witty,
          dialogue.texts.debauched,
        ].filter((a) => a.length > 1 || a[0].trim().length > 0).length
      ) {
        const texts = [];
        for (const [textkey, textvalue] of objectEntries(dialogue.texts)) {
          const poss = textvalue.map((x) =>
            escapeTwine(setup.escapeJsString(x)),
          );
          texts.push(`&nbsp; &nbsp; ${textkey}: [
    ${poss.map((x) => `&nbsp; &nbsp; &nbsp; "${x.replace(/\n/g, " ")}",`).join("\n")}
    &nbsp; &nbsp; ],`);
        }
        texts_text = `{
    ${texts.join("\n")}
    &nbsp; }`;
      } else {
        const poss = dialogue.texts.friendly.map((x) =>
          escapeTwine(setup.escapeJsString(x)),
        );
        texts_text = `[
  ${poss.map((x) => `&nbsp; &nbsp; "${x.replace(/\n/g, " ")}",`).join("\n")}
        &nbsp; ]`;
      }

      dials.push(
        `{ """/* Dialogue #${i}: */"""
  &nbsp; actor: "${setup.escapeJsString(dialogue.actor)}",
  &nbsp; texts: ${texts_text},
  }, """/* End of Dialogue #${i} */"""`,
      );
    }
    return dials.join("\n");
  }
}
