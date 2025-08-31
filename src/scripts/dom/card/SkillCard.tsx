import { Twee } from "../components/common";

export const SkillCard: Component<{ skill: Skill }> = (props) => {
  return (
    <>
      <header>
        {props.skill.renderIcon()} {setup.DOM.Util.namebold(props.skill)}
      </header>
      <Twee>{props.skill.getDescription()}</Twee>
    </>
  );
};

export default {
  skill(skill: Skill): DOM.Node {
    return setup.DOM.renderComponent(SkillCard, { skill });
  },
};
