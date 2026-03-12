// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}

// Smooth scroll for anchor links (polyfill for older browsers)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Constellation layout
function layoutConstellation() {
  const container = document.querySelector('.constellation');
  if (!container) return;

  const nodes = container.querySelectorAll('.constellation-node');
  const svg = container.querySelector('.constellation-lines');
  const count = nodes.length;
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.46;
  const rx = radius;
  const ry = radius;
  const startAngle = -Math.PI / 2;

  // Position nodes in an ellipse
  nodes.forEach((node, i) => {
    const angle = startAngle + (2 * Math.PI * i) / count;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    node.style.left = x + 'px';
    node.style.top = y + 'px';
  });

  // Draw SVG lines from center to each node
  svg.innerHTML = '';
  const ns = 'http://www.w3.org/2000/svg';
  nodes.forEach((node, i) => {
    const angle = startAngle + (2 * Math.PI * i) / count;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', cx);
    line.setAttribute('y1', cy);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);
    line.dataset.index = i;
    svg.appendChild(line);

    // Highlight line on node hover
    node.addEventListener('mouseenter', () => {
      line.style.stroke = 'var(--color-accent)';
      line.style.strokeWidth = '2.5';
    });
    node.addEventListener('mouseleave', () => {
      line.style.stroke = '';
      line.style.strokeWidth = '';
    });
  });
}

layoutConstellation();
window.addEventListener('resize', layoutConstellation);
