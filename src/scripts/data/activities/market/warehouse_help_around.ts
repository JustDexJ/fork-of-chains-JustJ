export default {
  key: "warehouse_help_around",
  name: "Warehouse Help Around",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [
      qres.Job("slaver"),
      qres.AnyTrait(
        ["muscle_strong", "muscle_verystrong", "muscle_extremelystrong"],
        true,
      ),
    ],
  },
  critical_traits: [
    "muscle_strong",
    "muscle_verystrong",
    "muscle_extremelystrong",
    "tough_tough",
    "per_humble",
    "per_direct",
    "per_slow",
  ],
  disaster_traits: [
    "muscle_thin",
    "muscle_verythin",
    "muscle_extremelythin",
    "tough_nimble",
    "per_proud",
    "per_sly",
  ],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "<<ugreetingshort $g.a>> come to join me helping out in the warehouse? Can\'t let these muscles go to waste!",
          "Hauling stuffs into the warehouse is sure hard work...",
        ],
        bold: [
          "<<ugreetingshort $g.a>> come to join me for a good workout? There\'s plenty of heavy objects to lift in the warehouse.",
          "Nggh!! And done! Damn, that was a heavy crate, I wonder what\'s inside...",
        ],
        cool: [
          "<<ugreetingshort $g.a>> I\'m just helping around.",
          "...hmmph! What a heavy crate...",
        ],
        witty: [
          "<<ugreetingshort $g.a>> what do you call a house that turns during a full moon? A werehouse...",
          "I wonder if I\'ll fit inside one of these crates...",
        ],
        debauched: [
          "<<ugreetingshort $g.a>> come to gaze at my muscles while I do hard work here?",
          "Is this where they store the booze around? I could use a bottle or three...",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["warehouse"],
} satisfies ActivityTemplateDefinition;
