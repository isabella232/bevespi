function addRowWrapper(row) {
  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row-wrapper');
  [...row.children].forEach((rowChildren) => {
    rowWrapper.appendChild(rowChildren);
  });
  row.appendChild(rowWrapper);
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
    row.classList.add('columns-row');
    addRowWrapper(row);
    [...row.children].forEach((col) => {
      markFootnotes(col);
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
