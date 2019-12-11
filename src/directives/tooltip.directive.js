export default {
  bind(el, {value}) {
    const position = value.position ? value.position : "top";
    M.Tooltip.init(el, {html: value.html, position: position});
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  }
}
