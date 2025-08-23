/**
 * Example usage: <<icon "star" "Tooltip text">>
 * See available icons at: https://www.motoslave.net/sugarcube/tmp/tme-fa-icons/
 */
Macro.add("icon", {
  handler() {
    const span = document.createElement("span");
    span.setAttribute("data-tooltip", this.args[1]);
    span.setAttribute("data-tooltip-delay", "");
    span.setAttribute("data-tooltip-noclick", "");

    const i = document.createElement("i");
    i.className = "sfa sfa-" + this.args[0];

    span.appendChild(i);
    this.output.appendChild(span);
  },
});
