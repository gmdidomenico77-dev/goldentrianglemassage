/* Golden Triangle Massage — shared behavior */
(function () {
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav: transparent over hero -> solid on scroll */
  var nav = document.querySelector('.nav');
  if (nav) {
    var solidify = function () {
      nav.classList.toggle('is-solid', window.scrollY > 24);
    };
    solidify();
    window.addEventListener('scroll', solidify, { passive: true });
  }

  /* Mobile menu */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nav__toggle-label').textContent = open ? 'Close' : 'Menu';
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('.nav__toggle-label').textContent = 'Menu';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('.nav__toggle-label').textContent = 'Menu';
        toggle.focus();
      }
    });
  }

  /* Scroll reveals — enhance already-visible content; never gate visibility */
  var risers = document.querySelectorAll('.rise');
  if (!reduceMotion && 'IntersectionObserver' in window && risers.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    risers.forEach(function (el, i) {
      /* stagger only siblings that share a parent group */
      var delay = parseFloat(el.dataset.riseDelay || 0);
      if (delay) el.style.transitionDelay = delay + 'ms';
      io.observe(el);
    });
    /* safety: if anything is still hidden after 2.5s (headless, odd viewports), show it */
    setTimeout(function () {
      risers.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  } else {
    risers.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
