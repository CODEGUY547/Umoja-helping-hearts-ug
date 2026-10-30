(function () {
  const splashFrame = document.getElementById('splashFrame');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('umoja-splash-seen');

  function closeSplash() {
    if (!splashFrame || !splashFrame.isConnected) return;
    splashFrame.remove();
    document.body.classList.remove('no-scroll');
    sessionStorage.setItem('umoja-splash-seen', 'true');
  }

  if (splashFrame) {
    if (seen || reducedMotion) {
      splashFrame.remove();
    } else {
      document.body.classList.add('no-scroll');
      window.addEventListener('message', (event) => {
        if (event.source === splashFrame.contentWindow && event.data === 'umoja:splash-done') closeSplash();
      });
      window.setTimeout(closeSplash, 8500);
    }
  }

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), { passive: true });

  const heroVideo = document.getElementById('heroVideo');
  const heroVideoToggle = document.getElementById('heroVideoToggle');
  let heroVideoPaused = false;
  if (heroVideo && heroVideoToggle) {
    heroVideoToggle.addEventListener('click', () => {
      heroVideoPaused = !heroVideoPaused;
      heroVideo.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: heroVideoPaused ? 'pauseVideo' : 'playVideo',
        args: []
      }), '*');
      heroVideoToggle.innerHTML = heroVideoPaused
        ? '<span aria-hidden="true">▶</span> Play film'
        : '<span aria-hidden="true">Ⅱ</span> Pause film';
      heroVideoToggle.setAttribute('aria-label', heroVideoPaused ? 'Play background video' : 'Pause background video');
    });
  }

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13 });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add('visible'));
  }
})();
