export default {
  key: "mail_room_read_mail",
  name: "Mail Room Read Mail",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
  },
  critical_traits: ["per_gregarious", "bg_informer", "bg_boss"],
  disaster_traits: ["per_loner"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "<<ugreetingshort $g.a>> don\'t mind me. Just reading a mail from a friend.",
          "Hope to see you again, soon..., and done! Now I\'ll just have to send this mail.",
        ],
        bold: [
          "Who kept putting nude images in my letterbox?!",
          "Maybe I should post a slave or two to keep watch over my mailbox...",
        ],
        cool: ["Huh, a new mail for me.", "A mail for me? That\'s rare."],
        witty: [
          "Have you ever wondered <<unickname $g.a>> why someone would become a mailman? The wage may be low, but it\'s all about sending a message.",
          "Do they call the female mailman as mailwoman?",
        ],
        debauched: [
          "Ooh, a sexmail! I love those.",
          "Don\'t mind me <<unickname $g.a>>, just writing some totally normal letters.",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["mailroom"],
} satisfies ActivityTemplateDefinition;
