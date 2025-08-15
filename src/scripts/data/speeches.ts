export const initSpeeches = () => {
  new setup.Speech("friendly", "Friendly", "Pleasant to others", [
    setup.trait.bg_noble,
    setup.trait.bg_royal,
    setup.trait.bg_informer,
    setup.trait.bg_priest,
    setup.trait.bg_healer,
    setup.trait.bg_merchant,
    setup.trait.per_gregarious,
    setup.trait.per_lavish,
    setup.trait.per_humble,
    setup.trait.per_kind,
    setup.trait.per_dreamy,
    setup.trait.per_empath,
    setup.trait.per_submissive,
  ]);

  new setup.Speech("bold", "Bold", "Held themselves in high regards", [
    setup.trait.bg_seaman,
    setup.trait.bg_knight,
    setup.trait.per_loyal,
    setup.trait.per_aggressive,
    setup.trait.per_proud,
    setup.trait.per_brave,
    setup.trait.per_honorable,
    setup.trait.per_stubborn,
    setup.trait.per_active,
  ]);

  new setup.Speech("cool", "Cool", "Speaks only when needed", [
    setup.trait.bg_woodsman,
    setup.trait.bg_boss,
    setup.trait.bg_assassin,
    setup.trait.bg_monk,
    setup.trait.bg_hunter,
    setup.trait.per_direct,
    setup.trait.per_loner,
    setup.trait.per_chaste,
    setup.trait.per_cautious,
    setup.trait.per_independent,
    setup.trait.per_calm,
    setup.trait.per_serious,
  ]);

  new setup.Speech("witty", "Witty", "Also come up with the worst puns", [
    setup.trait.bg_scholar,
    setup.trait.bg_adventurer,
    setup.trait.bg_entertainer,
    setup.trait.per_frugal,
    setup.trait.per_sly,
    setup.trait.per_logical,
    setup.trait.per_playful,
    setup.trait.per_curious,
    setup.trait.per_studious,
    setup.trait.per_attentive,
  ]);

  new setup.Speech("debauched", "Debauched", "Life is entertainment", [
    setup.trait.bg_slaver,
    setup.trait.bg_pirate,
    setup.trait.bg_raider,
    setup.trait.bg_thug,
    setup.trait.bg_mist,
    setup.trait.bg_whore,
    setup.trait.per_lunatic,
    setup.trait.per_masochistic,
    setup.trait.per_lustful,
    setup.trait.per_sexaddict,
    setup.trait.per_cruel,
    setup.trait.per_evil,
    setup.trait.per_dominant,
  ]);

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
};
