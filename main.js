/**
 * OM W MOTIONS — Interactive Runtime Script
 * Handles custom cursor, canvas particles, theme toggle, mobile menu,
 * scroll reveals, lightbox modals, gallery filtering, testimonials and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCustomCursor();
  initHeroCanvas();
  initHeaderScroll();
  initThemeToggle();
  initNavigation();
  initMobileMenu();
  initScrollReveals();
  initProjectModals();
  initGalleryFilter();
  initTestimonials();
  initContactForm();
});

/* ----------------------------------------------------
   1. Scroll Progress Bar
---------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }, { passive: true });
}

/* ----------------------------------------------------
   2. Custom Cinematic Cursor
---------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Only enable custom cursor for non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .project-card, input, select, textarea, .service-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(1.6)`;
      ring.style.borderColor = 'var(--accent)';
      ring.style.backgroundColor = 'rgba(200, 150, 90, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px) scale(1)`;
      ring.style.borderColor = 'rgba(245, 245, 240, 0.4)';
      ring.style.backgroundColor = 'transparent';
    });
  });
}

/* ----------------------------------------------------
   3. Ambient Hero Canvas Animation
---------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.querySelector('#hero canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particleCount = Math.min(45, Math.floor(width / 30));
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.6 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -Math.random() * 0.4 - 0.1,
    alpha: Math.random() * 0.6 + 0.2,
    pulseSpeed: Math.random() * 0.02 + 0.005
  }));

  function animateHero() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.alpha += Math.sin(Date.now() * 0.002) * p.pulseSpeed;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 150, 90, ${currentAlpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(200, 150, 90, 0.4)';
      ctx.fill();
    });

    requestAnimationFrame(animateHero);
  }

  animateHero();
}

/* ----------------------------------------------------
   4. Header Blur & Transform on Scroll
---------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 40) {
      header.style.paddingTop = '16px';
      header.style.paddingBottom = '16px';
      header.style.background = 'rgba(10, 10, 10, 0.85)';
      header.style.backdropFilter = 'blur(16px)';
      header.style.webkitBackdropFilter = 'blur(16px)';
      header.style.borderBottom = '1px solid var(--border)';
    } else {
      header.style.paddingTop = '24px';
      header.style.paddingBottom = '20px';
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
      header.style.borderBottom = 'none';
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* ----------------------------------------------------
   5. Theme Toggle (Dark / Light)
---------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.querySelector('header button[aria-label*="mode"]') || document.querySelector('button[title*="mode"]');
  if (!themeBtn) return;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('omw_theme', 'light');
      themeBtn.setAttribute('title', 'Switch to dark mode');
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
      themeBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-foreground">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('omw_theme', 'dark');
      themeBtn.setAttribute('title', 'Switch to light mode');
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
      themeBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-foreground">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    }
  }

  const savedTheme = localStorage.getItem('omw_theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
    showToast(`Switched to ${isLight ? 'Dark' : 'Light'} Mode`, 'info');
  });
}

/* ----------------------------------------------------
   6. Navigation & Smooth Scrolling
---------------------------------------------------- */
function initNavigation() {
  function scrollToSection(targetId) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    }
  }

  // Desktop nav buttons
  document.querySelectorAll('nav[aria-label="Main navigation"] button').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionName = btn.textContent.trim().toLowerCase();
      scrollToSection(sectionName);
    });
  });

  // Mobile nav buttons
  document.querySelectorAll('.mobile-menu-overlay nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionName = btn.textContent.trim().toLowerCase();
      scrollToSection(sectionName);
    });
  });

  // Hero CTAs
  document.querySelectorAll('a[href="#work"], a[aria-label="View featured work"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('work');
    });
  });

  // Header "GET IN TOUCH" button
  document.querySelectorAll('a[aria-label="Contact OM Vaisnav"], a[href="mailto:omwmotions@gmail.com"]').forEach(a => {
    if (a.textContent.includes('GET IN TOUCH')) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('contact');
      });
    }
  });

  // Logos to top
  document.querySelectorAll('a[aria-label*="Home"], a[href="#hero"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ----------------------------------------------------
   7. Mobile Menu Drawer
---------------------------------------------------- */
let isMobileMenuOpen = false;

function openMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const menuBtn = document.querySelector('header button[aria-label="Open menu"]');
  if (!mobileMenu) return;

  isMobileMenuOpen = true;
  mobileMenu.style.opacity = '1';
  mobileMenu.style.visibility = 'visible';
  mobileMenu.style.pointerEvents = 'auto';
  menuBtn?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';

  const links = mobileMenu.querySelectorAll('button, a');
  links.forEach((link) => {
    link.style.opacity = '1';
    link.style.transform = 'translateY(0)';
  });
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu-overlay');
  const menuBtn = document.querySelector('header button[aria-label="Open menu"]');
  if (!mobileMenu) return;

  isMobileMenuOpen = false;
  mobileMenu.style.opacity = '0';
  mobileMenu.style.visibility = 'hidden';
  mobileMenu.style.pointerEvents = 'none';
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';

  const links = mobileMenu.querySelectorAll('button, a');
  links.forEach(link => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
  });
}

