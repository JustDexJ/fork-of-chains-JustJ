import { SexBodypart_Anus } from "./bodyparts/anus";
import { SexBodypart_Arms } from "./bodyparts/arms";
import { SexBodypart_Breasts } from "./bodyparts/breasts";
import { SexBodypart_Legs } from "./bodyparts/legs";
import { SexBodypart_Mouth } from "./bodyparts/mouth";
import { SexBodypart_Penis } from "./bodyparts/penis";
import { SexBodypart_Tail } from "./bodyparts/tail";
import { SexBodypart_Vagina } from "./bodyparts/vagina";

/** Singleton instances for SexBodypart subclasses. */
export const sexbodypart = /*typedRecord<SexBodypart>()(*/ {
  anus: new SexBodypart_Anus(),
  arms: new SexBodypart_Arms(),
  breasts: new SexBodypart_Breasts(),
  legs: new SexBodypart_Legs(),
  mouth: new SexBodypart_Mouth(),
  penis: new SexBodypart_Penis(),
  tail: new SexBodypart_Tail(),
  vagina: new SexBodypart_Vagina(),
};
