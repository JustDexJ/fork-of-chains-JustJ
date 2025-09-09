export default {
  key: "forge_blacksmith2",
  name: "Forge Blacksmith",
  author: {
    name: "darko",
    url: "",
  },
  tags: [],
  actors: {
    a: [qres.Job("slaver")],
    b: { type: "contact", key: "blacksmithpeddler" },
  },
  critical_traits: ["skill_ambidextrous"],
  disaster_traits: ["per_kind"],
  restrictions: [],
  rarity: "rare",
  dialogues: [
    {
      /* Dialogue #1: */
      actor: "b",
      texts: [
        "Hey <<rep $unit.player>>, welcome to my smithy. Fancy a new armor?",
        "Hey <<rep $unit.player>>, welcome to my smithy. Just helping out <<rep $g.a>> here maintain <<their $g.a>> <<uweapon $g.a>>.",
        "Looking to protect yourself, or deal some damage?",
        "Do you know what\'s the hardest part of forging? It\'s the anvil.",
      ],
    } /* End of Dialogue #1 */,
  ],
  room_templates: ["forge"],
} satisfies ActivityTemplateDefinition;
