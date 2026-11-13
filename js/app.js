/**
 * ====================================================================
 * PORTFOLIO APPLICATION CORE
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  initThemeToggle();
  initNavDrawer();
  initTicker();
  initNameSlot();
  renderEducation();
  renderDomains();
  renderWorks();
  renderFaq();
  initCopyEmail();
  initPrintResume();
});

/* --------------------------------------------------------------------
 * -------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById("custom-cursor-dot");
  const follower = document.getElementById("custom-cursor-follower");
  if (!dot || !follower) return;

  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    dot.style.display = "none";
    follower.style.display = "none";
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isHovering = false;
  let isAction = false;
  let actionText = "";
  let hasMoved = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!hasMoved) {
      followerX = mouseX;
      followerY = mouseY;
      hasMoved = true;
      document.body.classList.add("cursor-active");
    }

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    const target = e.target.closest("[data-cursor], a, button");
    if (target) {
      const cursorType = target.dataset.cursor || (target.tagName === "A" || target.tagName === "BUTTON" ? "hover" : "");
      
      if (cursorType === "open") {
        isAction = true;
        isHovering = false;
        actionText = "VIEW ↗";
      } else if (cursorType === "copy") {
        isAction = true;
        isHovering = false;
        actionText = "COPY";
      } else if (cursorType === "edit") {
        isAction = true;
        isHovering = false;
        actionText = "TYPE";
      } else if (cursorType === "download") {
        isAction = true;
        isHovering = false;
        actionText = "GET PDF";
      } else if (cursorType === "hover") {
        isHovering = true;
        isAction = false;
        actionText = "";
      } else {
        isHovering = false;
        isAction = false;
        actionText = "";
      }
    } else {
      isHovering = false;
      isAction = false;
      actionText = "";
    }

    if (isAction) {
      document.body.classList.add("cursor-action");
      document.body.classList.remove("cursor-hover");
      follower.textContent = actionText;
    } else if (isHovering) {
      document.body.classList.add("cursor-hover");
      document.body.classList.remove("cursor-action");
      follower.textContent = "";
    } else {
      document.body.classList.remove("cursor-hover", "cursor-action");
      follower.textContent = "";
    }
  });

  window.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    follower.style.opacity = "0";
  });

  window.addEventListener("mouseenter", () => {
    if (hasMoved) {
      dot.style.opacity = "1";
      follower.style.opacity = "1";
    }
  });

  function renderCursor() {
    const ease = isAction ? 0.22 : 0.16;
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;

    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}

/* --------------------------------------------------------------------
 * -------------------------------------------------------------------- */
function initNameSlot() {
  const btn = document.getElementById("hero-name-slot");
  if (!btn) return;

  const savedName = localStorage.getItem("visitor-first-name");
  if (savedName) {
    btn.innerHTML = `<span>{{ ${escapeHtml(savedName)}</span><span class="slot-cursor-pipe">|</span><span> }}</span>`;
  }

  btn.addEventListener("click", () => {
    const entered = prompt("What's your name?", savedName || "");
    if (entered && entered.trim().length > 0) {
      const clean = entered.trim();
      localStorage.setItem("visitor-first-name", clean);
      btn.innerHTML = `<span>{{ ${escapeHtml(clean)}</span><span class="slot-cursor-pipe">|</span><span> }}</span>`;
    }
  });
}

/* --------------------------------------------------------------------
 * -------------------------------------------------------------------- */
function initNavDrawer() {
  const burger = document.getElementById("burger-menu-btn");
  const drawer = document.getElementById("nav-drawer");
  const closeBtn = document.getElementById("drawer-close-btn");
  const links = document.querySelectorAll(".drawer-link");

  if (!burger || !drawer) return;

  function openDrawer() {
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  links.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Close when clicking outside drawer
  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && !drawer.contains(e.target) && !burger.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------
 * 4. THEME TOGGLE
 * -------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("portfolio-theme-mode") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    toggleBtn.textContent = "DARK";
  } else {
    toggleBtn.textContent = "CREAM";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    const isDark = document.body.classList.contains("theme-dark");
    toggleBtn.textContent = isDark ? "DARK" : "CREAM";
    localStorage.setItem("portfolio-theme-mode", isDark ? "dark" : "light");
  });
}

/* --------------------------------------------------------------------
 * 5. RUNNING MARQUEE TICKER (WITH CLOSE BUTTON & RED HEARTS)
 * -------------------------------------------------------------------- */
