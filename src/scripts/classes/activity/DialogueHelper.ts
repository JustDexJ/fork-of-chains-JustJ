import { TwineClass } from "../_TwineClass";

export class DialogueHelper extends TwineClass {
  static createEmptyDialogue(actor_name: string): Dialogue {
    const res = {
      friendly: [""],
      bold: [""],
      cool: [""],
      witty: [""],
      debauched: [""],
    };
    return {
      actor: actor_name,
      texts: res,
    };
  }
}
