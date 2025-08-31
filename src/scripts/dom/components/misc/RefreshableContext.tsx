import { createContext } from "solid-js";

export const RefreshableContext = createContext<{
  refresh(): void;
  subscribeToRefresh(): void;
}>({
  refresh() {
    // as default fallback, reload the current passage
    setup.runSugarCubeCommand("<<focgoto>>");
  },
  subscribeToRefresh() {},
});
