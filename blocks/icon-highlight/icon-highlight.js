/**
 * loads and decorates the Icon highlight block
 * @param {Element} block The Icon highlight block element
 */
export default async function decorate(block) {
  const hrLeft = document.createElement('hr');
  const hrRight = document.createElement('hr');
  const hrBottom = document.createElement('hr');
  const headerWrapper = document.createElement('div');
  const icon = block.querySelector('img');
  const clonedIcon = icon.cloneNode(true);
  hrLeft.classList.add('icon-highlight-inline-hr');
  clonedIcon.classList.add('icon-highlight-inline-img');
  hrRight.classList.add('icon-highlight-inline-hr');
  hrBottom.classList.add('icon-highlight-hr-bottom');
  icon.remove();
  headerWrapper.classList.add('icon-highlight-header-wrapper');
  headerWrapper.appendChild(hrLeft);
  headerWrapper.appendChild(clonedIcon);
  headerWrapper.appendChild(hrRight);

  block.prepend(headerWrapper);
  block.appendChild(hrBottom);
}