function initTicker() {
  const track = document.getElementById("ticker-track");
  const banner = document.getElementById("ticker-banner");
  const closeBtn = document.getElementById("ticker-close-btn");
  if (!track || !PORTFOLIO_CONFIG.ticker) return;

  const html = PORTFOLIO_CONFIG.ticker.map(t => `<span class="ticker-item">✦ ${escapeHtml(t)}</span>`).join(" ");
  track.innerHTML = html + " " + html;

  if (closeBtn && banner) {
    closeBtn.addEventListener("click", () => {
      banner.style.display = "none";
    });
  }
}

/* --------------------------------------------------------------------
 * 5. RENDER EDUCATION
 * -------------------------------------------------------------------- */
function renderEducation() {
  const container = document.getElementById("education-container");
  if (!container || !PORTFOLIO_CONFIG.education) return;

  container.innerHTML = PORTFOLIO_CONFIG.education.map(item => `
    <div class="education-card">
      <div class="edu-header">
        <h3 class="edu-degree">${escapeHtml(item.degree)}</h3>
        <span class="edu-period">${escapeHtml(item.period)}</span>
      </div>
      <div class="edu-institution">${escapeHtml(item.institution)} • <strong>${escapeHtml(item.badge)}</strong></div>
      <p class="edu-summary">${escapeHtml(item.summary)}</p>

      <span class="edu-coursework-title">Key Coursework &amp; Topics:</span>
      <div class="edu-coursework-tags">
        ${item.coursework.map(c => `<span class="course-tag">${escapeHtml(c)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * 6. RENDER DOMAINS & SKILLS
 * -------------------------------------------------------------------- */
function renderDomains() {
  const container = document.getElementById("domain-container");
  if (!container || !PORTFOLIO_CONFIG.domains) return;

  container.innerHTML = PORTFOLIO_CONFIG.domains.map(dom => `
    <div class="domain-card">
      <div>
        <div class="domain-icon">${dom.icon}</div>
        <h3 class="domain-title">${escapeHtml(dom.name)}</h3>
        <p class="domain-desc">${escapeHtml(dom.description)}</p>
      </div>

      <div class="skills-pills-wrap">
        ${dom.skills.map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * 7. RENDER WORKS / PROJECTS
 * -------------------------------------------------------------------- */
function renderWorks() {
  const container = document.getElementById("works-container");
  if (!container || !PORTFOLIO_CONFIG.works) return;

  container.innerHTML = PORTFOLIO_CONFIG.works.map(w => `
    <div class="work-card">
      <div>
        <div class="work-top-meta">
          <span class="work-domain">${escapeHtml(w.domain)}</span>
          <span class="work-badge">${escapeHtml(w.period)}</span>
        </div>
        <h3 class="work-title">${escapeHtml(w.title)}</h3>
        <p class="work-description">${escapeHtml(w.description)}</p>

        <ul class="work-points-list">
          ${w.points.map(p => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
      </div>

      <div>
        <div class="work-tags-row">
          ${w.tags.map(t => `<span class="work-tag">${escapeHtml(t)}</span>`).join("")}
        </div>

        <div class="work-links-row">
          <a href="${escapeHtml(w.github)}" target="_blank" rel="noopener noreferrer" data-cursor="open">
            [ Code on GitHub ↗ ]
          </a>
          ${w.demo ? `
            <a href="${escapeHtml(w.demo)}" target="_blank" rel="noopener noreferrer" data-cursor="open">
              [ Live Demo ↗ ]
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * 8. RENDER FAQ
 * -------------------------------------------------------------------- */
function renderFaq() {
  const container = document.getElementById("faq-container");
  if (!container || !PORTFOLIO_CONFIG.faq) return;

  container.innerHTML = PORTFOLIO_CONFIG.faq.map(item => `
    <div class="faq-card">
      <span class="faq-number">${escapeHtml(item.num)}</span>
      <h3 class="faq-question">${escapeHtml(item.q)}</h3>
      <p class="faq-answer">${escapeHtml(item.a)}</p>
    </div>
  `).join("");
}

/* --------------------------------------------------------------------
 * 9. COPY EMAIL
 * -------------------------------------------------------------------- */
function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");
  const toast = document.getElementById("toast-notice");
  if (!btn || !toast) return;

  btn.addEventListener("click", () => {
    const email = PORTFOLIO_CONFIG.personal.email || "sharan@example.com";
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2200);
    });
  });
}

/* --------------------------------------------------------------------
 * 10. PRINT RESUME BUTTON
 * -------------------------------------------------------------------- */
function initPrintResume() {
  const printBtn = document.getElementById("print-resume-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------
 * UTILITIES
 * -------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
