/* ============================================================
   HARISH SR PORTFOLIO — script.js
   Shared across all pages
   ============================================================ */

/* ─────────────────────────────────────────────
   1. THEME TOGGLE
   ───────────────────────────────────────────── */
function applyTheme(theme) {
  document.body.classList.toggle('light-theme', theme === 'light');
  document.body.classList.toggle('dark-theme',  theme === 'dark');
  document.querySelectorAll('.theme-icon').forEach(el => {
    el.textContent = theme === 'light' ? '🌙' : '☀️';
  });
  document.querySelectorAll('.theme-label').forEach(el => {
    el.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
  });
}

/* init theme on page load */
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

/* desktop toggle */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

/* mobile toggle */
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
}

/* ─────────────────────────────────────────────
   2. NAVBAR SCROLL SHADOW
   ───────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─────────────────────────────────────────────
   3. HAMBURGER MENU
   ───────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.add('is-open');
  mobileMenu.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('is-open');
  mobileMenu.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
}

if (hamburger && mobileMenu) {
  /* click hamburger */
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  /* close on any mobile link click */
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* close when clicking outside */
  document.addEventListener('click', function(e) {
    if (
      mobileMenu.classList.contains('is-open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* close on Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* close when resizing to desktop */
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) closeMenu();
  });
}

/* ─────────────────────────────────────────────
   4. FOOTER YEAR
   ───────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────
   5. DOWNLOAD CV
   ───────────────────────────────────────────── */
function downloadCV() {
  const link = document.createElement('a');
  link.href     = '/Harish_SR_Resume.pdf';
  link.download = 'Harish_SR_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ─────────────────────────────────────────────
   6. COPY EMAIL
   ───────────────────────────────────────────── */
function copyEmail() {
  navigator.clipboard.writeText('srharish34@gmail.com').then(() => {
    const btn = document.querySelector('.copy-email-btn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
  }).catch(() => {
    alert('Email: srharish34@gmail.com');
  });
}

/* ─────────────────────────────────────────────
   7. TECH TAGS — index page
   ───────────────────────────────────────────── */
const techTagsContainer = document.getElementById('techTags');
if (techTagsContainer) {
  const techStack = [
    'Python', 'JavaScript', 'React.js', 'Node.js', 'MongoDB',
    'TensorFlow', 'Azure', 'PHP', 'FastAPI', 'MySQL',
    'HTML5', 'CSS3', 'RAG Modulation', 'Bootstrap', 'Tailwind CSS',
    'LLM ', 'OpenCV', 'Firebase', 'Git', 'Express.js',
  ];
  techStack.forEach((tech, i) => {
    const tag = document.createElement('div');
    tag.className = 'tech-tag';
    tag.style.animationDelay = (i * 0.04) + 's';
    tag.textContent = tech;
    techTagsContainer.appendChild(tag);
  });
}

/* ─────────────────────────────────────────────
   8. PROJECT FILTER — projects page
   ───────────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      projectCards.forEach(function(card) {
        var show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ─────────────────────────────────────────────
   9. SCROLL FADE-IN
   ───────────────────────────────────────────── */
(function initScrollFade() {
  var selector = [
    '.highlight-card', '.edu-card', '.exp-card',
    '.cert-card', '.achievement-card', '.service-card',
    '.project-card', '.why-card', '.client-card',
    '.process-step', '.quick-action', '.skill-group'
  ].join(', ');

  var targets = document.querySelectorAll(selector);
  if (!targets.length || !window.IntersectionObserver) return;

  /* inject visible style */
  var s = document.createElement('style');
  s.textContent = '.scroll-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(s);

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function(el, i) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease ' + ((i % 4) * 0.1) + 's, transform 0.5s ease ' + ((i % 4) * 0.1) + 's';
    io.observe(el);
  });
})();

