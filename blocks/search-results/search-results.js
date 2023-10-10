async function fetchData(path) {
  const response = await fetch(`${path}.json`);
  return response.json();
}

function updateURL(query, page = 1, pageSize = 10, curLocation = window.location) {
  // eslint-disable-next-line no-restricted-globals
  const { state } = history;
  const { title } = document;
  const url = new URL(curLocation.origin + curLocation.pathname);
  url.searchParams.set('q', query);
  url.searchParams.set('p', page.toString());
  url.searchParams.set('s', pageSize.toString());
  // eslint-disable-next-line no-restricted-globals
  history.pushState(state, title, url.toString());
}

function search(indexJson, query, page, container, paginationArrows, curLocation, pageSize) {
  updateURL(query.trim(), page, pageSize, curLocation);
  // eslint-disable-next-line no-use-before-define
  searchIndex(indexJson, query.trim(), page, container, paginationArrows, curLocation, pageSize);
}

function searchIndex(indexJson, query, page, container, paginationArrows, curLocation, pageSize) {
  container.querySelector('.results-container')?.remove();
  container.querySelector('.title-container')?.remove();
  container.querySelector('.paginationitems')?.remove();

  const titleContainer = document.createElement('div');
  container.append(titleContainer);
  titleContainer.classList.add('title-container');

  function buildUserFeedbackContainer(...content) {
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
    buildUserFeedbackContainer(
      'You did not enter any search terms.',
      document.createElement('br'),
      'Please enter a search term and try again.',
    );
    return;
  }

  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('results-container');
  container.append(resultsContainer);

  let count = 0;

  function highlightTerms(text, terms) {
    const pattern = terms.map((term) => `\\w*${term}\\w*`).join('|');
    return text.replace(new RegExp(pattern, 'gi'), (match) => `<strong>${match}</strong>`);
  }

  indexJson.data.forEach((row) => {
    const terms = query.trim().split(' ').filter((term) => term.length > 0);
    if (terms.length > 0
      && terms.every((term) => row.title.toLowerCase().includes(term.toLowerCase()))) {
      count += 1;
      if (count > (page - 1) * pageSize && count <= page * pageSize) {
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
    buildUserFeedbackContainer('We\'re sorry, but no results matched your search term.');
  } else if (pages > 1) {
    const paginationItems = document.createElement('ul');
    paginationItems.classList.add('paginationitems');
    container.append(paginationItems);
    const previousPageArrow = document.createElement('li');
    previousPageArrow.classList.add('nav-arrow', 'first');
    if (page === 1) {
      previousPageArrow.classList.add('nav-disabled');
    } else {
      const arrowImage = document.createElement('img');
      [arrowImage.src] = paginationArrows;
      previousPageArrow.append(arrowImage);
      previousPageArrow.addEventListener('click', () => {
        const activePage = Number(document.querySelector('li.active-page').textContent);
        const prevPage = activePage - 1;
        search(indexJson, query, prevPage, container, paginationArrows, curLocation, pageSize);
      });
    }
    paginationItems.append(previousPageArrow);

    let currentPage = 1;
    while (currentPage <= pages) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = currentPage.toString();
      if (currentPage === page) {
        li.classList.add('active-page');
      } else {
        const pageNumber = currentPage;
        span.addEventListener('click', () => {
          search(indexJson, query, pageNumber, container, paginationArrows, curLocation, pageSize);
        });
      }
      li.append(span);
      paginationItems.append(li);
      currentPage += 1;
    }

    const nextPageArrow = document.createElement('li');
    nextPageArrow.classList.add('nav-arrow', 'last');
    if (page === pages) {
      nextPageArrow.classList.add('nav-disabled');
    } else {
      const arrowImage = document.createElement('img');
      [, arrowImage.src] = paginationArrows;
      nextPageArrow.append(arrowImage);
      nextPageArrow.addEventListener('click', () => {
        const activePage = Number(document.querySelector('li.active-page').textContent);
        const nextPage = activePage + 1;
        search(indexJson, query, nextPage, container, paginationArrows, curLocation, pageSize);
      });
    }
    paginationItems.append(nextPageArrow);
  }
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
  buttonSpan.append(buttonContent.querySelector('picture'));
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

function parseIntOrDefault(value, defaultValue) {
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }
  return parsedValue;
}

export default async function decorate(block, curLocation = window.location) {
  const indexJson = await fetchData('/query-index');

  const queryParams = new URLSearchParams(curLocation.search);
  const query = queryParams.get('q')?.trim();
  const page = parseIntOrDefault(queryParams.get('p'), 1);
  const pageSize = parseIntOrDefault(queryParams.get('s'), 10);
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
    search(
      indexJson,
      searchInput.value,
      page,
      searchResultsContainer,
      paginationArrowsSrc,
      curLocation,
      pageSize,
    );
  });
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      search(
        indexJson,
        searchInput.value,
        page,
        searchResultsContainer,
        paginationArrowsSrc,
        curLocation,
        pageSize,
      );
    }
  });

  searchIndex(
    indexJson,
    query,
    page,
    searchResultsContainer,
    paginationArrowsSrc,
    curLocation,
    pageSize,
  );
}
