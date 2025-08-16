import type { SpeechDefinition } from "../classes/Speech";

export const SPEECHES_DEFINITIONS = typedObject<SpeechDefinition>()({
  friendly: {
    key: "friendly",
    name: "Friendly",
    description: "Pleasant to others",
    traits: [
      "bg_noble",
      "bg_royal",
      "bg_informer",
      "bg_priest",
      "bg_healer",
      "bg_merchant",
      "per_gregarious",
      "per_lavish",
      "per_humble",
      "per_kind",
      "per_dreamy",
      "per_empath",
      "per_submissive",
    ],
  },

  bold: {
    key: "bold",
    name: "Bold",
    description: "Held themselves in high regards",
    traits: [
      "bg_seaman",
      "bg_knight",
      "per_loyal",
      "per_aggressive",
      "per_proud",
      "per_brave",
      "per_honorable",
      "per_stubborn",
      "per_active",
    ],
  },

  cool: {
    key: "cool",
    name: "Cool",
    description: "Speaks only when needed",
    traits: [
      "bg_woodsman",
      "bg_boss",
      "bg_assassin",
      "bg_monk",
      "bg_hunter",
      "per_direct",
      "per_loner",
      "per_chaste",
      "per_cautious",
      "per_independent",
      "per_calm",
      "per_serious",
    ],
  },

  witty: {
    key: "witty",
    name: "Witty",
    description: "Also come up with the worst puns",
    traits: [
      "bg_scholar",
      "bg_adventurer",
      "bg_entertainer",
      "per_frugal",
      "per_sly",
      "per_logical",
      "per_playful",
      "per_curious",
      "per_studious",
      "per_attentive",
    ],
  },

  debauched: {
    key: "debauched",
    name: "Debauched",
    description: "Life is entertainment",
    traits: [
      "bg_slaver",
      "bg_pirate",
      "bg_raider",
      "bg_thug",
      "bg_mist",
      "bg_whore",
      "per_lunatic",
      "per_masochistic",
      "per_lustful",
      "per_sexaddict",
      "per_cruel",
      "per_evil",
      "per_dominant",
    ],
  },
});

// prettier-ignore
setup.SPEECH_ADVERBS = {
  friendly: [
    'cordially', 'pleasantly', 'warmly', 'amiably', 'affably',
    'congenially', 'gregariously', 'hospitably', 'openly', 'kindly',
    'amicably', 'cordially', 'agreeably', 'obligingly', 'delightfully',
  ],
  bold: [
    'angrily', 'proudly', 'arrogantly', 'vainly', 'smugly',
    'pomposhly', 'haughtily', 'complacently', 'disdainfully', 'boastfully',
    'irritably', 'forcefully', 'condescendingly', 'mightily', 'powerfully',
    'boldly',
  ],
  cool: [
    'coolly', 'coldly', 'aloofly', 'remotely', 'distantly',
    'solemnly', 'seriously', 'sternly', 'stoically', 'grimly',
    'calmly', 'reservedly', 'plainly', 'neutrally', 'indifferently',
  ],
  witty: [
    'sarcastically', 'ridiculously', 'funnily', 'amusingly', 'humorously',
    'comically', 'hilariously', 'wittily', 'absurdly', 'merrily',
    'happily', 'jovially', 'lightheartedly', 'cheerfully', 'joyfully',
  ],
  debauched: [
    'debauchedly', 'depravedly', 'shamelessly', 'immorally', 'impurely',
    'crazily', 'madly', 'insanely', 'brazenly', 'brashly',
    'directly', 'transparently', 'unabashedly', 'pervertedly', 'deviantly',
  ],
};
