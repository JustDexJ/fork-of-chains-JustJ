import { getMasterNickname } from "./greeting";

export namespace TextSlave {
  /**
   * Yes, master
   */
  export function yesmaster({
    unit,
    target,
  }: {
    unit: Unit;
    target: Unit;
  }): string {
    const title = getMasterNickname(unit, target);

    const options = [];
    if (unit.isObedient()) {
      options.push(
        `Yes, ${title}.`,
        `I live to serve, ${title}.`,
        `As you ordered, ${title}.`,
        `I am your slave, ${title}.`,
        `At once, ${title}.`,
      );
    } else {
      options.push(
        `Yes, ${title}...`,
        `I will obey, ${title}...`,
        `Y-yes, ${title}...`,
        `...y-Yes, ${title}.`,
        `Have mercy please, ${title}...`,
      );
    }

    return setup.Text.replaceUnitMacros(options, { a: unit, b: target });
  }
}
