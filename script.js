const roles = [
  "BCA Student",
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "AR/VR Developer",
  "Problem Solver"
];

const skills = [
  ["HTML", "HTML", 95],
  ["CSS", "CSS", 92],
  ["JavaScript", "JS", 88],
  ["Python", "PY", 86],
  ["Machine Learning", "ML", 82],
  ["TensorFlow", "TF", 76],
  ["OpenCV", "CV", 78],
  ["Dash", "DS", 74],
  ["Unity", "UN", 72],
  ["Blender", "BL", 70],
  ["MongoDB", "DB", 80],
  ["Firebase", "FB", 78],
  ["Flask", "FL", 82],
  ["Git & GitHub", "GH", 88]
];

const projects = [
  ["Hospital Management System", "Patient, doctor, billing, and appointment workflow dashboard.", ["HTML", "CSS", "JS", "Flask"], "HMS"],
  ["Vehicle Price Prediction System", "ML model interface for estimating vehicle prices from key features.", ["Python", "ML", "Flask"], "VPP"],
  ["Student Course Application Web Portal", "Responsive portal for course applications, student data, and status tracking.", ["HTML", "JS", "Firebase"], "SCA"],
  ["AR/VR Environment Design Project", "Immersive 3D scene design with interactive spatial experiences.", ["Unity", "Blender", "C#"], "ARV"],
  ["Smart Garbage Segregation System", "AI-assisted waste classification concept for cleaner public systems.", ["OpenCV", "AI", "Python"], "SGS"],
  ["Pothole Detection & Reporting System", "Detection and reporting flow for road issue visibility and action.", ["OpenCV", "Dash", "Maps"], "PDR"],
  ["Anti-Scam AI System", "Signal-based scam detection assistant for safer digital communication.", ["AI", "NLP", "Python"], "ASA"],
  ["Farmer Market Prediction System", "Data-driven prediction interface for agriculture market decisions.", ["ML", "Dash", "Python"], "FMP"]
];

const projectAccents = [
  ["#28e7ff", "#4377ff"],
  ["#ff4ecd", "#9d4dff"],
  ["#6bffbf", "#28e7ff"],
  ["#9d4dff", "#4377ff"],
  ["#ffe66d", "#6bffbf"],
  ["#28e7ff", "#ff4ecd"],
  ["#ff6b8b", "#9d4dff"],
  ["#6bffbf", "#4377ff"]
];

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

document.body.classList.add("loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loader").classList.add("is-hidden");
    document.body.classList.remove("loading");
  }, 850);
});

function buildSkills() {
  const grid = $("#skillsGrid");
  grid.innerHTML = skills.map(([name, icon, value]) => `
    <article class="skill-card tilt reveal spotlight" data-value="${value}">
      <div class="skill-card__top">
        <div class="skill-icon">${icon}</div>
        <div class="circle-progress"><span>0%</span></div>
      </div>
      <h3>${name}</h3>
      <div class="skill-bar"><span></span></div>
    </article>
  `).join("");
}

function buildProjects() {
  const grid = $("#projectsGrid");
  grid.innerHTML = projects.map(([name, description, tech, code], index) => {
    const [accentOne, accentTwo] = projectAccents[index % projectAccents.length];
    return `
    <article class="project-card tilt reveal spotlight" style="--accent-one:${accentOne};--accent-two:${accentTwo};">
      <div class="project-card__thumb" data-code="${code}"></div>
      <div class="project-card__body">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="tech-list">${tech.map(item => `<span>${item}</span>`).join("")}</div>
        <div class="project-card__actions">
          <a class="btn btn--primary magnetic" href="#" aria-label="${name} live demo">Live Demo</a>
          <a class="btn btn--ghost magnetic" href="#" aria-label="${name} GitHub repository">GitHub</a>
        </div>
      </div>
    </article>
  `;
  }).join("");
}

