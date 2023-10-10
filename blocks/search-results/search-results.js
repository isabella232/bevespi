async function fetchData(path) {
  const response = await fetch(`${path}.json`);
  return response.json();
}

class SearchResults {
  constructor(indexJson, container, paginationArrows, curLocation, pageSize) {
    this.indexJson = indexJson;
    this.container = container;
    this.paginationArrows = paginationArrows;
    this.curLocation = curLocation;
    this.pageSize = pageSize;
  }

  updateURL(query, page = 1) {
    // eslint-disable-next-line no-restricted-globals
    const { state } = history;
    const { title } = document;
    const url = new URL(this.curLocation.origin + this.curLocation.pathname);
    url.searchParams.set('q', query.trim());
    url.searchParams.set('p', page.toString());
    url.searchParams.set('s', this.pageSize.toString());
    // eslint-disable-next-line no-restricted-globals
    history.pushState(state, title, url.toString());
  }

  search(query, page) {
    this.updateURL(query.trim(), page);
    this.searchIndex(query.trim(), page);
  }

  static #buildUserFeedbackContainer(titleContainer, ...content) {
    titleContainer.classList.add('user-feedback-message');
    const h2 = document.createElement('h2');
    titleContainer.append(h2);
    h2.append(...content);
    return h2;
  }

  static #highlightTerms(text, terms) {
    const pattern = terms.map((term) => `\\w*${term}\\w*`).join('|');
    return text.replace(new RegExp(pattern, 'gi'), (match) => `<strong>${match}</strong>`);
  }

  searchIndex(query, page) {
    this.container.querySelector('.results-container')?.remove();
    this.container.querySelector('.title-container')?.remove();
    this.container.querySelector('.paginationitems')?.remove();

    const titleContainer = document.createElement('div');
    this.container.append(titleContainer);
    titleContainer.classList.add('title-container');

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
      SearchResults.#buildUserFeedbackContainer(
        titleContainer,
        'You did not enter any search terms.',
        document.createElement('br'),
        'Please enter a search term and try again.',
      );
      return;
    }

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    this.container.append(resultsContainer);

    let count = 0;

    this.indexJson.data.forEach((row) => {
      const terms = query.trim().split(' ').filter((term) => term.length > 0);
      if (terms.length > 0
        && terms.every((term) => row.title.toLowerCase().includes(term.toLowerCase()))) {
        count += 1;
        if (count > (page - 1) * this.pageSize && count <= page * this.pageSize) {
          const resultSection = document.createElement('div');
          resultSection.classList.add('result');
          const link = document.createElement('a');
          link.href = row.path;
          link.innerHTML = SearchResults.#highlightTerms(row.title, terms);
          resultSection.append(link);
          resultsContainer.append(resultSection);
        }
      }
    });
    const pages = Math.ceil(count / this.pageSize);
    if (count === 0) {
      SearchResults.#buildUserFeedbackContainer(titleContainer, 'We\'re sorry, but no results matched your search term.');
    } else if (pages > 1) {
      const paginationItems = document.createElement('ul');
      paginationItems.classList.add('paginationitems');
      this.container.append(paginationItems);
      const previousPageArrow = document.createElement('li');
      previousPageArrow.classList.add('nav-arrow', 'first');
      if (page === 1) {
        previousPageArrow.classList.add('nav-disabled');
      } else {
        const arrowImage = document.createElement('img');
        [arrowImage.src] = this.paginationArrows;
        previousPageArrow.append(arrowImage);
        previousPageArrow.addEventListener('click', () => {
          const activePage = Number(document.querySelector('li.active-page').textContent);
          const prevPage = activePage - 1;
          this.search(query, prevPage);
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
            this.search(query, pageNumber);
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
        [, arrowImage.src] = this.paginationArrows;
        nextPageArrow.append(arrowImage);
        nextPageArrow.addEventListener('click', () => {
          const activePage = Number(document.querySelector('li.active-page').textContent);
          const nextPage = activePage + 1;
          this.search(query, nextPage);
        });
      }
      paginationItems.append(nextPageArrow);
    }
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
  const searchResults = new SearchResults(
    indexJson,
    searchResultsContainer,
    paginationArrowsSrc,
    curLocation,
    pageSize,
  );

  searchButton.addEventListener('click', () => {
    searchResults.search(searchInput.value, page);
  });
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchResults.search(searchInput.value, page);
    }
  });

  searchResults.searchIndex(query, page);
}
