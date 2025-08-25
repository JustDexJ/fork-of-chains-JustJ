/* Create the Top UI Bar. */
let $topUiBar = $('<div id="top-ui-bar"></div>').insertBefore("#story");

let topBody = $topUiBar.append('<div id="top-ui-bar-body"></div>');

/* Automatically show the contents of the StoryRightSidebar passage in the right-ui-bar-body element. */
postrender["Display Top Bar Contents"] = function (
  content: string,
  taskName: string,
) {
  setPageElement("top-ui-bar-body", "StoryTopBar");
};