function initTyping() {
  const target = $("#typedRole");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const word = roles[roleIndex];
    target.textContent = word.slice(0, charIndex);

    if (!deleting && charIndex < word.length) charIndex++;
    if (deleting && charIndex > 0) charIndex--;
    if (!deleting && charIndex === word.length) deleting = true;
    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const delay = deleting ? 45 : charIndex === word.length ? 1150 : 78;
    setTimeout(type, delay);
  };

  type();
}

function initGalaxy() {
  const canvas = $("#galaxyCanvas");
  const ctx = canvas.getContext("2d");
  const particles = [];
  let width;
  let height;
  let scale = 1;
  let pointerX = 0;
  let pointerY = 0;
  let frame = 0;

  if (prefersReducedMotion) {
    canvas.style.display = "none";
    return;
  }

  const resize = () => {
    scale = Math.min(window.devicePixelRatio || 1, isTouchDevice ? 1 : 1.35);
    width = canvas.width = Math.floor(innerWidth * scale);
    height = canvas.height = Math.floor(innerHeight * scale);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    particles.length = 0;
    const count = isTouchDevice ? Math.min(46, Math.floor(innerWidth / 14)) : Math.min(92, Math.floor(innerWidth / 16));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.45,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        hue: Math.random() > 0.5 ? 185 : 310
      });
    }
  };

  const render = () => {
    if (document.hidden) {
      requestAnimationFrame(render);
      return;
    }

    frame++;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 0;

    particles.forEach((p, i) => {
      const dx = pointerX * scale - p.x;
      const dy = pointerY * scale - p.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 160) {
        p.x -= dx * 0.0018;
        p.y -= dy * 0.0018;
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.72)`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (isTouchDevice || frame % 2 !== 0) return;

      const maxLinks = Math.min(i + 9, particles.length);
      for (let j = i + 1; j < maxLinks; j++) {
        const q = particles[j];
        const linkDistance = Math.hypot(p.x - q.x, p.y - q.y);
        if (linkDistance < 104) {
          ctx.strokeStyle = `rgba(40, 231, 255, ${(1 - linkDistance / 104) * 0.55})`;
          ctx.lineWidth = 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(render);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  });
  resize();
  render();
}

function initCursor() {
  if (isTouchDevice || prefersReducedMotion) return;

  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let ringX = x;
  let ringY = y;

  window.addEventListener("pointermove", event => {
    x = event.clientX;
    y = event.clientY;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  });

  const animate = () => {
    ringX += (x - ringX) * 0.16;
    ringY += (y - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  };

  $$("a, button, input, textarea").forEach(item => {
    item.addEventListener("pointerenter", () => ring.classList.add("is-active"));
    item.addEventListener("pointerleave", () => ring.classList.remove("is-active"));
  });

  animate();
}

function initTilt() {
  if (isTouchDevice || prefersReducedMotion) return;

  $$(".tilt").forEach(card => {
    let ticking = false;

    card.addEventListener("pointermove", event => {
      if (ticking) return;
      ticking = true;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 14;
      const rotateX = ((0.5 - y / rect.height)) * 14;
      requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        ticking = false;
      });
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initSpotlight() {
  if (isTouchDevice || prefersReducedMotion) return;

  $$(".spotlight, .project-card__thumb").forEach(element => {
    let ticking = false;

    element.addEventListener("pointermove", event => {
      if (ticking) return;
      ticking = true;

      const rect = element.getBoundingClientRect();
      requestAnimationFrame(() => {
        element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        element.style.setProperty("--my", `${event.clientY - rect.top}px`);
        ticking = false;
      });
    });
  });
}

function initMagnetic() {
  if (isTouchDevice || prefersReducedMotion) return;

  $$(".magnetic").forEach(element => {
    let ticking = false;

    element.addEventListener("pointermove", event => {
      if (ticking) return;
      ticking = true;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      requestAnimationFrame(() => {
        element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        ticking = false;
      });
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

function initObservers() {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");

      if (entry.target.classList.contains("skill-card")) {
        animateSkill(entry.target);
      }

      $$("[data-count]", entry.target).forEach(animateCounter);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  $$(".reveal, .achievement-card, .hero__stats div").forEach(item => revealObserver.observe(item));
}

function animateSkill(card) {
  const value = Number(card.dataset.value);
  const bar = $(".skill-bar span", card);
  const circle = $(".circle-progress", card);
  const label = $(".circle-progress span", card);
  let current = 0;

  bar.style.width = `${value}%`;

  const tick = () => {
    current += Math.max(1, Math.ceil((value - current) / 10));
    if (current > value) current = value;
    circle.style.setProperty("--value", `${current * 3.6}deg`);
    label.textContent = `${current}%`;
    if (current < value) requestAnimationFrame(tick);
  };

  tick();
}

function animateCounter(element) {
  if (element.dataset.done) return;
  element.dataset.done = "true";
  const target = Number(element.dataset.count);
  let value = 0;
  const step = Math.max(1, Math.ceil(target / 60));

  const tick = () => {
    value += step;
    if (value > target) value = target;
    element.textContent = `${value}+`;
    if (value < target) requestAnimationFrame(tick);
  };

  tick();
}

function initNavigation() {
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const anchors = $$(".nav__links a");
  const sections = anchors.map(link => $(link.getAttribute("href"))).filter(Boolean);

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  anchors.forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const setActive = () => {
    const scrollPosition = scrollY + 180;
    let activeId = "home";
    sections.forEach(section => {
      if (section.offsetTop <= scrollPosition) activeId = section.id;
    });
    anchors.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`));
  };

  let navTicking = false;
  window.addEventListener("scroll", () => {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      setActive();
      navTicking = false;
    });
  }, { passive: true });
  setActive();
}

