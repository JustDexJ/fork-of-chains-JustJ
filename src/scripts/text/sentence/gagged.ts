export namespace TextGagged {
  /**
   * Gagged muffling noises from being in discomfort
   */
  export function discomfort({ unit }: { unit: Unit }): string {
    const dialogues = [
      `Mmph!! Mmmph!!`,
      `Mmm-mmph!`,
      `Mmmpphh!`,
      "Hmmmpff!!",
      "Mmmmrrrff!!",
      "Mmm-mmgh!",
    ];
    return setup.rng.choice(dialogues);
  }

  /**
   * Gagged muffling noises from being in pleasure
   */
  export function pleasure({ unit }: { unit: Unit }): string {
    const dialogues = [
      `Mmmphh~~~`,
      `Mmmph... mmmph...`,
      `Mmmph~`,
      "mmmMMMmmphh...",
      "Mmmph?! Mmmphh...",
      "Mmmghh... mmghh~",
    ];
    return setup.rng.choice(dialogues);
  }
}
