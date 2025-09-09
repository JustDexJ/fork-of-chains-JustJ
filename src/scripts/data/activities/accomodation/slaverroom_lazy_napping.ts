export default {
  key: "lazy_napping",
  name: "Lazy Napping",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
  },
  critical_traits: ["per_dreamy"],
  disaster_traits: ["per_attentive"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: ["Zzz...", "...Mmm...<<topic>>..."],
        bold: [
          "...Zzz...Grr, why you <<topic>>...Zzz...",
          "...Zzz...attack...zzz...",
        ],
        cool: ["...Zzz", "...Mmm..."],
        witty: ["...Zzz...", "...(yawn)...Zzz..."],
        debauched: ["...Zzz...mmm...yeah...", "...Oohh...<<topic>>...zzz..."],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["slaverroom"],
} satisfies ActivityTemplateDefinition;
