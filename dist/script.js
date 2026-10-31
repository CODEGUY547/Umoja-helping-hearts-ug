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

  const projects = {
    education: {
      number: 'Project 01', tag: 'A path into the classroom', kicker: 'When potential meets opportunity', title: 'Education', image: 'assets/education.jpg', alt: 'Children gathered during an education support activity',
      lead: 'A child’s future should not be decided by whether a family can afford fees, books, shoes or basic learning materials.',
      need: 'Financial hardship can keep capable children at home or make regular attendance difficult.',
      response: 'School support, learning materials and mentorship help remove the practical barriers around a child’s education.',
      change: 'Children have a stronger chance to remain in class, learn with confidence and keep moving toward their ambitions.'
    },
    water: {
      number: 'Project 02', tag: 'Clean water, closer to home', kicker: 'When one necessity changes the whole day', title: 'Clean water', image: 'assets/water.jpg', alt: 'Community water infrastructure supported by Umoja',
      lead: 'For communities without a dependable nearby source, collecting water can take hours and unsafe water can put health at risk.',
      need: 'Long journeys and unreliable water sources place an extra burden on children, women and entire households.',
      response: 'Umoja supports boreholes, wells and water systems, including rehabilitation and community sanitation awareness.',
      change: 'Safer water closer to homes and schools can protect wellbeing and return valuable time to learning, work and family life.'
    },
    construction: {
      number: 'Project 03', tag: 'Spaces where communities can thrive', kicker: 'Building more than walls', title: 'Construction', image: 'assets/community.jpg', alt: 'Community members and partners gathered during an Umoja activity',
      lead: 'A safe, dependable building can become the place where a community learns, receives care, gathers and grows together.',
      need: 'Some communities lack secure homes or essential facilities such as schools, health centres, mosques and shared spaces.',
      response: 'Construction support focuses on practical, reliable infrastructure shaped around the needs of the people who will use it.',
      change: 'Stronger facilities improve access to services and give communities a safer foundation for the future.'
    },
    food: {
      number: 'Project 04', tag: 'Relief that reaches the family table', kicker: 'Meeting hunger with dignity', title: 'Food support', image: 'assets/food.jpg', alt: 'Food packages prepared for distribution to families',
      lead: 'When food is uncertain, every other plan becomes harder. Timely support can give a household room to breathe again.',
      need: 'Vulnerable families, older people, widows and children can face days when even a reliable meal is not guaranteed.',
      response: 'Monthly food parcels and seasonal distributions provide essential items through community-based delivery.',
      change: 'Immediate hunger is eased while families receive support respectfully and with their dignity protected.'
    },
    emergency: {
      number: 'Project 05', tag: 'Standing beside families in crisis', kicker: 'Help when waiting is not an option', title: 'Emergency relief', image: 'assets/impact.jpg', alt: 'Umoja representatives listening to community members',
      lead: 'A sudden crisis can take away a family’s security overnight. The first response must be practical, compassionate and timely.',
      need: 'Displacement, disaster or an unexpected hardship can leave households without the essentials they depend on.',
      response: 'Umoja coordinates urgent assistance around the immediate needs identified with local leaders and affected families.',
      change: 'Essential support helps people regain stability and begin the longer journey toward recovery.'
    },
    livelihoods: {
      number: 'Project 06', tag: 'From short-term help to lasting stability', kicker: 'Opportunity that continues to grow', title: 'Livelihoods', image: 'assets/community.jpg', alt: 'Community partners taking part in an Umoja programme',
      lead: 'Relief matters in the present. A livelihood can help a household shape what happens next.',
      need: 'Limited income opportunities can keep families dependent on emergency support even when they are ready to work and grow.',
      response: 'Business empowerment and practical assistance help people pursue income-generating opportunities suited to their circumstances.',
      change: 'Households can move toward greater independence, resilience and the confidence to plan ahead.'
    },
    cash: {
      number: 'Project 07', tag: 'Support with room for personal choice', kicker: 'Because every urgent need is different', title: 'Cash relief', image: 'assets/impact.jpg', alt: 'A community conversation during an Umoja outreach activity',
      lead: 'Sometimes the most useful support is the freedom to address the need a family knows is most urgent.',
      need: 'A medical cost, school requirement, rent payment or household emergency may not be solved by a standard relief package.',
      response: 'Targeted cash assistance offers flexible help where an identified household need calls for a direct response.',
      change: 'Families retain agency over urgent decisions while receiving a bridge through a difficult moment.'
    },
    seasonal: {
      number: 'Project 08', tag: 'A season of giving, shared with all', kicker: 'Faith expressed through compassionate action', title: 'Iftar & Qurbani', image: 'assets/food.jpg', alt: 'Food provisions arranged for a seasonal community distribution',
      lead: 'Ramadan and Qurbani are moments when generosity becomes a meal shared, a burden lightened and a family remembered.',
      need: 'During important seasons, vulnerable families may still be unable to prepare an Iftar meal or share in a nourishing celebration.',
      response: 'Iftar meals, food packages and Qurbani distributions reach orphans, widows, older people and families in rural and urban communities.',
      change: 'Giving is translated into food, inclusion and a renewed sense of dignity at a meaningful time of year.'
    }
  };

  const projectTabs = document.querySelectorAll('.project-tab');
  const projectMedia = document.querySelector('.project-story-media');
  const projectFields = {
    image: document.getElementById('projectImage'), number: document.getElementById('projectNumber'), tag: document.getElementById('projectTag'),
    kicker: document.getElementById('projectKicker'), title: document.getElementById('projectTitle'), lead: document.getElementById('projectLead'),
    need: document.getElementById('projectNeed'), response: document.getElementById('projectResponse'), change: document.getElementById('projectChange'), action: document.getElementById('projectAction')
  };

  function showProject(projectKey) {
    const project = projects[projectKey];
    if (!project || !projectFields.image) return;
    projectMedia.classList.add('is-changing');
    window.setTimeout(() => {
      projectFields.image.src = project.image;
      projectFields.image.alt = project.alt;
      ['number', 'tag', 'kicker', 'title', 'lead', 'need', 'response', 'change'].forEach((field) => {
        projectFields[field].textContent = project[field];
      });
      projectFields.action.href = `donate.html?project=${encodeURIComponent(projectKey)}`;
      projectMedia.classList.remove('is-changing');
      if (window.gsap && !reducedMotion) {
        window.gsap.fromTo('.project-story-copy > *',
          { autoAlpha: 0, x: 14 },
          { autoAlpha: 1, x: 0, duration: .42, stagger: .045, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }
        );
      }
    }, reducedMotion ? 0 : 160);
    projectTabs.forEach((tab) => {
      const selected = tab.dataset.project === projectKey;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
  }

  projectTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showProject(tab.dataset.project));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
      const nextTab = projectTabs[(index + direction + projectTabs.length) % projectTabs.length];
      nextTab.focus();
      showProject(nextTab.dataset.project);
    });
  });

  const reveals = document.querySelectorAll('.reveal');

  function initGsapStorytelling() {
    if (!window.gsap || !window.ScrollTrigger || reducedMotion) return false;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    document.documentElement.classList.add('gsap-enhanced');

    reveals.forEach((item) => {
      item.classList.add('visible');
      gsap.fromTo(item,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: .82,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true }
        }
      );
    });

    gsap.from('.project-tab', {
      autoAlpha: 0,
      x: -12,
      duration: .45,
      stagger: .055,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: '.project-explorer', start: 'top 78%', once: true }
    });

    gsap.from('.ripple-flow div', {
      autoAlpha: 0,
      y: 16,
      duration: .55,
      stagger: .14,
      ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: { trigger: '.ripple-flow', start: 'top 86%', once: true }
    });

    window.ScrollTrigger.matchMedia({
      '(min-width: 901px)': function () {
        gsap.utils.toArray('.story-beat-media img').forEach((image) => {
          gsap.fromTo(image,
            { yPercent: -2, scale: 1.035 },
            {
              yPercent: 2,
              scale: 1.015,
              ease: 'none',
              scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
            }
          );
        });

        gsap.utils.toArray('.gallery img').forEach((image) => {
          gsap.fromTo(image,
            { scale: 1.06 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
            }
          );
        });
      }
    });

    window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
    return true;
  }

  if (!initGsapStorytelling()) {
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
  }
})();
