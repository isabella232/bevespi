import { loadScript } from '../../scripts/scripts.js';

let playerID = '';
let entryID = '';

function getTagDivId() {
  return `kaltura_player_${playerID}`;
}

function removeVideoPlaceholder(block) {
  const videoPlaceholder = block.querySelector(`#${getTagDivId()}`);
  if (videoPlaceholder) {
    videoPlaceholder.remove();
  }
}

function loadVideo(block) {
  const tagDiv = document.createElement('div');
  tagDiv.classList.add('video-player');
  const tagDivId = `kaltura_player_${playerID}`;
  tagDiv.id = tagDivId;
  block.append(tagDiv);

  loadScript('https://cdnapisec.kaltura.com/p/432521/sp/43252100/embedIframeJs/uiconf_id/52784152/partner_id/432521', () => {
    removeVideoPlaceholder(block);
    // eslint-disable-next-line
    kWidget.embed({
      targetId: tagDivId,
      wid: '_432521',
      uiconf_id: 52784152,
      flashvars: {
        autoPlay: true,
      },
      cache_st: playerID,
      entry_id: entryID,
    });
  });
}

function createVideoPlaceholder(block) {
  const videoPlaceholderWrapper = document.createElement('div');
  videoPlaceholderWrapper.classList.add('video-placeholder-wrapper');
  videoPlaceholderWrapper.id = getTagDivId();
  const videoPlaceholder = document.createElement('div');
  videoPlaceholder.classList.add('video-placeholder');
  videoPlaceholder.addEventListener('click', loadVideo.bind(null, block));
  videoPlaceholderWrapper.append(videoPlaceholder);

  block.append(videoPlaceholderWrapper);
}

export default function decorate(block) {
  playerID = block.querySelector('div:nth-of-type(1) > div:nth-of-type(2)')?.textContent;
  entryID = block.querySelector('div:nth-of-type(2) > div:nth-of-type(2)')?.textContent;
  [...block.querySelectorAll('div:nth-of-type(-n+2)')].forEach((div) => div.remove());

  createVideoPlaceholder(block);
}