function initScrollUi() {
  const progress = $("#scrollProgress");
  const topButton = $("#backToTop");

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const percent = max > 0 ? (scrollY / max) * 100 : 0;
    progress.style.width = `${percent}%`;
    topButton.classList.toggle("is-visible", scrollY > 700);
  };

  topButton.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      update();
      scrollTicking = false;
    });
  }, { passive: true });
  update();
}

function initTheme() {
  const button = $("#themeToggle");
  const stored = localStorage.getItem("portfolio-theme");
  if (stored === "light") document.body.classList.add("light");

  button.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
  });
}

function initSound() {
  const button = $("#soundToggle");
  let audioContext;
  let oscillator;
  let gain;
  let active = false;

  button.addEventListener("click", () => {
    if (!audioContext) {
      audioContext = new AudioContext();
      oscillator = audioContext.createOscillator();
      gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 116;
      gain.gain.value = 0;
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
    }

    active = !active;
    gain.gain.linearRampToValueAtTime(active ? 0.018 : 0, audioContext.currentTime + 0.25);
    button.classList.toggle("is-active", active);
  });
}

function initContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const fields = $$("input, textarea", form);
    let valid = true;

    fields.forEach(field => {
      const ok = field.checkValidity();
      field.classList.toggle("is-invalid", !ok);
      valid = valid && ok;
    });

    if (!valid) {
      status.textContent = "Please fix the highlighted fields.";
      status.style.color = "#ff9ddd";
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    const submitButton = $("button[type='submit']", form);
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Backend validation failed");
      status.textContent = "Message sent successfully.";
      status.style.color = "var(--green)";
      form.reset();
    } catch (error) {
      localStorage.setItem("latest-contact-message", JSON.stringify({ ...payload, createdAt: new Date().toISOString() }));
      status.textContent = "Message saved locally. Run the backend server to send it through /api/contact.";
      status.style.color = "var(--green)";
      form.reset();
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });

  $$("input, textarea", form).forEach(field => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
  });
}

buildSkills();
buildProjects();
initTyping();
initGalaxy();
initCursor();
initTilt();
initSpotlight();
initMagnetic();
initObservers();
initNavigation();
initScrollUi();
initTheme();
initSound();
initContactForm();
