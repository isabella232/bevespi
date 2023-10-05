// noinspection JSUnusedGlobalSymbols

async function fetchData(path) {
    const response = await fetch(`${path}.json`);
    return response.json();
}

function updateURL (query, page = 0) {
    let state = history.state;
    let title = document.title;
    let url = window.location.origin + window.location.pathname + '?q=' + encodeURI(query)+ '&p=' + page;
    history.pushState(state, title, url);
}

function searchIndex(indexJson, query, container, paginationArrows, page) {
    container.querySelector('.results-container')?.remove();
    container.querySelector('.title-container')?.remove();
    container.querySelector('.paginationitems')?.remove();

    const titleContainer = document.createElement('div');
    container.append(titleContainer);
    titleContainer.classList.add('title-container');

    function buildUserFeedbackContainer(content) {
        titleContainer.classList.add('user-feedback-message');
        const h2 = document.createElement('h2');
        titleContainer.append(h2);
        h2.append(...content);
        return h2;
    }

    if (query) {
        const showingSerResult = document.createElement('span');
        showingSerResult.classList.add('showingSerResult');
        showingSerResult.textContent = 'Showing results for: ';
        titleContainer.append(showingSerResult);
        const searchQuery = document.createElement('span');
        searchQuery.classList.add('search-query');
        searchQuery.textContent = query;
        titleContainer.append(searchQuery);
    } else {
        buildUserFeedbackContainer([
            'You did not enter any search terms.',
            document.createElement('br'),
            'Please enter a search term and try again.'
        ]);
        return;
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    container.append(resultsContainer);

    const pageSize = 2; // TODO: 10
    let count = 0;

    function highlightTerms(text, terms) {
        const pattern = terms.map((term) => '\\w*' + term + '\\w*').join('|');
        return text.replace(new RegExp(pattern, 'gi'), (match) => `<strong>${match}</strong>`);
    }

    indexJson.data.forEach((row) => {
        const terms = query.trim().split(' ').filter((term) => term.length > 0)
        if (terms.length>0 && terms.every((term) => row.title.toLowerCase().includes(term.toLowerCase()))) {
            count++;
            if (count > page * pageSize && count <= (page + 1) * pageSize) {
                const resultSection = document.createElement('div');
                resultSection.classList.add('result');
                const link = document.createElement('a');
                link.href = row.path;
                link.innerHTML = highlightTerms(row.title, terms);
                resultSection.append(link);
                resultsContainer.append(resultSection);
            }
        }
    });
    const pages = Math.ceil(count / pageSize);
    if (count === 0) {
        const userFeedbackContainer = buildUserFeedbackContainer();
        userFeedbackContainer.append('We\'re sorry, but no results matched your search term.');
    } else if (pages > 1) {
        const paginationItems = document.createElement('ul');
        paginationItems.classList.add('paginationitems');
        container.append(paginationItems);
        const firstPageArrow = document.createElement('li');
        firstPageArrow.classList.add('nav-arrow', 'first');
        if (page === 0) {
            firstPageArrow.classList.add('nav-disabled');
        } else {
            const arrowImage = document.createElement('img');
            arrowImage.src = paginationArrows[0];
            firstPageArrow.append(arrowImage);
            firstPageArrow.addEventListener('click', () => {
                search(indexJson, query, container, paginationArrows, 0);
            });
        }
        paginationItems.append(firstPageArrow);

        for (let currentPage = 0; currentPage < count / pageSize; currentPage++) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = (currentPage + 1).toString();
            if (currentPage === page) {
                li.classList.add('active-page');
            } else {
                span.addEventListener('click', () => {
                    search(indexJson, query, container, paginationArrows, currentPage);
                });
            }
            li.append(span);
            paginationItems.append(li);
        }

        const lastPageArrow = document.createElement('li');
        lastPageArrow.classList.add('nav-arrow', 'last');
        if (page === pages - 1) {
            lastPageArrow.classList.add('nav-disabled');
        } else {
            const arrowImage = document.createElement('img');
            arrowImage.src = paginationArrows[1];
            lastPageArrow.append(arrowImage);
            lastPageArrow.addEventListener('click', () => {
                search(indexJson, query, container, paginationArrows, pages - 1);
            });
        }
        paginationItems.append(lastPageArrow);
    }
}

function search(indexJson, query, container, paginationArrows, page) {
    updateURL(query);
    searchIndex(indexJson, query, container, paginationArrows, page);
}

function buildSearchInputField(value, placeholder) {
    const searchInput = document.createElement('input');
    searchInput.id = 'search';
    searchInput.name = 'q';
    searchInput.maxLength = 50;
    searchInput.placeholder = placeholder;
    if (value) {
        searchInput.value = value;
    }
    return searchInput;
}

function buildSearchButton(buttonContent) {
    const searchButton = document.createElement('button');
    const buttonSpan = document.createElement('span');
    searchButton.append(buttonSpan);
    buttonSpan.append(buttonContent.textContent.trim());
    buttonSpan.append(buttonContent.children[0]);
    buttonContent.textContent = '';
    searchButton.type = 'button';
    return searchButton;
}

function buildSearchSection(block) {
    const searchSection = document.createElement('div');
    searchSection.classList.add('search');
    block.append(searchSection);
    return searchSection;
}

export default async function decorate(block) {
    const indexJson = await fetchData('/query-index');

    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('q')?.trim();
    const page = Number(queryParams.get('p'));
    const buttonContent = block.querySelector('div.search-results > div > div');
    buttonContent.closest('div').remove();
    const paginationArrows = block.querySelectorAll('div.search-results > div > div > picture > img');
    const paginationArrowsSrc = [...paginationArrows].map((arrow) => arrow.src);
    paginationArrows.forEach((arrow) => arrow.closest('div').remove());

    const searchSection = buildSearchSection(block);
    const searchFormSection = document.createElement('div');
    searchFormSection.classList.add('search-form');
    searchSection.append(searchFormSection);
    const searchInput = buildSearchInputField(query, buttonContent.textContent.trim());
    searchFormSection.append(searchInput);
    const searchButton = buildSearchButton(buttonContent);
    searchFormSection.append(searchButton);

    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results', 'section');
    searchSection.append(searchResultsContainer);

    searchButton.addEventListener('click', () => {
        search(indexJson, searchInput.value.trim(), searchResultsContainer, paginationArrowsSrc, page);
    });
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            search(indexJson, searchInput.value.trim(), searchResultsContainer, paginationArrowsSrc, page);
        }
    });

    searchIndex(indexJson, query, searchResultsContainer, paginationArrowsSrc, page);
}