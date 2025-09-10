import type { RarityKey } from "../deck/Rarity";
import type { JobKey } from "../job/Job";
import type { RoomTemplateKey } from "../room/RoomTemplate";

// create a bunch of fucking-related activities.
export const ActivityTemplateInitFuck = function () {
  const rarity_default: RarityKey = "rare";
  const veryrare: RarityKey = "epic";

  const authordata: AuthorInfo = {
    name: "Innoxia",
    url: "https://lilithsthrone.blogspot.com/",
  };

  const horny_c: TraitKey[] = ["per_lustful", "per_sexaddict"];
  const horny_d: TraitKey[] = [];
  const cruel_c: TraitKey[] = ["per_cruel"];
  const cruel_d: TraitKey[] = ["per_kind", "per_honorable"];
  const weird_c: TraitKey[] = ["per_lunatic", "per_playful"];
  const weird_d: TraitKey[] = ["per_stubborn"];

  const default_horny_abuse_crit = horny_c.concat(cruel_c);
  const default_horny_abuse_disaster = horny_d.concat(cruel_d);

  const slave_rooms: RoomTemplateKey[] = ["dungeons"];
  const slaver_rooms: RoomTemplateKey[] = ["lodgings"];

  const fucks: Array<{
    name: string;
    rooms: RoomTemplateKey[];
    crits: TraitKey[];
    disaster: TraitKey[];
    type: JobKey;
    unit_bodypart: SexBodypart;
    target_bodypart: SexBodypart;
    restriction?: Restriction[];
    rarity?: RarityKey;
  }> = [
    {
      name: "Fuck a slave",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.vagina,
    },
    {
      name: "Buttfuck a slave",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.anus,
      restriction: [setup.qres.HasItem(setup.item.sexmanual_bodypart_anus)],
    },
    {
      name: "Tailfuck a slave",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit.concat(weird_c),
      disaster: default_horny_abuse_disaster.concat(weird_d),
      type: "slave",
      rarity: veryrare,
      unit_bodypart: setup.sexbodypart.tail,
      target_bodypart: setup.sexbodypart.vagina,
      restriction: [setup.qres.HasItem(setup.item.sexmanual_bodypart_tail)],
    },
    {
      name: "Anal Tailfuck a slave",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit.concat(weird_c),
      disaster: default_horny_abuse_disaster.concat(weird_d),
      type: "slave",
      rarity: veryrare,
      unit_bodypart: setup.sexbodypart.tail,
      target_bodypart: setup.sexbodypart.anus,
      restriction: [
        setup.qres.HasItem(setup.item.sexmanual_bodypart_tail),
        setup.qres.HasItem(setup.item.sexmanual_bodypart_anus),
      ],
    },
    {
      name: "Facefuck a slave",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.mouth,
    },
    {
      name: "Have a slave eat you out",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      unit_bodypart: setup.sexbodypart.vagina,
      target_bodypart: setup.sexbodypart.mouth,
      restriction: [
        setup.qres.HasItem(setup.item.sexmanual_penetration_mouthhole),
      ],
    },
    {
      name: "Have a slave fuck you",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      unit_bodypart: setup.sexbodypart.vagina,
      target_bodypart: setup.sexbodypart.penis,
    },
    {
      name: "Have a slave tailfuck you",
      rooms: slave_rooms,
      crits: default_horny_abuse_crit,
      disaster: default_horny_abuse_disaster,
      type: "slave",
      rarity: veryrare,
      unit_bodypart: setup.sexbodypart.vagina,
      target_bodypart: setup.sexbodypart.tail,
      restriction: [setup.qres.HasItem(setup.item.sexmanual_bodypart_tail)],
    },
    {
      name: "Consensual vaginal",
      rooms: slaver_rooms,
      crits: horny_c,
      disaster: horny_d,
      type: "slaver",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.vagina,
    },
    {
      name: "Consensual anal",
      rooms: slaver_rooms,
      crits: horny_c,
      disaster: horny_d,
      type: "slaver",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.anus,
      restriction: [setup.qres.HasItem(setup.item.sexmanual_bodypart_anus)],
    },
    {
      name: "Consensual anal tailfuck",
      rooms: slaver_rooms,
      crits: horny_c.concat(weird_c),
      disaster: horny_d.concat(weird_d),
      type: "slaver",
      rarity: veryrare,
      unit_bodypart: setup.sexbodypart.tail,
      target_bodypart: setup.sexbodypart.anus,
      restriction: [
        setup.qres.HasItem(setup.item.sexmanual_bodypart_tail),
        setup.qres.HasItem(setup.item.sexmanual_bodypart_anus),
      ],
    },
    {
      name: "Consensual tailfuck",
      rooms: slaver_rooms,
      crits: horny_c.concat(weird_c),
      disaster: horny_d.concat(weird_d),
      type: "slaver",
      rarity: veryrare,
      unit_bodypart: setup.sexbodypart.tail,
      target_bodypart: setup.sexbodypart.vagina,
      restriction: [setup.qres.HasItem(setup.item.sexmanual_bodypart_tail)],
    },
    {
      name: "Consensual oral",
      rooms: slaver_rooms,
      crits: horny_c,
      disaster: horny_d,
      type: "slaver",
      unit_bodypart: setup.sexbodypart.penis,
      target_bodypart: setup.sexbodypart.mouth,
    },
    {
      name: "Consensual cunnilingus",
      rooms: slaver_rooms,
      crits: horny_c,
      disaster: horny_d,
      type: "slaver",
      unit_bodypart: setup.sexbodypart.vagina,
      target_bodypart: setup.sexbodypart.mouth,
      restriction: [
        setup.qres.HasItem(setup.item.sexmanual_penetration_mouthhole),
      ],
    },
  ];

  for (const fuckdata of fucks) {
    let bres: Restriction[] = [];

    if (fuckdata.type == "slave") {
      bres = [setup.qres.Job("slave"), setup.qres.CanBeUsedByRememberedUnit()];
      if (fuckdata.target_bodypart == setup.sexbodypart.penis) {
        bres.push(
          setup.qres.AnyTrait(
            [
              setup.trait.dick_tiny,
              setup.trait.dick_small,
              setup.trait.dick_medium,
              setup.trait.dick_large,
              setup.trait.dick_huge,
              setup.trait.dick_titanic,
            ],
            true,
          ),
        );
      }
    } else if (fuckdata.type == "slaver") {
      bres = [
        setup.qres.Job("slaver"),
        setup.qres.NoTrait(setup.trait.per_chaste),
      ];
    }
    bres = bres.concat(fuckdata.target_bodypart.getHasRestrictions());

    const dialogue_a: DialogueRaw = {
      actor: "a",
      texts: [
        `<<set _dialogue = setup.Text.Dirty.talk({strip: true, unit: $g.a, target: $g.b, unit_bodypart: setup.sexbodypart.${fuckdata.unit_bodypart.key}, target_bodypart: setup.sexbodypart.${fuckdata.target_bodypart.key}})>> <<= _dialogue.unit_dialogue >>`,
      ],
    };

    const dialogue_b: DialogueRaw = {
      actor: "b",
      texts: [
        `<<set _dialogue = setup.Text.Dirty.talk({strip: true, unit: $g.a, target: $g.b, unit_bodypart: setup.sexbodypart.${fuckdata.unit_bodypart.key}, target_bodypart: setup.sexbodypart.${fuckdata.target_bodypart.key}})>> <<= _dialogue.target_dialogue >>`,
      ],
    };

    new setup.ActivityTemplate({
      key: setup.getKeyFromName(fuckdata.name, setup.activitytemplate),
      name: fuckdata.name,
      author: authordata,
      tags: [],
      actors: {
        a: [
          setup.qres.Job("slaver"),
          setup.qres.NoTrait(setup.trait.per_chaste),
          setup.qres.RememberUnit(),
        ].concat(fuckdata.unit_bodypart.getHasRestrictions()),
        b: bres,
      },
      critical_traits: fuckdata.crits,
      disaster_traits: fuckdata.disaster,
      restrictions: fuckdata.restriction || [],
      rarity: fuckdata.rarity ? fuckdata.rarity : rarity_default,
      dialogues: [dialogue_a, dialogue_b],
      room_templates: fuckdata.rooms,
    });
  }
};
