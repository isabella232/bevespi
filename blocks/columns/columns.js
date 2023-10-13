function addRowWrapper(row) {
  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row-wrapper');
  const rowContainer = row;
  row.replaceWith(rowWrapper);
  rowWrapper.appendChild(rowContainer);
}

function setContainerBackgroundImage(picture, col) {
  const img = picture.querySelector('img');
  if (img) {
    const rowWrapper = col.closest('.row-wrapper');
    if (rowWrapper) {
      rowWrapper.style = `background: url(${img.src}); background-size: cover;`;
      picture.parentElement.remove();
    }
  }
}

function markFootnotes(col) {
  const italicNotes = col.querySelectorAll('em');
  [...italicNotes].forEach((note) => {
    if (note.textContent[0] === '*') {
      note.classList.add('footnote');
    }
  });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    addRowWrapper(row);
    [...row.children].forEach((col) => {
      markFootnotes(col);
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        } else if (pic.parentElement.tagName === 'P') {
          setContainerBackgroundImage(pic, col);
        }
      }
    });
  });
}
