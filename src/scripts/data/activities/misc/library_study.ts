export default {
  key: "library_study",
  name: "Library Study",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
  },
  critical_traits: ["bg_scholar", "bg_wiseman", "per_studious", "per_logical"],
  disaster_traits: ["per_active", "per_empath"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: ["It\'s so quiet here...", "What an engrossing read..."],
        bold: [
          "One day my name will be written in the history books.",
          "The library is really the best place for a nap... zzz...",
        ],
        cool: ["Interesting book.", "That was a good read."],
        witty: [
          "What's the difference between cats and a comma? Cats have claws at the end of their paws and commas are a pause at the end of a clause.",
          "Past, present, and future walked into a bar. It was tense.",
          "<<unickname $g.a>>, comma her for a bit and join me for a period.",
        ],
        debauched: [
          "I wonder when will the raunchy part starts...",
          "I think I\'ve stored my secret world-domination book here somewhere...",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["library"],
} satisfies ActivityTemplateDefinition;
