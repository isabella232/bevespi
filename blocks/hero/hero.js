/**
 * loads and decorates the footer
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  if (block.classList.contains('home')) {
    const btnScroll = document.createRange()
      .createContextualFragment(`<div class="btn-scroll">
<a href="#how-bevespiaerosphere-can-help">Scroll
<img src="/icons/icon_pink-arrow-down.png" alt="Scroll to section 2 header"/></a>
</div>`);
    block.appendChild(btnScroll);
  }
}
