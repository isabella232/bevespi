function handleExpandableButtonClick(rows, event) {
  const selectedRow = event.currentTarget.parentElement.parentElement.parentElement;

  selectedRow.classList.toggle('expanded');
  const buttonLabel = event.currentTarget.querySelector('label');
  buttonLabel.textContent = selectedRow.classList.contains('expanded')
    ? 'LESS'
    : 'MORE';

  const currentRowIndex = parseInt(selectedRow.getAttribute('expandable-row-index'), 10);
  [...rows].forEach((row, index) => {
    if (index === currentRowIndex) {
      return;
    }

    if (row.classList.contains('expanded')) {
      row.classList.remove('expanded');
      const expandableButton = row.getElementsByClassName('expandable-button > a > label');
      if (expandableButton.length > 0) {
        expandableButton[0].textContent = 'MORE';
      }
    }
  });
}

function addExpandableButton(row, rows) {
  const expandableButtonWrapper = document.createElement('div');
  const expandableButtonLabel = document.createElement('label');
  expandableButtonLabel.classList.add('expandable-button-label');
  expandableButtonLabel.textContent = 'MORE';
  const expandableButton = document.createElement('div');
  expandableButton.type = 'button';
  expandableButton.classList.add('expandable-button');
  expandableButton.addEventListener('click', handleExpandableButtonClick.bind(null, rows));
  expandableButton.appendChild(expandableButtonLabel);
  expandableButtonWrapper.appendChild(expandableButton);
  row.appendChild(expandableButtonWrapper);
}

function wrapNextSiblingsInDiv(element) {
  const wrapper = document.createElement('div');
  let currentElement = element.nextSibling;
  while (currentElement) {
    const { nextSibling } = currentElement;
    wrapper.appendChild(currentElement);
    currentElement = nextSibling;
  }

  return wrapper;
}

function markItemsWithPictureBefore(row) {
  const pictures = row.querySelectorAll('picture');
  if (pictures.length > 0) {
    [...pictures].forEach((picture) => {
      if (picture.parentElement.tagName === 'P'
        && picture.textContent.length > 0
      ) {
        picture.parentElement.classList.add('item-with-picture-before');
        const wrapper = wrapNextSiblingsInDiv(picture);
        picture.after(picture, wrapper);
      }
    });
  }
}

function createAccordionRowHeader(row) {
  const rowHeader = document.createElement('div');
  rowHeader.classList.add('accordion-row-header');
  const picture = row.querySelector('picture');
  if (picture) {
    rowHeader.appendChild(picture.cloneNode(true));
    picture.parentElement.remove();
  }

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('accordion-title-header-container');
  const title = row.querySelector('h2');
  if (title) {
    titleContainer.appendChild(title);
  }

  const firstParagraph = row.querySelector('p');
  if (firstParagraph) {
    titleContainer.appendChild(firstParagraph.cloneNode(true));
  }

  rowHeader.appendChild(titleContainer);
  row.insertBefore(rowHeader, row.children[0]);
}

function createAccordion(block) {
  [...block.children].forEach((row, index) => {
    if (row.children.length === 0) {
      return;
    }

    row.classList.add('accordion-row');
    row.setAttribute('expandable-row-index', index);
    const rowContent = row.children[0];
    rowContent.classList.add('accordion-row-content');
    createAccordionRowHeader(rowContent);
    markItemsWithPictureBefore(rowContent);
    addExpandableButton(rowContent, block.children);
  });
}

export default function decorate(block) {
  createAccordion(block);
}
