export default async function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('accordion-row');
    const button = document.createElement('span');
    row.querySelector('div').prepend(button);
    button.addEventListener('click', (e) => { e.target.closest('.accordion-row').classList.toggle('active'); });
  });
}
