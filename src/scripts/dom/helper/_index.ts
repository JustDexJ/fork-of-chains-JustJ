import append from "./append";
import quest from "./quest";
import replace from "./replace";

/**
 * Contains all DOM util that DOES NOT return a setup.DOM.Node
 */
export const DOM_Helper = {
  ...append,
  ...quest,
  ...replace,
};
