import { qc, qres } from "../../_init/preinit_costrestrictions";
import type { ItemDefinition } from "../../classes/inventory/Item";
import { Constants } from "../../constants";

export default definitions<ItemDefinition>()({
  potion_submissive_cure: {
    name: "Potion of Submissive Cure",
    type: "usable",
    description:
      "A very rare potion, it is said that certain correctional facility uses this potion liberally to alter the prisoner's minds. Gives a quest that can remove the " +
      "<<rep setup.trait.per_submissive>> " +
      "trait from a slaver",
    value: Math.round(48 * Constants.MONEY_PER_SLAVER_WEEK) /* value */,
    restrictions: [
      /* restrictions */
      qres.ExistUnit([
        qres.Job("slaver"),
        qres.Trait("per_submissive"),
        qres.NotYou(),
      ]),
      qres.NoQuest("slaver_training__submission_cure"),
    ],
    effects: [/* effects */ qc.QuestDirect("slaver_training__submission_cure")],
    tags: [],
  },
});
