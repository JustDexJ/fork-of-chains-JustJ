export default {
  key: "grand_hall_gossip",
  name: "Great Hall Gossip",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [
      qres.Job("slaver"),
      qres.BestFriendFriendshipAtLeast(300),
      qres.BestFriend(qres.And([qres.Available()])),
      qres.RememberUnit(),
    ],
    b: [qres.Job("slaver"), qres.BestFriendWithRememberedUnit()],
  },
  critical_traits: ["per_gregarious", "per_curious"],
  disaster_traits: ["per_loner", "per_stubborn"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "Hey <<rep $g.b>>! Did you hear about the recent news on <<topic>>?",
          "...and then I watched the poor sod who tried to rob me fell into the river. I actually felt a little bad for <<them $g.b>>.",
        ],
        bold: [
          "Friend! Did you saw what I did during last quest?",
          "...and I swung my <<uweapon $g.a>>. THWACK, and that\'s one more slave for our company.",
        ],
        cool: [
          "Friend, good to see you.",
          "...and the bandits never saw us coming.",
        ],
        witty: [
          "Hey friend! Have you ever wondered where to find the war key to open the war lock?",
          "...I once saw a tall dwarf. Clearly a frawd.",
        ],
        debauched: [
          "Hey friend! Come closer, don\'t be shy...",
          "...and i pulled the slave\'s leash while I fuck \'em hard! It was fun.",
        ],
      },
    } /* End of Dialogue #1 */,
    {
      /* Dialogue #2: */
      actor: "b",
      texts: {
        friendly: [
          "Heh, never change, <<rep $g.a>>.",
          "That\'s my friend, <<rep $g.a>>.",
        ],
        bold: [
          "Sure, but did you hear what I did on the last mission?",
          "Hah fun! Well if it were me I\'d...",
        ],
        cool: ["Nice.", "Good one."],
        witty: ["Haha!", "Oof, nice."],
        debauched: [
          "That could have been much worse.",
          "Sure, let\'s talk a bit more later, maybe in my room...",
        ],
      },
    } /* End of Dialogue #2 */,
  ],
  room_templates: ["greathall"],
} satisfies ActivityTemplateDefinition;
