export default {
  key: "noticeboards_gossip",
  name: "Noticeboards Gossip",
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
          "<<ugreetingshort $g.a $g.b>> come see this post! You\'ll probably like it!",
          "<<ugreetingshort $g.a $g.b>> fancy meeting you here! Any interesting news on the noticeboards?",
        ],
        bold: [
          "<<ugreetingshort $g.a $g.b>> come see this post! I think it might be profitable, and I\'m never wrong about this kind of thing.",
          "Faster, <<name $g.b>>! Read this notice now!",
        ],
        cool: ["Take a look at this.", "Check this request out."],
        witty: [
          "<<name $g.b>>, my friend, you fancy some easy coin? Check this request out!",
          "<<name $g.b>>, this looks like the job for a <<urace $g.b>> like you!",
        ],
        debauched: [
          "<<name $g.b>>, don\'t be shy, come closer and take a look at this post...",
          "<<ugreetingshort $g.a $g.b>> now come closer and take a look at what I found. *winks*",
        ],
      },
    } /* End of Dialogue #1 */,
    {
      /* Dialogue #2: */
      actor: "b",
      texts: {
        friendly: [
          "Ohh, that\'s a good find! But <<unickname $g.b>> will probably make us work tomorrow...",
          "Hahaha, that\'s actually really funny!",
        ],
        bold: [
          "Rescuing a cat? What am I, a low wage do-gooder?",
          "Someone lost their cake? And you want me, the great <<name $g.b>>, to take this job?",
        ],
        cool: [
          "Heh, that\'s nice. Short on time though.",
          "...not good enough. Any others?",
        ],
        witty: [
          "...I\'m not going to ask why there\'s someone out there asking for a bottle of ogre \"oil\".",
          "All the postings on the notice board are bad. They\'re making me... board.",
        ],
        debauched: [
          "A request for a <<beautiful $g.b>> escort, hmm?",
          "A request to find a missing cat? I wonder why the cat escapes in the first place...",
        ],
      },
    } /* End of Dialogue #2 */,
  ],
  room_templates: ["noticeboards"],
} satisfies ActivityTemplateDefinition;
