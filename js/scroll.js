/**
 * scroll.js
 * – Smooth scroll with nav-height offset
 * – Active nav-link highlight on scroll
 * – Intersection-Observer reveal animation
 */

(function initScroll() {
  /* ── Smooth scroll ── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const navH = document.querySelector('nav').offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Active link highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const navH = document.querySelector('nav').offsetHeight;
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - navH - 40) current = sec.id;
    });
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.style.color      = active ? 'var(--cyan)' : '';
      a.style.textShadow = active ? 'var(--glow)'  : '';
    });
  });

  /* ── Scroll-reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  reveals.forEach(r => obs.observe(r));
})();
