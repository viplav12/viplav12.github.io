'use strict';

/* ── 1. MOBILE MENU ─────────────────────────────────────
   Toggles the mobile drawer + animates the burger, and
   locks body scroll while open. Closes on link tap.
──────────────────────────────────────────────────────── */
const burger    = document.querySelector('.burger');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMenu(force) {
  const open = force !== undefined ? force : !burger.classList.contains('open');
  burger.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
}

if (burger && mobileNav) {
  burger.addEventListener('click', () => toggleMenu());
  mobileNav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => toggleMenu(false))
  );
}


/* ── 2. FADE-UP ON SCROLL ───────────────────────────────
   Elements with .fu rise into view once, staggered lightly.
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
  { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
);

document.querySelectorAll('.fu').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 70;
  fadeObserver.observe(el);
});


/* ── 3. HEADER STATE, PROGRESS BAR & ACTIVE LINK ────────
   • `stuck` class after 24px for the glass background.
   • Scroll-progress bar scales with page position.
   • Highlights the nav link for the section in view.
──────────────────────────────────────────────────────── */
const header   = document.getElementById('header');
const progress = document.getElementById('progress');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('stuck', y > 24);

  if (progress) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  }

  const current = sections.reduce(
    (active, section) => (y >= section.offsetTop - 120 ? section : active),
    sections[0]
  );
  navLinks.forEach((link) =>
    link.classList.toggle('active', link.getAttribute('href') === `#${current?.id}`)
  );
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
