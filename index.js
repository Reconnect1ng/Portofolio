const sections = document.querySelectorAll('.section');
  const dotsNav  = document.getElementById('dots');
  const hint     = document.getElementById('scrollHint');
  const total    = sections.length;

  // Build dots
  sections.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => sections[i].scrollIntoView({ behavior: 'smooth' }));
    dotsNav.appendChild(d);
  });

  // Reveal on scroll + active dot
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = Array.from(sections).indexOf(e.target);
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
        hint.classList.toggle('hidden', idx === total - 1);
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => sectionObs.observe(s));
