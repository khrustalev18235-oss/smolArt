(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  const art = document.querySelector('.sculpture');
  const hero = document.querySelector('.hero');
  let ticking = false;
  const updateScrollScene = () => {
    if (!hero || !art || reduced) return;
    const rect = hero.getBoundingClientRect();
    const range = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / range));
    art.style.transform = `translateY(${progress * -42}px) rotate(${progress * 7 - 1}deg) scale(${1 + progress * .07})`;
    hero.style.setProperty('--scroll-progress', progress.toFixed(3));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollScene);
      ticking = true;
    }
  }, { passive: true });
  updateScrollScene();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
})();