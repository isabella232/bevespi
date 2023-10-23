export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const button = document.createElement('span');
    row.prepend(button);
    button.addEventListener('click', (e) => { e.target.parentElement.parentElement.classList.toggle('active'); });

    const rowInner = document.createElement('div');
    [...row.children].forEach((child) => { rowInner.appendChild(child); });
    row.appendChild(rowInner);
  });
}
