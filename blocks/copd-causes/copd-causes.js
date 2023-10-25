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
      const ems = block.querySelectorAll('div > div:nth-child(2) em');
      // eslint-disable-next-line no-restricted-syntax
      for (const em of ems) {
        const dstDiv = block.querySelector('div > div:nth-child(3)');
        const clonedEm = em.cloneNode(true);
        dstDiv.prepend(clonedEm);
        em.remove();
      }
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
