import type { DutyInstance } from "../../classes/duty/DutyInstance";
import { menuItemAction, menuItemText } from "../../ui/menuitem";

export default {
  dutyassign(duty: DutyInstance): DOM.Node {
    const units = State.variables.company.player
      .getUnits()
      .filter((unit) => duty.isCanUnitAssign(unit));
    return setup.DOM.Roster.show({
      menu: "unitduty",
      units: units,
      is_menu_generated_async: true,
      actions_callback: (unit) => {
        const menus = [];

        menus.push(
          menuItemAction({
            text: `Select`,
            callback: () => {
              State.variables.gUnitSelected_key = unit.key;
              duty.assignUnit(unit);
              setup.notify(`a|Rep a|is now assigned for ${duty.rep()}.`, {
                a: unit,
              });
              setup.DOM.Nav.gotoreturn();
            },
          }),
        );

        const fragments: DOM.Attachable[] = [];
        const skills = duty.getTemplate().getRelevantSkills();
        for (const skill_key of objectKeys(skills)) {
          const skill = setup.skill[skill_key];
          if (unit.getSkillFocuses().includes(skill)) {
            fragments.push(html`${skill.rep()}`);
          }
        }

        const traits = duty.getTemplate().getRelevantTraits();

        for (const trait_key of objectKeys(traits)) {
          const trait = setup.trait[trait_key];
          if (unit.isHasTraitExact(trait)) {
            if (traits[trait_key] ?? 0 > 0) {
              fragments.push(html`${trait.rep()}`);
            } else {
              fragments.push(html`${trait.repNegative()}`);
            }
          }
        }

        if (duty.getTemplate().isHasTriggerChance()) {
          fragments.push(html`
            Trigger chance:
            ${(duty.getTemplate().computeChanceForUnit(unit) * 100).toFixed(2)}%
          `);
        } else if (duty.getTemplate().isHasPrestigeAmount()) {
          fragments.push(html`
            ${setup.DOM.Util.prestige(
              duty.getTemplate().computeChanceForUnit(unit),
            )}
          `);
        }

        menus.push(
          menuItemText({
            text: setup.DOM.create("div", {}, fragments),
          }),
        );
        return menus;
      },
    });
  },
};
