export default function decorate(block) {
  block.querySelectorAll(':scope > div').forEach((tile) => {
    tile.classList.add('tile');

    const cover = tile.querySelector(':scope > div:first-child');
    const modalContent = tile.querySelector(':scope > div:nth-child(2)');
    const properties = tile.querySelector(':scope > div:nth-child(3)');

    const picture = cover.querySelector('picture');
    picture.closest('p').replaceWith(picture);

    if (modalContent.classList.contains('button-container')) {
      // only has a button. Then the tile becomes a link
      const a = modalContent.querySelector('a');
      a.innerHTML = '';
      a.append(cover);
      a.parentElement.replaceWith(a);
      a.classList.add('cover');
      a.classList.remove('button');

      tile.append(document.createRange().createContextualFragment(`
        <img class="bottom-icon" src="/icons/icon-redirect.png" />
      `));
    } else {
      // there is a modal. The tile opens a modal.
      modalContent.classList.add('modal');
      cover.classList.add('cover', 'with-modal');

      modalContent.append(document.createRange().createContextualFragment(`
        <button name="close-modal"><img src="/icons/modal-close.png" alt="close"/></button>
      `));

      cover.addEventListener('click', () => {
        cover.toggleAttribute('aria-expanded');
      });
      modalContent.querySelector('button[name="close-modal"]').addEventListener('click', () => {
        cover.toggleAttribute('aria-expanded');
      });

      tile.append(document.createRange().createContextualFragment(`
        <img class="bottom-icon" src="/icons/icon-expand.png" />
      `));
    }
  });
}
