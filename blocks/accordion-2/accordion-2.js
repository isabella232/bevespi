export default async function decorate(block) {
  [...block.children].forEach((row) => {
    row.querySelector('picture')?.parentElement.classList.add('p-img-first');
    row.querySelector('h2 + p')?.classList.add('p-first');
    [...row.querySelectorAll('picture')].forEach((picture) => { picture.parentElement.classList.add('p-img'); });

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    buttons.innerHTML = '<span class="button-more">More +</span><span class="button-less">Less -</span>';
    row.querySelector('div').append(buttons);

    [...row.querySelectorAll('.buttons > span')].forEach((button) => {
      button.addEventListener('click', () => {
        [...block.querySelectorAll('.active')].forEach((active) => { active.classList.remove('active'); });
        if (button.classList.contains('button-more')) buttons.parentElement.classList.toggle('active');
      });
    });
  });
}
