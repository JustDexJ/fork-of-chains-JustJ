import { CodeJar } from "../third-party/codejar/codejar.js";

import Prism from "prismjs";

import { initPrismLanguageTwee3 } from "./codejar-language-twee3.js";

export function initializeCodeJar(): Promise<{
  CodeJar: typeof CodeJar;
  Prism: typeof Prism;
}> {
  initPrismLanguageTwee3(Prism);

  return Promise.resolve({ CodeJar, Prism });
}
