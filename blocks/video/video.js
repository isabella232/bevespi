import { loadScript } from '../../scripts/scripts.js';


export default function decorate(block) {
  const playerID = block.querySelector('div:nth-of-type(1) > div:nth-of-type(2)')?.textContent;
  const entryID = block.querySelector('div:nth-of-type(2) > div:nth-of-type(2)')?.textContent;
  [...block.querySelectorAll('div:nth-of-type(-n+2)')].forEach((div) => div.remove());

  const tagDiv = document.createElement('div');
  tagDiv.classList.add('video-player');
  const tagDivId = `kaltura_player_${playerID}`;
  tagDiv.id = tagDivId;
  block.append(tagDiv);

  // eslint-disable-next-line
  kWidget.embed({
    targetId: tagDivId,
    wid: '_432521',
    uiconf_id: 52784152,
    flashvars: {},
    cache_st: playerID,
    entry_id: entryID,
  });

}
