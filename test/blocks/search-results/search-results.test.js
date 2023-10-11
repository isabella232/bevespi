/* eslint-disable no-unused-expressions */
/* global describe it */

import {
  readFile, sendKeys, sendMouse, resetMouse,
} from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

const scripts = {};

function jsonOk(body) {
  const mockResponse = new window.Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(mockResponse);
}

const QUERY_INDEX = {
  data: [
    {
      path: '/',
      title: 'BEVESPI AEROSPHERE® (glycopyrrolate/formoterol fumarate) Inhalation Aerosol',
      description: 'BEVESPI AEROSPHERE is a twice-daily long term treatment for adults with COPD.',
    },
    {
      path: 'copd-treatment',
      title: 'How BEVESPI AEROSPHERE® (glycopyrrolate/formoterol fumarate) Can Help',
      description: 'BEVESPI AEROSPHERE is a combination of two medicines in one inhaler that works in different ways to help open airways.',
    },
    {
      path: 'how-to-use-bevespi-inhaler',
      title: 'How to Use Your Inhaler - BEVESPI AEROSPHERE® (glycopyrrolate/formoterol fumarate) Inhalation Aerosol',
      description: 'Watch video instructions to learn how to use your BEVESPI AEROSPHERE inhaler.',
    },
    {
      path: 'bevespi-side-effects',
      title: 'BEVESPI AEROSPHERE® (glycopyrrolate/formoterol fumarate) Safety & Side Effects',
      description: 'Find side effects, safety, and risk information related to BEVESPI AEROSPHERE. Ask your health care provider if you have any questions.',
    },
    {
      path: 'copd-management-resources',
      title: 'COPD Resources and Support | Breathing Room',
      description: 'Breathing Room is a dedicated place designed to help you simplify, streamline, and manage your breathing day to day.',
    },
  ],
};

async function loadSearchResultsBlock(query, page = 1, pageSize = 10) {
  const fetchStub = sinon.stub(window, 'fetch');
  fetchStub.onCall(0).returns(jsonOk(QUERY_INDEX));

  document.body.innerHTML = await readFile({ path: './block.html' });

  const searchResultsBlock = document.querySelector('div.search-results');
  const location = {
    search: `?q=${query}&p=${page}&s=${pageSize}`,
    pathname: '/search-results',
    origin: 'http://localhost:2000',
  };
  try {
    await scripts.default(searchResultsBlock, location);
  } finally {
    fetchStub.restore();
  }
}

function getCenterOf(element) {
  const {
    x, y, width, height,
  } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}

function assertShowingResultsFor(query) {
  const showingFor = document.querySelector('div.title-container > .showingSerResult');
  expect(showingFor).to.exist;
  expect(showingFor.textContent).to.equal('Showing results for: ');
  const searchQuery = document.querySelector('div.title-container > .search-query');
  expect(searchQuery).to.exist;
  expect(searchQuery.textContent).to.equal(query);
}

function assertResult(actual, expected) {
  expect(actual).to.exist;
  const link = actual.querySelector('p.search-result-pagename > a');
  expect(link.getAttribute('href')).to.equal(expected.path);
  expect(link.getAttribute('title')).to.equal(expected.title);
  expect(link.textContent).to.equal(expected.title);
  const abstract = actual.querySelector('p.search-result-abstract');
  expect(abstract.textContent).to.equal(expected.description);
}

function assertHighlighted(actual, ...highlightedWords) {
  const highlighted = [...actual.querySelectorAll('strong')].map((strong) => strong.textContent);
  expect(highlighted).to.contain(...highlightedWords);
}

