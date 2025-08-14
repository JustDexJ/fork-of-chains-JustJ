export namespace TextPraise {
  /** Return a praise-able noun. E.g., bravery, handsomeness, etc. */
  export function noun(unit: Unit): string {
    const traits = unit.getTraits();
    const gender = unit.getGender();
    let candidates: string[] = [];
    for (const trait of traits) {
      const text = trait.getTexts();
      if (text) {
        candidates = candidates.concat(text.noungood || []);
        if (gender == setup.trait.gender_male) {
          candidates = candidates.concat(text.noungoodmale || []);
        } else {
          candidates = candidates.concat(text.noungoodfemale || []);
        }
      }
    }

    if (!candidates.length) return `neutrality`;

    return setup.rng.choice(candidates);
  }
}