function initMobileMenu() {
  const openBtn = document.querySelector('header button[aria-label="Open menu"]');
  const closeBtn = document.querySelector('.mobile-menu-overlay button[aria-label="Close menu"]');

  openBtn?.addEventListener('click', openMobileMenu);
  closeBtn?.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

/* ----------------------------------------------------
   8. Scroll Reveals (IntersectionObserver)
---------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal all immediately
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ----------------------------------------------------
   9. Project Lightbox Modals & Video Previews
---------------------------------------------------- */
const projectData = {
  "CHROME & SHADOWS": {
    category: "COMMERCIAL FILM",
    year: "2024",
    location: "MUMBAI, INDIA",
    camera: "RED V-RAPTOR 8K VV",
    lenses: "COOKE ANAMORPHIC /i SF",
    desc: "A bold, dark-themed industrial visual showcase emphasizing metallic textures, chrome highlights, and dramatic single-source lighting for high-end automotive design.",
    img: "./rocket_gen_img_19a56f330-1785926338112.png"
  },
  "DESERT FREQUENCY": {
    category: "MUSIC VIDEO",
    year: "2024",
    location: "THAR DESERT, RAJASTHAN",
    camera: "ARRI ALEXA MINI LF",
    lenses: "ATLAS ORION ANAMORPHIC",
    desc: "Golden hour and twilight compositions across sweeping desert dunes. Shot with organic haze and atmospheric low-key framing to match the track's hypnotic electronic pulse.",
    img: "./rocket_gen_img_101d5ea36-1776204536562.png"
  },
  "VESSEL": {
    category: "NARRATIVE FILM",
    year: "2023",
    location: "AHMEDABAD, GUJARAT",
    camera: "SONY VENICE 2",
    lenses: "ZEISS SUPREME PRIMES",
    desc: "An intimate character study framed through high-contrast chiaroscuro and delicate shadow sculpting. Selected for premier indie showcase screenings.",
    img: "./rocket_gen_img_19217d809-1772614075262.png"
  },
  "THE LAST MONSOON": {
    category: "DOCUMENTARY",
    year: "2023",
    location: "WESTERN GHATS, MAHARASHTRA",
    camera: "ARRI ALEXA MINI",
    lenses: "CANON K35 VINTAGE PRIMES",
    desc: "Raw, torrential monsoon landscapes and rural human resilience. Captured entirely with handheld movement and available ambient stormy daylight.",
    img: "./photo-1600780416155-69f760151022"
  },
  "SILK & STEEL": {
    category: "FASHION FILM",
    year: "2024",
    location: "JAIPUR STUDIO, RAJASTHAN",
    camera: "RED MONSTRO 8K",
    lenses: "HAWK V-LITE ANAMORPHIC",
    desc: "Textural contrast between heritage woven fabrics and brutalist architectural backdrops with precise edge lighting and color-rich tones.",
    img: "./rocket_gen_img_176ecf970-1779315366432.png"
  },
  "NEON PULSES": {
    category: "BRAND FILM",
    year: "2025",
    location: "MUMBAI NIGHTSCAPE",
    camera: "SONY FX9 / VENICE",
    lenses: "MASTER PRIMES T1.3",
    desc: "A nocturnal journey through Mumbai's neon-lit rain streets, wet asphalt reflections, and vibrant urban energy for a tech lifestyle brand.",
    img: "./rocket_gen_img_195679ee6-1774355165943.png"
  },
  "ROSHNI": {
    category: "DESTINATION WEDDING FILM",
    year: "2024",
    location: "LAKE PICHOLA, UDAIPUR",
    camera: "ARRI ALEXA MINI LF",
    lenses: "COOKE S4/i PRIMES",
    desc: "A 3-day royal destination wedding at a heritage lakeside palace. Golden hour ghats at dawn, candlelit sangeet ceremonies, and unposed emotional depth.",
    img: "./photo-1647407929979-9818ebcf31be"
  },
  "MAATI": {
    category: "CULTURAL DOCUMENTARY",
    year: "2024",
    location: "VARANASI GHATS, UP",
    camera: "ARRI AMIRA",
    lenses: "ANGENIEUX OPTIMO ZOOM",
    desc: "Sunrise on the Ganges, sacred temple rituals, and morning mist. A documentary capturing the ancient rhythm of life along the holy ghats.",
    img: "./rocket_gen_img_15f248edc-1775243247944.png"
  },
  "ZARA SA": {
    category: "MUSIC VIDEO",
    year: "2024",
    location: "JAIPUR, RAJASTHAN",
    camera: "RED V-RAPTOR",
    lenses: "LAOWA ANAMORPHIC",
    desc: "Stylized Bollywood contemporary aesthetic merging neon architectural lighting with the pink city's heritage stone textures.",
    img: "./rocket_gen_img_1d00c6db3-1773035149598.png"
  },
  "SONA CHANDI": {
    category: "LUXURY BRAND FILM",
    year: "2024",
    location: "MUMBAI, MAHARASHTRA",
    camera: "ARRI ALEXA MINI LF",
    lenses: "MACRO COOKE PRIMES",
    desc: "High-precision commercial cinematography for fine gold jewelry craftsmanship, macro reflections, and rich warm specular highlights.",
    img: "./rocket_gen_img_16ec88284-1772880754748.png"
  },
  "RANG": {
    category: "MUSIC VIDEO",
    year: "2024",
    location: "AHMEDABAD, GUJARAT",
    camera: "RED KOMODO-X",
    lenses: "DZO VESPID PRIMES",
    desc: "Energetic festival choreography shot with dynamic handheld gimbal flow and vibrant color saturation.",
    img: "./rocket_gen_img_197362776-1772214525339.png"
  },
  "GHAR": {
    category: "NARRATIVE FILM",
    year: "2023",
    location: "OLD DELHI, NCR",
    camera: "SONY FX6",
    lenses: "VINTAGE ZEISS JENA",
    desc: "A poignant portrait of generational memory set within the narrow alleyways and heritage courtyards of Old Delhi.",
    img: "./rocket_gen_img_17f6b6909-1787050416333.png"
  }
};

function openProjectModal(title) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const data = projectData[title] || {
    category: "CINEMATOGRAPHY",
    year: "2024",
    location: "INDIA",
    camera: "RED / ARRI CINEMA",
    lenses: "ANAMORPHIC PRIMES",
    desc: "Cinematic visual project by OM Vaisnav. Captured in pristine 4K with custom film emulation color grading.",
    img: "./rocket_gen_img_19a56f330-1785926338112.png"
  };

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-year').textContent = data.year;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-img').src = data.img;
  document.getElementById('modal-camera').textContent = data.camera;
  document.getElementById('modal-lenses').textContent = data.lenses;
  document.getElementById('modal-location').textContent = data.location;

  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

