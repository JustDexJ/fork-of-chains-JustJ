export default {
  key: "tidying_up_bedroom",
  name: "Tidying Up Bedroom",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
  },
  critical_traits: ["per_attentive"],
  disaster_traits: ["per_dreamy"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "Fold the sheet, and bed all prepared!",
          "It\'s been a while since I air my pillow out.",
        ],
        bold: [
          "<<ugreetingshort $g.a>> come to help me tidy my room up?",
          "Take that! And that! Bed bugs be gone!",
        ],
        cool: [
          "Move pillow here, blanket here, and done.",
          "<<ubusyshort $g.a>> cleaning my room.",
        ],
        witty: [
          "Why do I need to tidy up my room if it\'s going to be messy again come tomorrow morning?",
          "Well I suppose having a tidier room couldn\'t hurt...",
        ],
        debauched: [
          "Ugh, is that another cumstain I see at the corner of my room?",
          "<<ugreetingshort $g.a>> if you come for sex you\'re in luck. I haven\'t tidied up my bed!",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["slaverroom"],
} satisfies ActivityTemplateDefinition;
