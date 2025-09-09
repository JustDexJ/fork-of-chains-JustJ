export default {
  key: "market_browse_wares",
  name: "Market Browse Wares",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
  },
  critical_traits: ["per_frugal", "per_sly", "bg_merchant"],
  disaster_traits: ["per_lavish", "per_direct"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "I wonder if I could get a better deal somewhere else...",
          "Oh, that tomato looks very fresh... And that one too, and that one to... One of everything, please!",
        ],
        bold: [
          "<<set _m = random(50, 150)>><<money _m>> for a piece of carrot? Ridiculous! Lower the price this instant!",
          "You dare charging this outrageous price for a banana? Do you know who I am?",
        ],
        cool: [
          "...I\'ll get one of these, thanks.",
          "How much for this piece of meat?",
        ],
        witty: [
          "<<ugreetingshort $g.a>>, I saw an attractive merchant selling honey over the market. I think <<they $g.a>> might be... a keeper.",
          "<<ugreetingshort $g.a>> browsing the fresh market today? I hope your day is... fruitful.",
        ],
        debauched: [
          "That is some long, thick cucumber you have there...",
          "Ah no, I\'m not looking for a jerky. I\'m looking for a... higher quality piece of meat, maybe something you hid under the stall...",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["market"],
} satisfies ActivityTemplateDefinition;