window.closeProjectModal = closeProjectModal;

function initProjectModals() {
  // Attach click listener to all project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const heading = card.querySelector('h3');
      const title = heading ? heading.textContent.trim() : 'CHROME & SHADOWS';
      openProjectModal(title);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

/* ----------------------------------------------------
   10. Gallery Category Filter
---------------------------------------------------- */
function initGalleryFilter() {
  const filterGroup = document.querySelector('#gallery [role="group"]');
  if (!filterGroup) return;

  const buttons = filterGroup.querySelectorAll('button');
  const galleryGrid = document.querySelector('#gallery .grid');
  if (!galleryGrid) return;

  const cards = galleryGrid.querySelectorAll('.group');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.textContent.trim().toUpperCase();

      buttons.forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.color = 'var(--muted-foreground)';
        b.setAttribute('aria-pressed', 'false');
      });

      btn.style.borderColor = 'var(--accent)';
      btn.style.color = 'var(--accent)';
      btn.setAttribute('aria-pressed', 'true');

      cards.forEach(card => {
        const label = card.querySelector('.text-label')?.textContent.trim().toUpperCase() || '';
        if (selected === 'ALL' || label.includes(selected)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ----------------------------------------------------
   11. Testimonials Carousel / Tab Switcher
---------------------------------------------------- */
function initTestimonials() {
  const data = [
    {
      name: "HARSHITA SHARMA",
      role: "BRIDE — WEDDING FILM — UDAIPUR",
      letter: "H",
      quote: "OM captured something I didn't know could be filmed — the exact moment my father looked at me before the pheras. Not staged, not posed. Just real. Every frame feels like a painting I want to live inside forever."
    },
    {
      name: "KAMYA MEHTA",
      role: "CREATIVE DIRECTOR — BRAND FILM — JAIPUR",
      letter: "K",
      quote: "Working with OM was a masterclass in visual storytelling. His understanding of natural light, shadow play, and authentic textures elevated our brand campaign into a cinematic experience that resonated nationwide."
    },
    {
      name: "RONAK PATEL",
      role: "DIRECTOR & PRODUCER — MUSIC VIDEO — AHMEDABAD",
      letter: "R",
      quote: "OM's camera movement has rhythm and soul. In our music video, his handheld fluidity and anamorphic lens choices gave the track an entirely new visual dimension. Unmatched passion on set."
    }
  ];

  const section = document.getElementById('testimonials');
  if (!section) return;

  const buttons = section.querySelectorAll('button[aria-label*="testimonial"]');
  const quoteEl = section.querySelector('blockquote');
  const nameEl = section.querySelector('.text-label.text-foreground');
  const roleEl = section.querySelector('.text-label-sm.text-muted-foreground');
  const letterEl = section.querySelector('.text-accent.font-bold');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const item = data[index];
      if (!item) return;

      buttons.forEach(b => {
        b.style.borderTopColor = 'transparent';
        const label = b.querySelector('.text-label');
        if (label) label.style.color = 'var(--muted-foreground)';
        const line = b.querySelector('.h-px');
        if (line) line.style.width = '0';
        b.setAttribute('aria-pressed', 'false');
      });

      btn.style.borderTopColor = 'var(--accent)';
      const activeLabel = btn.querySelector('.text-label');
      if (activeLabel) activeLabel.style.color = 'var(--accent)';
      const activeLine = btn.querySelector('.h-px');
      if (activeLine) activeLine.style.width = '2rem';
      btn.setAttribute('aria-pressed', 'true');

      if (quoteEl) {
        quoteEl.style.opacity = '0';
        quoteEl.style.transform = 'translateY(8px)';
        setTimeout(() => {
          quoteEl.textContent = item.quote;
          if (nameEl) nameEl.textContent = item.name;
          if (roleEl) roleEl.textContent = item.role;
          if (letterEl) letterEl.textContent = item.letter;
          quoteEl.style.opacity = '1';
          quoteEl.style.transform = 'translateY(0)';
        }, 200);
      }
    });
  });
}

