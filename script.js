(() => {
  'use strict';

  const services = [
    {name:'Traditional Thai Massage',category:'massage',tag:'Thai tradition',icon:'☾',description:'A Thai-inspired bodywork session using rhythmic pressure and assisted stretches to help ease everyday tension and restore a sense of balance.'},
    {name:'Thai Massage',category:'massage',tag:'Signature style',icon:'✳',description:'A restorative blend of pressure, movement and gentle stretching inspired by traditional Thai techniques.'},
    {name:'Thai Stretching Therapy',category:'massage',tag:'Mobility',icon:'↗',description:'A stretch-focused session designed to help you feel looser, more mobile and ready to move with ease.'},
    {name:'Thai Herbal Compress Therapy',category:'massage',tag:'Herbal ritual',icon:'❋',description:'A soothing massage experience featuring warm herbal compresses, subject to availability.'},
    {name:'Herbal Compress Therapy',category:'massage',tag:'Warm & soothing',icon:'❋',description:'A comforting herbal-compress treatment to accompany a quiet, relaxing spa session.'},
    {name:'Swedish Massage',category:'massage',tag:'Relaxation',icon:'〰',description:'Long, flowing massage strokes designed for a calming, restorative experience.'},
    {name:'Deep Tissue Massage',category:'massage',tag:'Focused pressure',icon:'◎',description:'A more focused massage option for guests who prefer deeper pressure on areas of muscle tension.'},
    {name:'Deep Muscle Therapy',category:'massage',tag:'Targeted care',icon:'◎',description:'Focused bodywork aimed at areas that feel tight or overworked. Share your pressure preferences with the team.'},
    {name:'Pain Management Massage',category:'massage',tag:'Targeted care',icon:'＋',description:'A focused massage option for areas of discomfort or tightness. Let the team know about any health concerns before booking.'},
    {name:'Trigger Point Therapy',category:'massage',tag:'Focused technique',icon:'⊙',description:'A focused technique that works on specific areas of muscle tension. Availability and suitability can be discussed before your session.'},
    {name:'Postural Alignment Massage',category:'massage',tag:'Body balance',icon:'↟',description:'A focused bodywork session designed around comfort, tension release and easier movement.'},
    {name:'Sports Massage',category:'massage',tag:'Recovery',icon:'↗',description:'A targeted massage option for active bodies and tired muscles. Tell us about your activity level when enquiring.'},
    {name:'Aromatherapy Massage',category:'massage',tag:'Essential oils',icon:'✧',description:'A relaxing massage experience pairing gentle techniques with aromatic oils, subject to availability and personal sensitivities.'},
    {name:'Aroma Massage',category:'massage',tag:'Sensory calm',icon:'✧',description:'A soothing massage option inspired by aromatic oils and slow, relaxing strokes.'},
    {name:'Balinese Massage',category:'massage',tag:'Flowing touch',icon:'〰',description:'A flowing, relaxation-focused massage style combining pressure and gentle movement.'},
    {name:'Full Body Massage',category:'massage',tag:'Head to toe',icon:'◌',description:'A full-body session to help you pause, release everyday tension and return to your day feeling refreshed.'},
    {name:'Warm Stone Therapy',category:'massage',tag:'Warmth & stillness',icon:'◉',description:'A warm-stone-inspired treatment for a deeply soothing, unhurried spa experience. Confirm availability when booking.'},
    {name:'Therapeutic Touch',category:'massage',tag:'Restorative',icon:'✳',description:'A relaxation-oriented session focused on comfort, gentle touch and an opportunity to unwind.'},
    {name:'Prenatal Massage',category:'massage',tag:'By prior enquiry',icon:'♡',description:'A pregnancy-focused option shown in the supplied listing screenshots. Please call in advance to confirm availability and suitability with a qualified provider.'},
    {name:'Couple’s Massage Experience',category:'experience',tag:'Together',icon:'♡',description:'A shared relaxation experience for two. Ask about room arrangements, available therapies and booking times.'},
    {name:'Four-Hand Therapy',category:'massage',tag:'A shared rhythm',icon:'✦',description:'A four-hand massage experience, where two therapists work in a coordinated rhythm. Advance confirmation is recommended.'},
    {name:'Reflexology',category:'massage',tag:'Pressure points',icon:'⊙',description:'A pressure-point-focused treatment for the feet, with options and session details confirmed by the spa team.'},
    {name:'Foot and Leg Massage',category:'massage',tag:'Tired feet',icon:'∿',description:'A focused foot and leg massage to help ease the feeling of tiredness after a long day.'},
    {name:'Scalp and Neck Massage',category:'massage',tag:'Express reset',icon:'≈',description:'A focused treatment for the scalp, neck and shoulders when you need a lighter, shorter reset.'},
    {name:'Stress Relief Massage',category:'massage',tag:'Slow down',icon:'☼',description:'A calming massage option designed to create space to relax, pause and reset.'},
    {name:'Circulation Boost Massage',category:'massage',tag:'Energising',icon:'↝',description:'A movement-focused massage option intended to leave the body feeling refreshed. Ask the spa about suitability.'},
    {name:'Relaxation Therapy',category:'massage',tag:'Quiet time',icon:'☾',description:'A gentle, relaxation-first session built around a calm environment and an unhurried pace.'},
    {name:'Body Scrub',category:'body',tag:'Exfoliate',icon:'✧',description:'A body exfoliation treatment designed to leave skin feeling smoother and refreshed.'},
    {name:'Body Polishing',category:'body',tag:'Glow ritual',icon:'✦',description:'A skin-smoothing body treatment combining exfoliation and nourishment for a softer, radiant feel.'},
    {name:'Salt Treatments',category:'body',tag:'Body care',icon:'◇',description:'Salt-based exfoliation or body-care options shown in the supplied menu screenshots. Confirm the specific treatment available.'},
    {name:'Skin Treatments',category:'body',tag:'Skin care',icon:'❋',description:'Ask the team about current skin-care treatments and which options are suitable for your needs.'},
    {name:'Spa Packages',category:'experience',tag:'Curated time',icon:'✧',description:'Ask about combinations of available massage and body-care treatments for a longer spa visit.'},
    {name:'Spa Parties',category:'experience',tag:'Shared occasions',icon:'♡',description:'Enquire about group arrangements for special occasions and which experiences can be organised together.'},
    {name:'Private Suites',category:'experience',tag:'More privacy',icon:'▱',description:'Ask about private-room availability and the room setup for your selected experience.'},
    {name:'Acrylic Nails',category:'beauty',tag:'Nail styling',icon:'✦',description:'Acrylic nail styling with attention to shape and finish. Enquire about designs, lengths and availability.'}
  ];

  const grid = document.getElementById('services-grid');
  const search = document.getElementById('service-search');
  const filterButtons = Array.from(document.querySelectorAll('.filter-tab'));
  let activeFilter = 'all';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function renderServices() {
    const term = (search.value || '').trim().toLowerCase();
    const visible = services.filter(service =>
      (activeFilter === 'all' || service.category === activeFilter) &&
      (!term || `${service.name} ${service.description} ${service.tag}`.toLowerCase().includes(term))
    );
    if (!visible.length) {
      grid.innerHTML = '<p class="empty-services">No treatments matched that search. Try a different term or ask us directly.</p>';
      return;
    }
    grid.innerHTML = visible.map((service, index) => {
      const message = encodeURIComponent(`Hello Lune Thai Spa, I'd like to enquire about ${service.name}. Could you share availability and current pricing?`);
      return `<article class="service-card" style="animation-delay:${Math.min(index * 35, 280)}ms"><div class="service-card-top"><span class="service-icon" aria-hidden="true">${escapeHtml(service.icon)}</span><span class="service-label">${escapeHtml(service.tag)}</span></div><h3>${escapeHtml(service.name)}</h3><p>${escapeHtml(service.description)}</p><a class="service-book" href="https://wa.me/918867976713?text=${message}" target="_blank" rel="noopener">Enquire about treatment <span>↗</span></a></article>`;
    }).join('');
  }

  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderServices();
  }));
  search.addEventListener('input', renderServices);
  document.addEventListener('keydown', event => {
    if ((event.key === '/' || event.key === 'f') && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey && !event.altKey) {
      if (event.key === '/' || (event.key === 'f' && event.shiftKey)) { event.preventDefault(); search.focus(); }
    }
  });
  renderServices();

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }
  menuToggle.addEventListener('click', () => {
    const opened = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded',String(!opened));
    menuToggle.setAttribute('aria-label',opened ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open',!opened);
    document.body.classList.toggle('nav-open',!opened);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  window.addEventListener('resize',() => { if (window.innerWidth > 760) closeMenu(); },{passive:true});

  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:0.12,rootMargin:'0px 0px -25px 0px'});
    revealTargets.forEach(element => { element.classList.add('will-reveal'); revealObserver.observe(element); });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.querySelector('.lightbox-close');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    const image = item.querySelector('img');
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = item.querySelector('.gallery-overlay span').textContent;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else window.open(item.dataset.full,'_blank','noopener');
  }));
  closeLightbox.addEventListener('click',() => lightbox.close());
  lightbox.addEventListener('click',event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close',() => { lightboxImage.src = ''; });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
