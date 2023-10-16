export default function decorate(block) {
  block.querySelectorAll(':scope > div').forEach((tile) => {
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
    } else {
      modalContent.classList.add('modal');
      cover.classList.add('cover', 'with-modal');
    }

    cover.addEventListener('click', (e) => {
      cover.toggleAttribute('aria-expanded');
    });
  });
}
