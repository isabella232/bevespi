/**
 * adapts content of the COPD Causes block based on the viewport width
 * @param {Element} block The COPD Causes block element
 */

let originalBlock = null;

function onResize(block) {
  // eslint-disable-next-line func-names
  return function (x) {
    const isDesktop = x.matches;
    if (isDesktop) {
      block.innerHTML = originalBlock.innerHTML;
      // this section depends on the content and is enabled for the first
      // row, second col in the word doc table
      // TODO: define a slightly different layout to be consistent across
      // the different viewport widths
      const em = block.querySelector('div > div:nth-child(2) em:first-of-type');
      const dstDiv = block.querySelector('div > div:nth-child(3)');
      const clonedEm = em.cloneNode(true);
      dstDiv.prepend(clonedEm);
      em.remove();
    } else {
      // reset to the original contents
      block.innerHTML = originalBlock.innerHTML;
    }
  };
}

/**
 * loads and decorates the COPD Causes block
 * @param {Element} block The COPD Causes block element
 */
export default async function decorate(block) {
  originalBlock = block.cloneNode(true);
  const isDesktop = window.matchMedia('(min-width: 900px)');
  onResize(block)(isDesktop);
  isDesktop.addEventListener('change', onResize(block));
}
