export default {
  key: "sparring",
  name: "Sparring",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
    b: [
      qres.Job("slaver"),
      qres.NoTraits(
        [
          "per_dreamy",
          "per_cautious",
          "per_submissive",
          "muscle_extremelythin",
          "muscle_verythin",
          "height_dwarf",
        ],
        true,
      ),
    ],
  },
  critical_traits: [
    "height_giant",
    "height_tall",
    "muscle_strong",
    "muscle_verystrong",
    "muscle_extremelystrong",
    "per_brave",
    "per_active",
    "skill_ambidextrous",
  ],
  disaster_traits: [
    "muscle_verythin",
    "muscle_extremelythin",
    "muscle_thin",
    "height_dwarf",
    "height_short",
    "per_cautious",
    "per_studious",
    "per_submissive",
    "per_masochistic",
  ],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "Thanks for coming to spar with me, now let\'s start. Here I come!",
          "Thanks for joining in my daily training. Let\'s start, here I go!",
        ],
        bold: [
          "You\'re foolish enough to think you can beat me in a sparring match. Defend yourself!",
          "You think you can beat me even in a sparring contest? I\'ll change your mind now, ready or not here I come!",
        ],
        cool: [
          "Let\'s start the sparring. Here I go...",
          "Well then, let\'s start the sparring practice. Yaah!!",
        ],
        witty: [
          "I didn\'t expect <<unickname $g.a>> to come over and watch us spar. There goes the plan to lazy around instead. Heh, just kidding. Prepare yourself!",
          "A sparring fight? Perfect, time to show you just what I can do. En garde!",
        ],
        debauched: [
          "This is just a sparring fight, so go easy on little old me. Now here I go...",
          "I know this is just a sparring fight, but seeing you in workout clothes is... quite something, you know that? But we came here to spar so, here I go!",
        ],
      },
    } /* End of Dialogue #1 */,
    {
      /* Dialogue #2: */
      actor: "b",
      texts: {
        friendly: [
          "Let\'s not injure ourselves, and take it slow.",
          "Careful, don\'t want to injure yourself during practice.",
        ],
        bold: [
          "Heh, taste my <<uweapon $g.b>>!",
          "How foolish, you think I know how to hold back? Well, taste defeat!",
        ],
        cool: [
          "...heh, this will be good practice.",
          "...I won\'t hold back too much.",
        ],
        witty: [
          "Risking current injuries for future injury avoidance? Sign me up!",
          "I\'m good at everything theatrics, mock battles included!",
        ],
        debauched: [
          "I\'ll try to be gentle — don\'t want your blood on my <<uhands $g.b>> after all.",
          "How foolish. Here I come!",
        ],
      },
    } /* End of Dialogue #2 */,
  ],
  room_templates: ["traininggrounds"],
} satisfies ActivityTemplateDefinition;
