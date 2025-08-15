/**
 * Generate menu on the left.
 */
export const DOM_Menu_dev_content_generated_begin = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  const devtooltype = State.variables.devtooltype;
  fragments.push(html`
    <div>
      Your new ${devtooltype} is ready! Your game has been
      ${setup.DOM.Text.successlite("auto-saved")}. It is advisable to also
      ${setup.DOM.Text.successlite("manually save")} your game now, perhaps to
      the disk, so you don't lose your progress just in case.
    </div>
    <div>
      Click on the (Test your ${devtooltype}) link below to test your
      ${devtooltype}.
    </div>
  `);
  return setup.DOM.create("div", {}, fragments);
};

/**
 * Generate menu on the left.

 */
export const DOM_Menu_dev_content_generated_middle = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  const devtooltype = State.variables.devtooltype;
  const filename = `project/twee/${devtooltype}/[yourname]/${State.variables.qfilename}`;
  fragments.push(html`
    <div>
      When you are happy with your ${devtooltype} and no error appeared in the
      (Test your ${devtooltype}) above, you are ready to add the ${devtooltype}
      into the game! There are two options for you. The first option is to copy
      paste all the code below to a file, then post the file in the
      #your-contribution channel inside our
      ${setup.DOM.Nav.url("Discord", setup.DISCORD_URL)} server. A contributor
      will put it in the game code. (If you use Discord, you can tell us your
      discord name too in the submission so we can give you a Discord role,
      which among other things allows you to bypass the seven days wait required
      there.) The second option is to add it to the code directly, and it's also
      very easy!
      ${setup.DOM.Util.message(
        `Click for guide on how to add it to the game code yourself`,
        html`
          <div class="helpcard">
            <div>
              First, go to ${setup.DOM.Nav.url(setup.REPO_URL, setup.REPO_URL)}
              and download the repository from there. Next, create the following
              file: ${setup.DOM.Text.success(filename)} and copy paste all the
              code later below to that file. (Replace [yourname] with your name.
              You can use any text editor like
              ${setup.DOM.Nav.url(
                "Notepad++",
                "https://notepad-plus-plus.org/downloads/",
              )}
              to create the file. You may need to create a new directory here.
              Make sure the file ends with ".twee", instead of ".txt" or any
              other extension.)
              ${setup.DOM.Nav.url(
                "(Example)",
                `${setup.REPO_URL}/-/blob/master/project/twee/quest/Dporentel/goblin_resque.twee`,
              )}
              Finally, compile the game, which is really easy! See
              ${setup.DOM.Nav.url(
                "compilation instructions",
                `${setup.REPO_URL}#compiling-instructions`,
              )}
              for compiling instructions.
            </div>

            <br />

            <div>
              That's all. Your ${devtooltype} is now permanently in the game (in
              your copy of the game that is). You can test your ${devtooltype}
              after you compile by going to the Debug Start, then go to
              Settings, then to "Test ${devtooltype}". Once that works, all you
              need to do is
              ${setup.DOM.Nav.url(
                "send a merge request",
                `${setup.REPO_URL}/-/blob/master/docs/mergerequest.md`,
              )}
              (Again, you don't need to install anything to do so.)
            </div>
          </div>
        `,
      )}
    </div>
    <br />
    <div>
      Copy all the code below to either to a file for submitting via Discord,
      or, if you're planning to
      ${setup.DOM.Nav.url(
        "test it and compile your game",
        `${setup.REPO_URL}#compiling-instructions`,
      )},
      to ${setup.DOM.Text.success(filename)}:
      <span id="copy-to-clipboard-button">
        ${setup.DOM.Nav.button(`Copy to clipboard`, () => {
          window
            .getSelection()!
            .selectAllChildren(document.getElementById("devtoolcoderesult")!);
          document.execCommand("copy");
          $("#copy-to-clipboard-button button").text("Copied!");
        })}
      </span>
    </div>
  `);

  return setup.DOM.create("div", {}, fragments);
};
