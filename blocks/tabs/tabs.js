import { decorateIcons } from '../../scripts/aem.js';
import { loadFragment as genericLoadFragment } from '../fragment/fragment.js';

function deselectAllPanels(block) {
  block.querySelectorAll('button[role="tab"]').forEach((button) => {
    button.setAttribute('aria-selected', 'false');
  });
  block.querySelectorAll('div[role="tabpanel"]').forEach((panel) => {
    panel.setAttribute('active', 'false');
    panel.classList.remove('animate-in');
  });
}

async function loadFragment(url) {
  let path = url;
  if (url && !url.startsWith('/')) {
    path = new URL(url).pathname;
  }
  const main = await genericLoadFragment(path);
  return main?.querySelector('.section');
}

export default async function decorate(block) {
  const tabNames = [...block.querySelectorAll(':scope > div > div:first-child')].map((div) => div.textContent);
  const tabLinks = [...block.querySelectorAll(':scope > div > div:nth-child(2)')].map((div) => div.textContent);

  block.innerHTML = '';

  const fragments = await Promise.all(tabLinks.map((link) => loadFragment(link)));

  block.append(document.createRange().createContextualFragment(`
    <div class='tab-controls-wrapper' id="tab-controls-wrapper">
      <button name="dropdown" aria-controls="tab-controls-wrapper" class='dropdown-toggle'>
        Sections <span class="icon icon-menu-down"></span>
      </button>
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
        <div class="animate-in" id="panel-${i}" role="tabpanel" active="${i === 0 ? 'true' : 'false'}"></div>
      `).join('')}
    </div>
  `));

  block.querySelectorAll('button[role="tab"]').forEach((button, i) => {
    button.addEventListener('click', () => {
      deselectAllPanels(block);
      button.setAttribute('aria-selected', 'true');
      const panel = block.querySelector(`div[role="tabpanel"][id="panel-${i}"]`);
      panel.setAttribute('active', 'true');
      setTimeout(() => {
        panel.classList.add('animate-in');
      }, 1);
    });
  });

  block.querySelector('button[name="dropdown"]').addEventListener('click', () => {
    block.querySelector('button[name="dropdown"]')
      .closest('.tab-controls-wrapper')
      .toggleAttribute('aria-expanded');
  });

  document.querySelectorAll('div[role="tabpanel"]').forEach((panel, i) => {
    panel.append(fragments[i]);
  });

  decorateIcons(block);
}
