const toSVGPoint = (svg, x, y) => {
  const p = new DOMPoint(x, y);
  return p.matrixTransform(svg.getScreenCTM().inverse());
};

export default async function buildSvgMask(container) {
  container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="263" height="400">
      <defs>
        <mask id="iris">
          <circle r="90" cx="150" cy="100" fill="white" style="opacity: 1;"></circle>
        </mask>
      </defs>
      <g id="outer">
        <image width="100%" height="100%" xlink:href="/images/inhaler.png"></image>
      </g>
      <g id="inner">
        <image mask="url(#iris)" width="100%" height="100%" xlink:href="/images/inhaler_XRay.png"></image>
      </g>
    </svg>
  `;
  const svg = container.querySelector('svg');
  const c = svg?.querySelector('circle');
  if (c) {
    svg.addEventListener('mousemove', (e) => {
      const m = toSVGPoint(svg, e.clientX, e.clientY);
      const b = e.target.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const r = Math.max(0, Math.min((x - b.left), (y - b.top), (b.right - x), (b.bottom - y), 90));
      c.setAttributeNS(null, 'cx', m.x);
      c.setAttributeNS(null, 'cy', m.y);
      c.setAttributeNS(null, 'r', r);
    });

    svg.addEventListener('mouseleave', () => {
      c.classList.add('transition');
      c.setAttributeNS(null, 'r', 90);
      c.setAttributeNS(null, 'cx', 150);
      c.setAttributeNS(null, 'cy', 100);
    });

    svg.addEventListener('mouseenter', () => {
      c.classList.remove('transition');
    });
  }
}