/* ─────────────────────────────────────────────
   10. CONTACT FORM — contact page
   ───────────────────────────────────────────── */
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var submitBtn  = contactForm.querySelector('.submit-btn');
    var statusEl   = document.getElementById('formStatus');
    var btnText    = submitBtn.querySelector('.btn-text');
    var btnSpinner = submitBtn.querySelector('.btn-spinner');

    submitBtn.disabled = true;
    if (btnText)    btnText.textContent = 'Sending…';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';
    if (statusEl)   statusEl.className = 'form-status';

    var formData = {
      name:     contactForm.elements['name'].value,
      email:    contactForm.elements['email'].value,
      phone:    contactForm.elements['phone'].value,
      service:  contactForm.elements['service'].value,
      budget:   contactForm.elements['budget'].value,
      timeline: contactForm.elements['timeline'].value,
      message:  contactForm.elements['message'].value
    };

    try {
      var res  = await fetch('https://your-backend-url.vercel.app/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      var data = await res.json();
      if (res.ok && data.success) {
        if (statusEl) { statusEl.className = 'form-status success'; statusEl.textContent = "✅ Message sent! I'll get back to you soon."; }
        contactForm.reset();
      } else throw new Error('Failed');
    } catch (_) {
      var sub  = encodeURIComponent('Portfolio Contact – ' + (formData.service || 'General'));
      var body = encodeURIComponent('Name: ' + formData.name + '\nEmail: ' + formData.email + '\nPhone: ' + formData.phone + '\nService: ' + formData.service + '\nBudget: ' + formData.budget + '\nTimeline: ' + formData.timeline + '\n\nMessage:\n' + formData.message);
      window.location.href = 'mailto:srharish34@gmail.com?subject=' + sub + '&body=' + body;
      if (statusEl) { statusEl.className = 'form-status success'; statusEl.textContent = '📧 Opening your email client…'; }
    } finally {
      submitBtn.disabled = false;
      if (btnText)    btnText.textContent = 'Send Message';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });
}

/* ─────────────────────────────────────────────
   11. AUTO ACTIVE NAV LINK
   ───────────────────────────────────────────── */
