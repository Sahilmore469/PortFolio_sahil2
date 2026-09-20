/**
 * cursor.js
 * Custom cursor – dot, lagging ring, and ambient glow.
 */

const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursorGlow');
const lbl  = document.getElementById('cur-label');

let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

document.addEventListener('mousemove', e => {
  dotX = e.clientX;
  dotY = e.clientY;
  dot.style.left  = dotX + 'px';
  dot.style.top   = dotY + 'px';
  glow.style.left = dotX + 'px';
  glow.style.top  = dotY + 'px';
  if(lbl){
    lbl.style.left = dotX + 'px';
    lbl.style.top = dotY + 'px';
  }
});

/* Ring follows with inertial lag */
(function animRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animRing);
})();

/* Hover expansion on interactive elements */
const HOVER_SELECTORS =
  'a, button, .skill-chip, .project-card, .cert-card, ' +
  '.achieve-card, .edu-item, .exp-item, .social-btn, ' +
  'input, textarea, #terminal';

document.querySelectorAll(HOVER_SELECTORS).forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

/* Click pulse */
document.addEventListener('mousedown', () => {
  dot.classList.add('clicking');
  ring.classList.add('clicking');
});
document.addEventListener('mouseup', () => {
  dot.classList.remove('clicking');
  ring.classList.remove('clicking');
});


/* CURSOR LABELS */
document.querySelectorAll('a, button, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('hovering');
    if(lbl){
      let t = 'View';
      if(el.tagName === 'A' && el.href.includes('mailto')) t = 'Email';
      else if(el.tagName === 'BUTTON') t = 'Click';
      lbl.textContent = el.dataset.cl || t;
      lbl.classList.add('vis');
    }
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('hovering');
    if(lbl) lbl.classList.remove('vis');
  });
});

/* STAT COUNTER */
function countUp(el){const t=parseInt(el.dataset.t),step=t/(2200/16);let n=0;const iv=setInterval(()=>{n=Math.min(n+step,t);el.textContent=Math.floor(n)+'+';if(n>=t)clearInterval(iv);},16);}
let counted=false;
const statsEl = document.getElementById('stats');
if(statsEl){
  new IntersectionObserver(es=>{if(es[0].isIntersecting&&!counted){counted=true;document.querySelectorAll('.sb-num').forEach(countUp);}},{threshold:.4}).observe(statsEl);
}


/* HAMBURGER MENU */
(function(){
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if(!hamburger || !mobileMenu) return;
  let isOpen = false;
  function openMenu(){
    isOpen=true;
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
  }
  function closeMenu(){
    isOpen=false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }
  hamburger.addEventListener('click', function(e){
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });
  document.querySelectorAll('.mob-link').forEach(function(link){
    link.addEventListener('click', function(){ closeMenu(); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && isOpen) closeMenu();
  });
})();