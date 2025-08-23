import type { FamilyRelationDefinition } from "../classes/family/FamilyRelation";

export const FAMILY_RELATION_DEFINTIONS =
  definitions<FamilyRelationDefinition>()({
    brother: {
      name: "brother",
      tags: ["sibling"],
      nicknames: {
        friendly: ["brother"],
        bold: ["brother", "bro"],
        cool: ["brother"],
        witty: ["brother", "brudder"],
        debauched: ["brother", "bub"],
      },
    },

    sister: {
      name: "sister",
      tags: ["sibling"],
      nicknames: {
        friendly: ["sis", "sister"],
        bold: ["sis", "sister"],
        cool: ["sister"],
        witty: ["sis"],
        debauched: ["sis"],
      },
    },

    twinbrother: {
      name: "twin brother",
      tags: ["twin", "sibling"],
      nicknames: {
        friendly: ["brother"],
        bold: ["brother", "bro"],
        cool: ["brother"],
        witty: ["brother", "brudder"],
        debauched: ["brother", "bub"],
      },
    },

    twinsister: {
      name: "twin sister",
      tags: ["twin", "sibling"],
      nicknames: {
        friendly: ["sis", "sister"],
        bold: ["sis", "sister"],
        cool: ["sister"],
        witty: ["sis"],
        debauched: ["sis"],
      },
    },

    father: {
      name: "father",
      tags: ["parent"],
      nicknames: {
        friendly: ["father", "dad", "daddy", "papa"],
        bold: ["father", "dad", "pops"],
        cool: ["father"],
        witty: ["dad", "pops", "poppa"],
        debauched: ["dad", "pops", "poppa"],
      },
    },

    mother: {
      name: "mother",
      tags: ["parent"],
      nicknames: {
        friendly: ["mom", "mum", "mama", "mother"],
        bold: ["mom", "mum"],
        cool: ["mother"],
        witty: ["mum"],
        debauched: ["mum", "mommykins"],
      },
    },

    son: {
      name: "son",
      tags: ["child"],
      nicknames: {
        friendly: ["son", "sonny"],
        bold: ["little man", "boy"],
        cool: ["son"],
        witty: ["sonny", "junior", "prince"],
        debauched: ["little", "sonny", "boy", "princey"],
      },
    },

    daughter: {
      name: "daughter",
      tags: ["child"],
      nicknames: {
        friendly: ["daughter"],
        bold: ["daughter", "girly"],
        cool: ["daughter"],
        witty: ["girly", "flower", "cake", "princess"],
        debauched: ["princess", "gurl", "little"],
      },
    },
  });