(function setActiveNav() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function(link) {
    var href = (link.getAttribute('href') || '').split('/').pop();
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ─────────────────────────────────────────────
   12. BACK TO TOP
   ───────────────────────────────────────────── */
(function initBackToTop() {
  var btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = [
    'position:fixed', 'bottom:28px', 'right:24px',
    'width:44px', 'height:44px',
    'background:linear-gradient(135deg,#7c3aed,#ec4899)',
    'color:#fff', 'border:none', 'border-radius:50%',
    'font-size:1.2rem', 'font-weight:700',
    'cursor:pointer', 'opacity:0', 'pointer-events:none',
    'transition:opacity .3s,transform .3s',
    'box-shadow:0 4px 20px rgba(124,58,237,.5)',
    'z-index:998'
  ].join(';');
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    var show = window.scrollY > 400;
    btn.style.opacity       = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
    btn.style.transform     = show ? 'translateY(0)' : 'translateY(12px)';
  }, { passive: true });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   ABOUT PAGE — Data & Rendering
   ============================================================ */

var education = [
  {
    degree: 'Bachelor of Technology — Computer Science',
    institution: 'Rajalakshmi Institute of Technology',
    duration: '2023 – 2027',
    grade: 'CGPA: 8.00 / 10',
    description: 'Focus on AI/ML, Web Development, and Cloud Computing'
  },
  {
    degree: 'Higher Secondary Education (HSSC)',
    institution: 'Paavai Vidhyashram Global School',
    duration: '2022 – 2023',
    grade: 'Percentage: 72.6%'
  },
  {
    degree: 'Secondary Education (SSC)',
    institution: 'Kendriya Vidyalaya NLC Neyveli',
    duration: '2020 – 2021',
    grade: 'Percentage: 89.20%'
  }
];

var experience = [
  {
    role: 'AI Software Engineer Intern',
    company: 'Brakes India Limited',
    location: 'Padi, Chennai',
    duration: 'Nov 2025 – Jan 2026 · 2 Months',
    current: false,
    responsibilities: [
      'Worked on LLM and RAG (Retrieval-Augmented Generation) modulation projects for enterprise AI applications',
      'Designed and integrated intelligent query pipelines using LLM APIs with advanced prompt engineering techniques',
      'Built scalable AI-powered chatbot workflows using Azure AI services and vector-based retrieval systems',
      'Optimized AI response generation and retrieval pipelines for better contextual understanding and performance'
    ]
  },

  {
    role: 'Application Developer (Full Stack)',
    company: 'Clouds Dial iServices Private Limited',
    location: 'Chennai',
    duration: 'Nov 2025 – Jan 2026 · 3 Months',
    current: false,
    responsibilities: [
      'Developed a full-stack CRM platform with PHP backend, frontend architecture, and MySQL database management',
      'Worked on deployment processes and CRM customization based on client requirements',
      'Integrated third-party APIs and built reusable frontend components optimized for scalability and maintainability',
      'Collaborated with development teams to deliver responsive and efficient web applications'
    ]
  },

  {
    role: 'Full Stack Developer & Digital Strategist',
    company: 'Almi Digital Marketing Agency',
    location: 'Chennai',
    duration: 'Jan 2026 – Apr 2026 · 3 Months',
    current: false,
    responsibilities: [
      'Built Petrogo — a 4-panel platform (Customer, Delivery Partner, Admin, Nunk) as both website and mobile app using React, Node.js, and MongoDB',
      'Received copyright certification for the Petrogo platform and architecture',
      'Developed Silent SOS, a 3-panel emergency alert system with mobile app, admin dashboard, and police dashboard integration',
      'Implemented real-time SOS triggering, Twilio voice/SMS alerts, OpenStreetMap live tracking using Socket.IO, and PDF report generation via PDFKit',
      'Built JWT-authenticated REST APIs with role-based access control for users, admins, and police systems',
      'Integrated Fast2SMS delivery logging system to track sent, delivered, and failed messages',
      'Led SEO strategy and digital marketing campaigns alongside full-stack development deliverables'
    ]
  }
];

var skills = {
  'Programming Languages':     ['Python', 'Java', 'JavaScript', 'HTML5', 'CSS3', 'PHP'],
  'Frameworks & Technologies': ['Node.js', 'Bootstrap', 'React.js', 'MongoDB', 'MySQL', 'Tailwind CSS', 'Firebase'],
  'AI / ML & Cloud':           ['Machine Learning', 'TensorFlow', 'Microsoft Azure', 'RAG Modulation', 'Data Analytics', 'LLM Integration'],
  'Tools':                     ['Git', 'VS Code', 'Adobe Photoshop']
};

var certifications = [
  { 
    name: 'Hackagon National Hackathon Finalist', 
    issuer: 'Hackagon', 
    year: '2025', 
    icon: '🏆' 
  },

  { 
    name: 'SynapHack Top 20 Finalist', 
    issuer: 'SynapHack', 
    year: '2025', 
    icon: '🥇' 
  },

  { 
    name: 'HackSphere Participation Certificate', 
    issuer: 'HackSphere', 
    year: '2025', 
    icon: '⚡' 
  },

  { 
    name: 'TVS National Hackathon Participation', 
    issuer: 'TVS', 
    year: '2025', 
    icon: '🚀' 
  },

  { 
    name: 'L’Oréal Hackathon Participation', 
    issuer: 'L’Oréal', 
    year: '2025', 
    icon: '💡' 
  },

  { 
    name: 'HackEnergy Innovation Challenge', 
    issuer: 'HackEnergy', 
    year: '2025', 
    icon: '🔋' 
  },

  { 
    name: 'Petrogo Copyright Certification', 
    issuer: 'Government Copyright Office', 
    year: '2026', 
    icon: '📜' 
  }
];
var achievements = [
  {
    icon: '🏆',
    title: 'Hackagon Finalist',
    description: 'Finalist in Hackagon National Hackathon for developing innovative AI and Full Stack solutions'
  },

  {
    icon: '🥇',
    title: 'SynapHack Top 20',
    description: 'Secured Top 20 position in SynapHack National Level Hackathon with advanced project implementation'
  },

  {
    icon: '📜',
    title: 'Petrogo Copyright Certification',
    description: 'Received copyright certification for the Petrogo platform architecture and implementation'
  },

  {
    icon: '🧠',
    title: 'Research Paper Publication',
    description: 'Published a research paper based on Petrogo platform architecture, AI modules, and implementation'
  },

  {
    icon: '⚡',
    title: 'National Hackathon Participation',
    description: 'Participated in HackSphere, TVS, L’Oréal, and HackEnergy hackathons and qualified for advanced rounds'
  },

  {
    icon: '🎓',
    title: 'Academic Excellence',
    description: 'Maintained a CGPA of 8.00 in Computer Science with strong academic consistency'
  },

  {
    icon: '💻',
    title: '8+ Production Projects',
    description: 'Successfully developed and deployed production-level projects across Web, Mobile, AI/ML, CRM, and IoT domains'
  }
];

(function renderEducation() {
  var el = document.getElementById('educationList');
  if (!el) return;
  el.innerHTML = education.map(function(edu, i) {
    return '<div class="edu-card" style="animation-delay:' + (i * 0.1) + 's">' +
      '<div class="card-header">' +
        '<div class="card-degree">' + edu.degree + '</div>' +
        '<span class="card-duration">' + edu.duration + '</span>' +
      '</div>' +
      '<div class="card-institution">' + edu.institution + '</div>' +
      '<div class="card-meta">' + edu.grade + '</div>' +
      (edu.description ? '<div class="card-desc">' + edu.description + '</div>' : '') +
    '</div>';
  }).join('');
})();

(function renderExperience() {
  var el = document.getElementById('experienceList');
  if (!el) return;
  el.innerHTML = experience.map(function(exp, i) {
    return '<div class="exp-card" style="animation-delay:' + (i * 0.12) + 's">' +
      '<div class="card-header">' +
        '<div>' +
          '<div class="card-role">' + exp.role + '</div>' +
          '<div class="card-company">' + exp.company + '</div>' +
          '<div class="card-location">' + exp.location + '</div>' +
        '</div>' +
        '<span class="card-duration">' + exp.duration + '</span>' +
      '</div>' +
      (exp.current ? '<span class="exp-badge">🟢 Current</span>' : '') +
      '<ul class="responsibilities">' +
        exp.responsibilities.map(function(r) {
          return '<li class="responsibility"><span class="dot">•</span><span>' + r + '</span></li>';
        }).join('') +
      '</ul>' +
    '</div>';
  }).join('');
})();

(function renderSkills() {
  var el = document.getElementById('skillsGrid');
  if (!el) return;
  el.innerHTML = Object.entries(skills).map(function(entry, i) {
    var cat = entry[0], items = entry[1];
    return '<div class="skill-group" style="animation-delay:' + (i * 0.1) + 's">' +
      '<h3>' + cat + '</h3>' +
      '<div class="skill-tags">' +
        items.map(function(s) { return '<span class="skill-tag">' + s + '</span>'; }).join('') +
      '</div>' +
    '</div>';
  }).join('');
})();

(function renderCerts() {
  var el = document.getElementById('certsGrid');
  if (!el) return;
  el.innerHTML = certifications.map(function(c, i) {
    return '<div class="cert-card" style="animation-delay:' + (i * 0.1) + 's">' +
      '<div class="cert-icon">' + c.icon + '</div>' +
      '<div class="cert-name">' + c.name + '</div>' +
      '<div class="cert-issuer">' + c.issuer + '</div>' +
      '<div class="cert-year">' + c.year + '</div>' +
    '</div>';
  }).join('');
})();

(function renderAchievements() {
  var el = document.getElementById('achievementsGrid');
  if (!el) return;
  el.innerHTML = achievements.map(function(a, i) {
    return '<div class="achievement-card" style="animation-delay:' + (i * 0.1) + 's">' +
      '<div class="achievement-icon">' + a.icon + '</div>' +
      '<div class="achievement-title">' + a.title + '</div>' +
      '<div class="achievement-desc">' + a.description + '</div>' +
    '</div>';
  }).join('');
})();