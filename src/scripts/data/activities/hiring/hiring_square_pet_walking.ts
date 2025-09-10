export default {
  key: "fort_square_pet_walking",
  name: "Fort Square Pet Walking",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver"), qres.RememberUnit()],
    pet: [
      qres.Job("slave"),
      qres.CanBeUsedByRememberedUnit(),
      qres.AnyTrait(
        ["training_pet_basic", "training_pet_advanced", "training_pet_master"],
        true,
      ),
    ],
  },
  critical_traits: ["per_playful", "per_dominant", "skill_animal", "per_evil"],
  disaster_traits: [
    "per_honorable",
    "per_submissive",
    "per_serious",
    "per_loner",
  ],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "<<ugreetingshort $g.a>> just ensuring our little pet her get pet|their daily dose of sunlight.",
          "<<ugreetingshort $g.a>> would you like to walk our <<urace $g.pet>> dog together?",
        ],
        bold: [
          "Walk faster, you worthless pet!",
          "Time for some walkies, pet!",
        ],
        cool: [
          "Walk faster, pet.",
          "<<ubusyshort $g.a>> walking the pet. Someone has to.",
        ],
        witty: [
          "Who's a good pet? Yes! Yes you are!",
          "No whining! Wag your tail more! Bad pet!",
          "<<ugreetingshort $g.a>> come to join me on the totally normal chore of walking our <<urace $g.pet>> pet?",
        ],
        debauched: [
          "No whining, you slutty pet! You just had your <<ucum $g.a>> lunch!",
          "Aww, slutty pet wants some relief? Maybe after the walk is done, if I\'m feeling particulary generous.",
        ],
      },
    } /* End of Dialogue #1 */,
    {
      /* Dialogue #2: */
      actor: "pet",
      texts: ["<<upetwhine $g.pet>>"],
    } /* End of Dialogue #2 */,
  ],
  room_templates: ["hiringsquare"],
} satisfies ActivityTemplateDefinition;
