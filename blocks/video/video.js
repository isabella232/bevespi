import { loadScript } from '../../scripts/scripts.js';

export default function decorate(block) {
  const playerID = block.querySelector('div:nth-of-type(1) > div:nth-of-type(2)')?.textContent;
  const entryID = block.querySelector('div:nth-of-type(2) > div:nth-of-type(2)')?.textContent;
  [...block.querySelectorAll('div:nth-of-type(-n+2)')].forEach((div) => div.remove());

  const tagDiv = document.createElement('div');
  tagDiv.id = `kaltura_player_${playerID}`;
  tagDiv.style.width = '645px';
  tagDiv.style.height = '370px';
  block.append(tagDiv);

  loadScript(`https://cdnapisec.kaltura.com/p/432521/sp/43252100/embedIframeJs/uiconf_id/52784152/partner_id/432521`, () => {
    kWidget.embed({
      'targetId': `kaltura_player_${playerID}`,
      'wid': '_432521',
      'uiconf_id': 52784152,
      'flashvars': {},
      'cache_st': playerID,
      'entry_id': entryID
      });
    });
}