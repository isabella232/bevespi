// function createAccordionRow(row) {
//     const accordionRow = document.createElement('div');
//     const accordionHeader = document.createElement('div');
//     accordionHeader.classList.add('accordion-header');

//     const accordionContent = document.createElement('div');
//     accordionContent.classList.add('accordion-content');

//     const picture = row.querySelector('picture');
//     if (picture) {
//         accordionHeader.appendChild(picture);
//     }

//     const rowTitle = row.querySelector('h2');
//     if (rowTitle) {
//         accordionHeader.appendChild(rowTitle);
//     }

//     accordionRow.appendChild(accordionHeader);
//     accordionRow.appendChild(accordionContent);
//     return accordionRow;
// }

function handleExpandableButtonClick(event) {
    console.log(event);
}

function addExpandableButton(row) {
    const expandableButton = document.createElement('a');
    expandableButton.classList.add('expandable-button');
    expandableButton.addEventListener('click', handleExpandableButtonClick);
}

function wrapNextSiblingsInDiv(element) {
    const wrapper = document.createElement('div');
    let currentElement = element.nextSibling;
    while (currentElement) {
        const nextSibling = currentElement.nextSibling;
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
                && picture.textContent.length > 0) {
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
        rowHeader.appendChild(picture);
    }

    const title = row.querySelector('h2');
    if (title) {
        rowHeader.appendChild(title);
    }

    row.insertBefore(rowHeader, row.children[0]);
}

function createAccordion(block) {
    [...block.children].forEach((row) => {
        if (row.children.length === 0) {
            return;
        }
        row.classList.add('accordion-row');
        const rowContent = row.children[0];
        rowContent.classList.add('accordion-row-content');
        createAccordionRowHeader(rowContent);
        markItemsWithPictureBefore(rowContent);
        addExpandableButton(rowContent);
    });
}

export default function decorate(block) {
    createAccordion(block);
}