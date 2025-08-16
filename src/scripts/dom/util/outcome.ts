import type { QuestOutcome } from "../../classes/quest/QuestTemplate";

export default {
  /**
   * <<favor>>
   * Formats favor amount.
   */
  outcome(outcome: QuestOutcome): DOM.Node {
    if (outcome == "crit") {
      return setup.DOM.Text.success("Critical Success");
    } else if (outcome == "success") {
      return setup.DOM.Text.successlite("Success");
    } else if (outcome == "failure") {
      return setup.DOM.Text.dangerlite("Failure");
    } else {
      return setup.DOM.Text.danger("Disaster");
    }
  },
};