/* ----------------------------------------------------
   12. Contact Form with WhatsApp Integration
---------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('form[aria-label="Get in touch form"]');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.removeAttribute('disabled');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name')?.value.trim();
    const email = form.querySelector('#contact-email')?.value.trim();
    const project = form.querySelector('#contact-project')?.value || 'Not specified';
    const message = form.querySelector('#contact-message')?.value.trim();

    if (!name) {
      showToast('Please enter your full name.', 'error');
      form.querySelector('#contact-name')?.focus();
      return;
    }
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      form.querySelector('#contact-email')?.focus();
      return;
    }
    if (!message) {
      showToast('Please provide a message about your project.', 'error');
      form.querySelector('#contact-message')?.focus();
      return;
    }

    const whatsappText = encodeURIComponent(
      `Hello OM!\n\nI would like to inquire about a project:\n• Name: ${name}\n• Email: ${email}\n• Project Type: ${project}\n• Details: ${message}`
    );

    showToast('Inquiry sent! Opening WhatsApp...', 'success');

    setTimeout(() => {
      window.open(`https://wa.me/919660845727?text=${whatsappText}`, '_blank');
      form.reset();
    }, 900);
  });
}

/* ----------------------------------------------------
   Toast Notification Helper
---------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';

  let icon = '✦';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '✕';

  toast.innerHTML = `
    <span style="color:var(--accent); font-weight:bold; font-size:0.9rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

window.showToast = showToast;
