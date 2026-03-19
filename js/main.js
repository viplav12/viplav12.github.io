/**
 * Viplav Kumar Singh — Portfolio Scripts
 *
 * Sections:
 *   1. Fade-up scroll animations
 *   2. Metric counter animations
 *   3. Navigation: scroll shadow + active link highlighting
 */

'use strict';

/* ── 1. FADE-UP ANIMATIONS ──────────────────────────────
   Elements with class `.fu` start invisible and slide up
   once they enter the viewport. A small staggered delay
   is applied per element group for a cascading effect.
──────────────────────────────────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.fu').forEach((el, index) => {
  el.dataset.delay = (index % 5) * 70;
  fadeObserver.observe(el);
});


/* ── 2. METRIC COUNTER ANIMATIONS ──────────────────────
   Numbers in the metrics strip animate from 0 to their
   target value using a cubic ease-out curve when scrolled
   into view. Uses `data-target` and optional `data-suffix`.
──────────────────────────────────────────────────────── */
function animateCounter(el, target, suffix = '') {
  const duration = 1600;
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    el.textContent = Math.round(target * eased) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const metricsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach((el) => {
          animateCounter(el, Number(el.dataset.target), el.dataset.suffix || '');
        });
        metricsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const metricsSection = document.getElementById('metrics');
if (metricsSection) metricsObserver.observe(metricsSection);


/* ── 3. NAVIGATION ──────────────────────────────────────
   • Adds a `scrolled` class to the nav bar after 40px
     scroll for a subtle shadow effect.
   • Highlights the active nav link based on the section
     currently in view.
──────────────────────────────────────────────────────── */
const nav      = document.getElementById('nav');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

window.addEventListener(
  'scroll',
  () => {
    // Shadow on scroll
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Active link
    const current = sections.reduce(
      (active, section) => (window.scrollY >= section.offsetTop - 100 ? section : active),
      sections[0]
    );

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current?.id}`
      );
    });
  },
  { passive: true }
);
