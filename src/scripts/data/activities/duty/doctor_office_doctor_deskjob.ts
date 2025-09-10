export default {
  key: "doctor_deskjob",
  name: "Doctor Deskjob",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.OnDuty("doctor")],
  },
  critical_traits: [],
  disaster_traits: [],
  restrictions: [],
  rarity: "common",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "a",
      texts: {
        friendly: [
          "<<ubusyshort $g.a>>. I\'m stocking up on medical supplies. You never want to run out of them.",
          "<<ugreetingshort $g.a>> came for a quick health checkup?",
        ],
        bold: [
          "<<ubusyshort $g.a>>. Need to plan ahead in case when we inevitably got an influx of injuries.",
          "<<ugreetingshort $g.a>> if you come for a checkup, just sit down and let me do my work.",
          "Come, let me give you a quick lookup.",
        ],
        cool: [
          "<<ubusyshort $g.a>>. Stocking up supplies.",
          "<<ugreetingshort $g.a>> checkup? Then sit down.",
        ],
        witty: [
          '<<ubusyshort $g.a>> checking up on all the essentials. It\'s always good to stock up on a potions for all sort of maladies, even "those" kind of maladies *wink*.',
          "<<ugreetingshort $g.a>> came for a quick health checkup? Just a moment then, I\'ll be back with my medical gag.",
        ],
        debauched: [
          "Why, if it isn\'t my favorite patient. Come for a full body checkup, have you hmm? Well then you can strip right away.",
          '<<ugreetingshort $g.a>> have you come for a medical check-up or for some "hospital fun"?',
          "Come closer and strip. It's doctor's orders.",
        ],
      },
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["doctoroffice"],
} satisfies ActivityTemplateDefinition;
