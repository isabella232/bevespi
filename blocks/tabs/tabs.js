function deselectAllPanels(block) {
  block.querySelectorAll('button[role="tab"]').forEach((button) => {
    button.setAttribute('aria-selected', 'false');
  });
  block.querySelectorAll('div[role="tabpanel"]').forEach((button) => {
    button.setAttribute('aria-selected', 'false');
  });
}

export default function decorate(block) {
  const tabNames = [...block.querySelectorAll(':scope > div > div:first-child')].map((div) => div.textContent);
  const tabLinks = [...block.querySelectorAll(':scope > div > div:nth-child(2)')].map((div) => div.textContent);

  block.innerHTML = '';

  block.append(document.createRange().createContextualFragment(`
    <div class='tab-controls-wrapper'>
      <div class='tab-controls reset-spacing'>
        ${tabNames.map((tabName, i) => `
          <button role="tab" aria-selected=${i === 0 ? 'true' : 'false'} aria-controls="panel-${i}">
            ${tabName}
          </button>
        `).join('')}
      </div>
    </div>
    <div class="tab-outlets">
      ${tabLinks.map((tabLink, i) => `
        <div id="panel-${i}" role="tabpanel" aria-selected="${i === 0 ? 'true' : 'false'}">${tabLink}</div>
      `).join('')}
    </div>
  `));

  block.querySelectorAll('button').forEach((button, i) => {
    button.addEventListener('click', () => {
      deselectAllPanels(block);
      button.setAttribute('aria-selected', 'true');
      block.querySelector(`div[role="tabpanel"][id="panel-${i}"]`).setAttribute('aria-selected', 'true');
    });
  });
}
