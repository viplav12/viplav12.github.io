'use strict';

/* ── 1. MOBILE HAMBURGER MENU ───────────────────────────
   Toggles the mobile drawer + animates the burger icon.
   Closes when a nav link is tapped or backdrop is clicked.
──────────────────────────────────────────────────────── */
const burger    = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMenu(force) {
  const open = force !== undefined ? force : !burger.classList.contains('open');
  burger.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

if (burger && mobileNav) {
  burger.addEventListener('click', () => toggleMenu());

  // Close on any link tap
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}


/* ── 2. FADE-UP SCROLL ANIMATIONS ──────────────────────
   Elements with .fu start invisible and slide up when
   they enter the viewport.
──────────────────────────────────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(() => entry.target.classList.add('in'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: '0px 0px -28px 0px' }
);

document.querySelectorAll('.fu').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  fadeObserver.observe(el);
});


/* ── 3. NAVIGATION: SCROLL SHADOW + ACTIVE LINK ─────────
   • Adds a `scrolled` class after 40px for shadow.
   • Highlights the nav link matching the current section.
──────────────────────────────────────────────────────── */
const nav      = document.getElementById('nav');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

window.addEventListener(
  'scroll',
  () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    const current = sections.reduce(
      (active, section) =>
        window.scrollY >= section.offsetTop - 110 ? section : active,
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