describe('Search-results block', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    const module = await import('../../../blocks/search-results/search-results.js');
    Object
      .keys(module)
      .forEach((func) => {
        scripts[func] = module[func];
      });
  });

  it('shows a feedback message when no search term is entered', async () => {
    await loadSearchResultsBlock('');
    const feedback = document.querySelector('div.user-feedback-message > h2');
    expect(feedback).to.exist;
    expect(feedback.textContent).to.equal('You did not enter any search terms.Please enter a search term and try again.');
  });

  it('shows a feedback message when no matching results', async () => {
    await loadSearchResultsBlock('nomatch');

    assertShowingResultsFor('nomatch');

    const feedback = document.querySelector('div.user-feedback-message.title-container > h2');
    expect(feedback).to.exist;
    expect(feedback.textContent).to.equal('We\'re sorry, but no results matched your search term.');
  });

  it('shows list of matching results', async () => {
    await loadSearchResultsBlock('bevespi');

    assertShowingResultsFor('bevespi');

    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(4);

    assertResult(results[0], QUERY_INDEX.data[0]);
    assertResult(results[1], QUERY_INDEX.data[1]);
    assertResult(results[2], QUERY_INDEX.data[2]);
    assertResult(results[3], QUERY_INDEX.data[3]);
  });

  it('supports multiple search terms, by ANDing them', async () => {
    await loadSearchResultsBlock('aero inhal');

    assertShowingResultsFor('aero inhal');

    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(2);

    assertResult(results[0], QUERY_INDEX.data[0]);
    assertResult(results[1], QUERY_INDEX.data[2]);
  });

  it('highlights full words containing the search terms', async () => {
    await loadSearchResultsBlock('aero inhal');

    const results = document.querySelectorAll('div.result-item');

    assertHighlighted(results[0], 'AEROSPHERE', 'Inhalation', 'Aerosol');
  });

  it('should not show pagination controls if single page of results', async () => {
    await loadSearchResultsBlock('bev', 0, 10);

    const pagination = document.querySelector('ul.paginationitems');

    expect(pagination).to.not.exist;
  });

  it('should show pagination controls if more than 1 page of results', async () => {
    await loadSearchResultsBlock('bev', 1, 2);

    const pagination = document.querySelector('ul.paginationitems');
    expect(pagination).to.exist;
    expect(pagination.children).to.have.lengthOf(4);
    expect(pagination.children[0].classList).to.contain(['nav-arrow', 'first', 'nav-disabled']);
    expect(pagination.children[1].classList).to.contain(['active-page']);
    expect(pagination.children[1].firstChild.textContent).to.equal('1');
    expect(pagination.children[2].classList).to.not.contain(['active-page']);
    expect(pagination.children[2].firstChild.textContent).to.equal('2');
    expect(pagination.children[3].classList).to.contain(['nav-arrow', 'last']);
    expect(pagination.children[3].firstChild.src).to.contain(['next-button.png']);
  });

  it('shows matching results only up to the page size', async () => {
    const pageSize = 2;
    await loadSearchResultsBlock('bev', 1, pageSize);

    const results = document.querySelectorAll('div.result-item');

    expect(results).to.have.lengthOf(pageSize);
    assertResult(results[0], QUERY_INDEX.data[0]);
    assertResult(results[1], QUERY_INDEX.data[1]);
  });

  it('shows last page of matching results, with navigation', async () => {
    const pageSize = 3;
    await loadSearchResultsBlock('bev', 2, pageSize);

    const results = document.querySelectorAll('div.result-item');

    expect(results).to.have.lengthOf(1);
    assertResult(results[0], QUERY_INDEX.data[3]);

    const pagination = document.querySelector('ul.paginationitems');
    expect(pagination).to.exist;
    expect(pagination.children).to.have.lengthOf(4);
    expect(pagination.children[0].classList).to.contain(['nav-arrow', 'first']);
    expect(pagination.children[0].firstChild.src).to.contain(['prev-button.png']);
    expect(pagination.children[1].classList).to.not.contain(['active-page']);
    expect(pagination.children[1].firstChild.textContent).to.equal('1');
    expect(pagination.children[2].classList).to.contain(['active-page']);
    expect(pagination.children[2].firstChild.textContent).to.equal('2');
    expect(pagination.children[3].classList).to.contain(['nav-arrow', 'last', 'nav-disabled']);
  });

  it('shows middle page of matching results, with navigation', async () => {
    const pageSize = 2;
    await loadSearchResultsBlock('c', 2, pageSize);

    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(pageSize);

    assertResult(results[0], QUERY_INDEX.data[2]);
    assertResult(results[1], QUERY_INDEX.data[3]);

    const pagination = document.querySelector('ul.paginationitems');
    expect(pagination).to.exist;
    expect(pagination.children).to.have.lengthOf(5);
    expect(pagination.children[0].classList).to.contain(['nav-arrow', 'first']);
    expect(pagination.children[0].firstChild.src).to.contain(['prev-button.png']);
    expect(pagination.children[1].classList).to.not.contain(['active-page']);
    expect(pagination.children[1].firstChild.textContent).to.equal('1');
    expect(pagination.children[2].classList).to.contain(['active-page']);
    expect(pagination.children[2].firstChild.textContent).to.equal('2');
    expect(pagination.children[3].classList).to.not.contain(['active-page']);
    expect(pagination.children[3].firstChild.textContent).to.equal('3');
    expect(pagination.children[4].classList).to.contain(['nav-arrow', 'last']);
    expect(pagination.children[4].firstChild.src).to.contain(['next-button.png']);
  });

  it('clicking on the right arrow, displays the next page', async () => {
    const pageSize = 2;
    await loadSearchResultsBlock('c', 1, pageSize);

    const initialPage = document.querySelector('ul.paginationitems > li.active-page');
    expect(initialPage.textContent).to.equal('1');

    const rightArrow = document.querySelector('ul.paginationitems > li.nav-arrow.last');
    expect(rightArrow).to.exist;
    const { x, y } = getCenterOf(rightArrow);
    await sendMouse({ type: 'click', position: [x, y] });

    const destinationPage = document.querySelector('ul.paginationitems > li.active-page');
    expect(destinationPage.textContent).to.equal('2');
  });

  it('clicking on the left arrow, displays the previous page', async () => {
    const pageSize = 2;
    await loadSearchResultsBlock('c', 3, pageSize);

    const initialPage = document.querySelector('ul.paginationitems > li.active-page');
    expect(initialPage.textContent).to.equal('3');

    const leftArrow = document.querySelector('ul.paginationitems > li.nav-arrow.first');
    expect(leftArrow).to.exist;
    const { x, y } = getCenterOf(leftArrow);
    await sendMouse({ type: 'click', position: [x, y] });

    const destinationPage = document.querySelector('ul.paginationitems > li.active-page');
    expect(destinationPage.textContent).to.equal('2');
  });

  it('clicking on the page number of an inactive page, displays that page', async () => {
    const pageSize = 2;
    await loadSearchResultsBlock('c', 1, pageSize);

    const page2 = document.querySelector('ul.paginationitems > li:nth-child(3) > span');
    expect(page2.textContent).to.equal('2');
    const { x, y } = getCenterOf(page2);
    await sendMouse({ type: 'click', position: [x, y] });

    const destinationPage = document.querySelector('ul.paginationitems > li.active-page');
    expect(destinationPage.textContent).to.equal('2');
  });

  it('shows a search form', async () => {
    await loadSearchResultsBlock('bev');

    const form = document.querySelector('div.search-form');
    expect(form).to.exist;
    const inputField = form.querySelector('input#search');
    expect(inputField).to.exist;
    expect(inputField.value).to.equal('bev');
    expect(inputField.name).to.equal('q');
    expect(inputField.placeholder).to.equal('SEARCH');

    const submitButton = form.querySelector('button');
    expect(submitButton).to.exist;
    expect(submitButton.type).to.equal('button');
    expect(submitButton.textContent.trim()).to.equal('SEARCH');
    const buttonImage = submitButton.querySelector('img');
    expect(buttonImage).to.exist;
    expect(buttonImage.src).to.contain('arrow-right-md.png');
  });

  it('should execute search from input field, pressing Enter', async () => {
    await loadSearchResultsBlock('');

    const input = document.querySelector('div.search-form > input#search');
    input.focus();

    await sendKeys({ type: 'copd' });
    await sendKeys({ press: 'Enter' });

    assertShowingResultsFor('copd');
    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(1);
    assertResult(results[0], QUERY_INDEX.data[4]);
  });

  it('should execute search from input field, clicking on the Search button', async () => {
    await loadSearchResultsBlock('');

    const input = document.querySelector('div.search-form > input#search');
    input.focus();
    await sendKeys({ type: 'copd' });

    const button = document.querySelector('div.search-form > button');
    const { x, y } = getCenterOf(button);
    await sendMouse({ type: 'click', position: [x, y] });

    assertShowingResultsFor('copd');
    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(1);
    assertResult(results[0], QUERY_INDEX.data[4]);
  });

  it('shows first page if requested page is out-of-bound', async () => {
    await loadSearchResultsBlock('bev', 5, 2);

    const activePage = document.querySelector('ul.paginationitems > li.active-page');
    expect(activePage).to.exist;
    expect(activePage.textContent).to.equal('1');

    assertShowingResultsFor('bev');
    const results = document.querySelectorAll('div.result-item');
    expect(results).to.have.lengthOf(2);
  });

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await resetMouse();
  });
});
