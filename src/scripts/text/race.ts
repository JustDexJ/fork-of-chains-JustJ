import type { SubraceKey } from "../classes/trait/Subrace";

export namespace TextRace {
  export function region(race: Trait): string {
    return (
      setup.subrace[race.key as unknown as SubraceKey].homeland_region ?? "???"
    );
  }

  export const REGIONS = {
    city: "City of Lucgate",
    vale: "Northern Vales",
    forest: "Western Forests",
    deep: "Deep",
    desert: "Eastern Deserts",
    sea: "Southern Seas",
    mist: "Mist",
    heaven: "Heavens",
  };
}
