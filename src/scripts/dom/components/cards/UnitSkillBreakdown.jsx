/* eslint-disable no-irregular-whitespace */

import { Rep } from "../common"

/**
 * @param {number} value
 * @param {string} text
 * @return {setup.DOM.Node}
 */
function format_value(value, text) {
  if (value > 0) {
    return setup.DOM.Text.successlite(text)
  } else if (value < 0) {
    return setup.DOM.Text.dangerlite(text)
  } else {
    return html`${text}`
  }
}

/**
 * @param {number} total 
 * @param {number} base_total 
 * @return {setup.DOM.Node}
 */
function format_total(total, base_total) {
  return html`<b>${format_value(total - base_total, String(total))}</b>`
}

/**
 * @param {number} value 
 * @return {setup.DOM.Node}
 */
function format_change(value) {
  return format_value(value, value < 0 ? String(value) : `+${value}`)
}

/**
 * @param {number} percent 
 * @return {setup.DOM.Node}
 */
function format_percentage(percent) {
  const text = setup.DOM.Text.percentage(percent)
  return format_value(percent, percent < 0 ? text : `+${text}`)
}

/**
 * @type {Component<{ unit: setup.Unit, skill: setup.Skill }>}
 */
export const UnitSkillBreakdown = ({ unit, skill }) => {
  const skill_key = skill.key

  const skill_base = unit.getSkillsBase()[skill_key]
  const base_breakdown = unit.getSkillsBaseBreakdown()[skill_key]

  const mods = unit.getSkillModifiers()[skill_key]
  const mod_breakdown = unit.getSkillModifiersBreakdown()[skill_key]
  mod_breakdown.sort((a, b) => b.value - a.value)

  const skill_after_mods = Math.floor((1 + mods) * skill_base)

  const adds = unit.getSkillAdditives()[skill_key]
  const add_breakdown = unit.getSkillAdditivesBreakdown()[skill_key]
  add_breakdown.sort((a, b) => b.value - a.value)

  const skill_final = unit.getSkill(skill)

  const val_base = () => format_total(skill_base, skill_base)
  const val_after_mods = () => format_total(skill_after_mods, skill_base)
  const val_after_adds = () => format_total(skill_final, skill_base)

  return (
    <div class="unit-skill-breakdown">
      <div>
        Breakdown of {setup.DOM.toDOM(unit.rep())}'s <Rep of={skill} />
      </div>
      <div>
        <header>Base value: {val_base()}</header>
        <ul>
          {base_breakdown.map(breakdown => (<li>{breakdown.title}: {format_change(breakdown.value)}</li>))}
        </ul>
        <header>Modifiers: {format_percentage(mods)} {'   '} ({val_base()} → {val_after_mods()})</header>
        <ul>
          {mod_breakdown.map(breakdown => (<li>{setup.DOM.toDOM(breakdown.title)}: {format_percentage(breakdown.value)}</li>))}
        </ul>
        <header>Additive modifiers: {format_change(adds)} {'   '} ({val_after_mods()} → {val_after_adds()})</header>
        <ul>
          {add_breakdown.map(breakdown => (<li>{setup.DOM.toDOM(breakdown.title)}: {format_change(breakdown.value)}</li>))}
        </ul>
        <header>Final value: {val_after_adds()}</header>
      </div>
    </div>
  )
}
