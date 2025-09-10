/* Create the Top UI Bar. */
let $topUiBar = $('<div id="top-ui-bar"></div>').insertBefore("#story");

let topBody = $topUiBar.append('<div id="top-ui-bar-body"></div>');

/* Automatically show the contents of the StoryTopBar passage in the top-ui-bar-body element. */
$(document).on(":uiupdate", function (ev) {
  setPageElement("top-ui-bar-body", "StoryTopBar");
});
