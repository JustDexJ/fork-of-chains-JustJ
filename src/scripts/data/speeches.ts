import type { SpeechDefinition } from "../classes/Speech";

export const SPEECHES_DEFINITIONS = definitions<SpeechDefinition>()({
  friendly: {
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
    'amicably', 'agreeably', 'obligingly', 'delightfully', 'genially',
    'cheerfully', 'neighborly', 'merrily', 'jovially', 'heartily',
    'graciously', 'approvingly', 'sympathetically', 'considerately', 'benevolently',
    'tenderly', 'lovingly', 'compassionately', 'thoughtfully', 'benignly',
    'affectionately', 'courteously',
    'earnestly',
    'agreeably', 'obligingly', 'delightfully', 'genially',
    'cheerfully', 'neighborly', 'merrily', 'jovially', 'heartily',
    'graciously', 'approvingly', 'sympathetically', 'considerately', 'benevolently',
    'tenderly', 'lovingly', 'compassionately', 'thoughtfully', 'benignly',
    'affectionately', 'courteously', 'earnestly',
    'faithfully', 'friendly', 'supportively', 'cheerily', 'sunnyly', 'sweetly', 'bounteously', 'humbly'
  ],
  bold: [
    'angrily', 'proudly', 'arrogantly', 'vainly', 'smugly',
    'pomposhly', 'haughtily', 'complacently', 'disdainfully', 'boastfully',
    'irritably', 'forcefully', 'condescendingly', 'mightily', 'powerfully',
    'boldly', 'audaciously', 'vehemently', 'bravely', 'fiercely',
    'defiantly', 'resolutely', 'stubbornly', 'unyieldingly', 'domineeringly',
    'imperiously', 'commandingly', 'ferociously', 'valiantly', 'intrepidly',
    'spiritedly', 'tenaciously', 'adamantly', 'courageously', 'sternly',
    'unflinchingly', 'rigorously', 'stridently',
    'offensively', 'belligerently', 'provocatively', 'recklessly', 'undauntedly', 'dauntlessly', 'authoritatively', 'strikingly', 'formidably', 'ferociously'
  ],
  cool: [
    'coolly', 'coldly', 'aloofly', 'remotely', 'distantly',
    'solemnly', 'seriously', 'sternly', 'stoically', 'grimly',
    'calmly', 'reservedly', 'plainly', 'neutrally', 'indifferently',
    'detachedly', 'impartially', 'objectively', 'composedly', 'levelly',
    'quietly', 'unemotively', 'soberly', 'unperturbedly', 'tranquilly',
    'dispassionately', 'thoughtfully', 'judiciously', 'reflectively', 'coolheadedly',
    'calculatingly', 'restrainedly', 'measuredly', 'serenely', 'reticently',
    'retiredly', 'watchfully', 'observantly', 'inexpressively', 'ponderingly',
    'apathetically', 'stoically', 'unaffectedly', 'placidly', 'evenly', 'steadily', 'unruffledly'
  ],
  witty: [
    'sarcastically', 'ridiculously', 'funnily', 'amusingly', 'humorously',
    'comically', 'hilariously', 'wittily', 'absurdly', 'merrily',
    'happily', 'jovially', 'lightheartedly', 'cheerfully', 'joyfully',
    'playfully', 'mockingly', 'jokingly', 'facetiously', 'teasingly',
    'gleefully', 'frolicsomely', 'quirkily', 'punningly', 'satirically',
    'jestingly', 'laughably', 'sprightly', 'blithely', 'mischievously',
    'brightly', 'sparklingly', 'grinningly', 'snappily', 'quick-wittedly',
    'waggishly', 'banteringly', 'nimblely', 'zestfully', 'chirpily',
    'cheekily', 'frivolously', 'airily', 'sparklingly', 'jauntily', 'buoyantly', 'jocularly', 'gleefully', 'lively', 'effervescently'
  ],
  debauched: [
    'debauchedly', 'depravedly', 'shamelessly', 'immorally', 'impurely',
    'crazily', 'madly', 'insanely', 'brazenly', 'brashly',
    'directly', 'transparently', 'unabashedly', 'pervertedly', 'deviantly',
    'licentiously', 'viciously', 'lustfully', 'lewdly', 'sinfully',
    'scandalously', 'riotously', 'unruly', 'dissolutely', 'infamously',
    'iniquitously', 'corruptly', 'recklessly', 'filthily', 'obscenely',
    'wickedly', 'bawdily', 'shamelessly', 'outrageously', 'indecently',
    'disgracefully', 'profanely', 'unwholesomely', 'sordidly', 'immorally',
    'devilishly', 'frenziedly', 'rabidly', 'wildly', 'licentiously', 'carnally', 'voraciously', 'sinfully', 'extravagantly', 'daringly'
  ],
};
