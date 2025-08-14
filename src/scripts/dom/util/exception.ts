export default {
  /*
    Appends an error view to the passed DOM element.
  */
  exception(exception: unknown): DOM.Node {
    const game_info = `Fort of Chains v${setup.VERSION}: ${State.variables.gDebug ? ` [YOU HAVE DEBUG MODE ACTIVE -- DO NOT REPORT BUGS INCLUDING THIS ONE WITH DEBUG MODE ACTIVE]` : `The game has encountered an error. Please report this bug and provide a screenshot of this complete error and any other relevation information.`}`;

    let error_message: string;
    let lines: string[] = [];

    if (exception instanceof Error) {
      error_message = `${exception.name}: ${exception.message}`;

      lines = (exception.stack ?? "")
        .split("\n")
        .map((line) => line.replace(/file:.*\//, "<path>/"));
    } else {
      error_message = String(exception);
    }

    const fragments: DOM.Attachable[] = [];
    fragments.push(html`
      <div class="error">${game_info}</div>
      <div class="error">${error_message}</div>
    `);
    fragments.push(html`
      <div class="error-source">${lines.join("<br/>")}</div>
    `);

    console.error(`${game_info}\n\t${error_message}\n\t${lines.join("\n")}`);
    return setup.DOM.create("div", { class: "error-view" }, fragments);
  },
};
