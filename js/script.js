/* ============================================================
   TAREK MOHAMED — PORTFOLIO SCRIPTS
   ============================================================
   1. Section Loader  — fetches each section HTML file and
                        injects it into #app in order.
   2. Scroll Fade-In  — animates elements with class "fade-up"
                        when they enter the viewport.
   3. Active Nav Link — highlights the current nav link based
                        on scroll position.
   ============================================================ */


/* ── 1. SECTION LOADER ──────────────────────────────────────
   Add or remove filenames here to control which sections
   appear and in what order. That's all you need to do.
   No changes needed anywhere else.
----------------------------------------------------------- */
const SECTIONS = [
  'sections/nav.html',
  'sections/hero.html',
  'sections/services.html',
  'sections/about.html',
  'sections/skills.html',
  'sections/projects.html',
  'sections/experience.html',
  'sections/achievements.html',
  'sections/education.html',
  'sections/contact.html',
  'sections/footer.html',
];

async function loadSections() {
  const app = document.getElementById('app');

  for (const file of SECTIONS) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load: ${file}`);
      const html = await response.text();

      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;

      // Append each child node so we don't get an extra wrapper div
      while (wrapper.firstChild) {
        app.appendChild(wrapper.firstChild);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // After all sections are in the DOM, start the other scripts
  initFadeAnimation();
  initActiveNav();
}

loadSections();


/* ── 2. SCROLL FADE-IN ANIMATION ───────────────────────────
   Watches for elements with class "fade-up" entering the
   viewport and adds "visible" to trigger the CSS animation.
   To animate any new element: just add class="fade-up" in
   its section HTML file — no JS changes needed.
----------------------------------------------------------- */
function initFadeAnimation() {
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));
}


/* ── 3. ACTIVE NAV LINK HIGHLIGHTING ───────────────────────
   Watches scroll position and marks the matching nav link
   "active" for whichever section is in view.
   To support a new section: just give it an id in its HTML
   file and add a matching <a href="#id"> in nav.html.
   No JS changes needed.
----------------------------------------------------------- */
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop    = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + section.id
          );
        });
      }
    });
  });
}