/* ============================================================
   TEAM CRX — crx.js
   Clean Glassmorphism UI — Multiple Departments + Colored Tags
   ============================================================ */

(function () {
  "use strict";

  async function fetchMembers() {
    const response = await fetch("hackers.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (data.members && Array.isArray(data.members)) return data.members;
    if (data.data && Array.isArray(data.data)) return data.data;
    const arrayKey = Object.keys(data).find(k => Array.isArray(data[k]));
    if (arrayKey) return data[arrayKey];
    throw new Error("Invalid JSON structure");
  }

  function mapMember(raw) {
    const department = raw.department || raw.Department || raw.section || raw.Section || raw.dept || "";
    // Split by comma for multiple departments
    const departments = department.split(",").map(d => d.trim()).filter(Boolean);

    return {
      id: raw.id || raw._id || raw.entry || String(Math.random()),
      name: (raw.name || raw.Name || raw.fullName || raw.full_name || "Unknown").trim(),
      username: (raw.username || raw.Username || raw.handle || "").replace(/^@/, "").trim(),
      departments: departments,
      level: (raw.level || raw.Level || raw.role || raw.Role || raw.type || raw.Type || "member").toLowerCase(),
      bio: (raw.bio || raw.Bio || raw.about || raw.About || raw.description || "").trim(),
      avatar: raw.avatar || raw.Avatar || raw.image || raw.Image || raw.photo || raw.Photo || null,
      status: (raw.status || raw.Status || "active").toLowerCase(),
      github: (raw.github || raw.GitHub || raw.github_url || raw.githubUrl || "").trim(),
      website: (raw.website || raw.Website || raw.url || raw.Url || raw.portfolio || raw.Portfolio || "").trim(),
      telegram: (raw.telegram || raw.Telegram || raw.tg || raw.TG || "").trim()
    };
  }

  function getInitials(name) {
    if (!name || name.trim() === "") return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  }

  function escapeHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function getLevelColors(level) {
    const map = {
      founder:  { accent: "#8B5CF6", glow: "rgba(139,92,246,0.4)", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
      leader:   { accent: "#EF4444", glow: "rgba(239,68,68,0.4)", gradient: "linear-gradient(135deg, #EF4444, #F87171)" },
      admin:    { accent: "#10B981", glow: "rgba(16,185,129,0.4)", gradient: "linear-gradient(135deg, #10B981, #34D399)" },
      core:     { accent: "#F59E0B", glow: "rgba(245,158,11,0.4)", gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)" },
      dev:      { accent: "#3B82F6", glow: "rgba(59,130,246,0.4)", gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)" },
     moderator: { accent: "#10B981", glow: "rgba(16,185,129,0.4)", gradient: "linear-gradient(135deg, #10B981, #34D399)" },
      beginner: { accent: "#6B7280", glow: "rgba(107,114,128,0.3)", gradient: "linear-gradient(135deg, #6B7280, #9CA3AF)" },
      newbie:   { accent: "#9CA3AF", glow: "rgba(156,163,175,0.3)", gradient: "linear-gradient(135deg, #9CA3AF, #D1D5DB)" }
    };
    return map[level] || map.dev;
  }

  const SVG = {
    telegram: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>`,
    github:  `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    globe:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
    back:    `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="13" y1="8" x2="3" y2="8"/><polyline points="7,4 3,8 7,12"/></svg>`
  };

  function buildMemberCard(m) {
    const colors = getLevelColors(m.level);
    const card = document.createElement("div");
    card.className = "member-card";
    card.dataset.id = m.id;
    card.style.setProperty("--card-accent", colors.accent);
    card.style.setProperty("--card-glow", colors.glow);

    const avatarContent = m.avatar
      ? `<img src="${escapeHTML(m.avatar)}" alt="${escapeHTML(m.name)}" loading="lazy" onerror="this.parentElement.innerHTML='${getInitials(m.name)}'">`
      : getInitials(m.name);

    const statusClass = m.status === "active" ? "status-active" : "status-inactive";
    const displayUsername = m.username ? `@${escapeHTML(m.username)}` : "";
    const levelLabel = (m.level || "member").toUpperCase();

    // Multiple department badges
    let deptBadges = "";
    if (m.departments && m.departments.length > 0) {
      deptBadges = m.departments.map(d => 
        `<span class="badge badge-dept">${escapeHTML(d)}</span>`
      ).join("");
    }

    // Full width links
    const links = [];
    if (m.telegram) links.push(`<a class="card-link" href="${escapeHTML(m.telegram)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Telegram">${SVG.telegram} Telegram</a>`);
    if (m.github) links.push(`<a class="card-link" href="${escapeHTML(m.github)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="GitHub">${SVG.github} GitHub</a>`);
    if (m.website) links.push(`<a class="card-link" href="${escapeHTML(m.website)}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Website">${SVG.globe} Website</a>`);

    card.innerHTML = `
      <div class="card-shine"></div>
      <div class="card-header">
        <div class="member-avatar" style="background:${colors.gradient};">
          ${avatarContent}
          <span class="member-status-dot ${statusClass}"></span>
        </div>
        <div class="member-info-top">
          <div class="member-name">${escapeHTML(m.name)}</div>
          ${displayUsername ? `<div class="member-username">${displayUsername}</div>` : ""}
        </div>
      </div>
      <div class="card-badges">
        <span class="badge badge-level" data-level="${m.level}">${levelLabel}</span>
        ${deptBadges}
      </div>
      ${m.bio ? `<div class="member-bio">${escapeHTML(m.bio)}</div>` : ""}
      ${links.length > 0 ? `<div class="card-footer">${links.join("")}</div>` : ""}
    `;

    return card;
  }

  function buildModalContent(m) {
    const colors = getLevelColors(m.level);
    const avatarContent = m.avatar
      ? `<img src="${escapeHTML(m.avatar)}" alt="${escapeHTML(m.name)}" onerror="this.parentElement.innerHTML='${getInitials(m.name)}'">`
      : getInitials(m.name);
    const displayUsername = m.username ? `@${escapeHTML(m.username)}` : "";
    const levelLabel = (m.level || "member").toUpperCase();

    let deptBadges = "";
    if (m.departments && m.departments.length > 0) {
      deptBadges = m.departments.map(d => 
        `<span class="badge badge-dept">${escapeHTML(d)}</span>`
      ).join("");
    }

    const linksHTML = [];
    if (m.telegram) linksHTML.push(`<a class="modal-link modal-link-primary" href="${escapeHTML(m.telegram)}" target="_blank" rel="noopener" style="background:${colors.gradient};box-shadow:0 4px 16px ${colors.glow};">${SVG.telegram} Telegram</a>`);
    if (m.github) linksHTML.push(`<a class="modal-link modal-link-outline" href="${escapeHTML(m.github)}" target="_blank" rel="noopener">${SVG.github} GitHub</a>`);
    if (m.website) linksHTML.push(`<a class="modal-link modal-link-outline" href="${escapeHTML(m.website)}" target="_blank" rel="noopener">${SVG.globe} Website</a>`);

    return `
      <button class="modal-back" id="crx-modal-back">${SVG.back} Back</button>
      <div class="modal-profile">
        <div class="modal-avatar" style="background:${colors.gradient};">${avatarContent}</div>
        <div>
          <div class="modal-name">${escapeHTML(m.name)}</div>
          ${displayUsername ? `<div class="modal-username">${displayUsername}</div>` : ""}
          <div class="modal-badges">
            <span class="badge badge-level" data-level="${m.level}">${levelLabel}</span>
            ${deptBadges}
          </div>
        </div>
      </div>
      ${m.bio ? `<p class="modal-bio">${escapeHTML(m.bio)}</p>` : ""}
      ${linksHTML.length > 0 ? `<div class="modal-section-label">Links</div><div class="modal-links">${linksHTML.join("")}</div>` : ""}
    `;
  }

  async function render() {
    document.title = "Team CRX";
    const metaVP = document.querySelector("meta[name=viewport]") || document.createElement("meta");
    metaVP.name = "viewport";
    metaVP.content = "width=device-width, initial-scale=1";
    if (!metaVP.parentElement) document.head.appendChild(metaVP);

    const orbs = document.createElement("div");
    orbs.id = "crx-bg-orbs";
    orbs.innerHTML = `<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>`;
    document.body.appendChild(orbs);

    const tgBar = document.createElement("a");
    tgBar.id = "tg-bar";
    tgBar.href = "https://t.me/HQcrx";
    tgBar.target = "_blank";
    tgBar.rel = "noopener";
    tgBar.innerHTML = `<span class="tg-pulse"></span> ${SVG.telegram} Join Our Telegram Community`;
    document.body.appendChild(tgBar);

    const app = document.createElement("div");
    app.id = "crx-app";
    app.innerHTML = `
      <section id="crx-hero">
        <h1 class="hero-title">TEAM<span class="gradient-text">CRX</span></h1>
        <p class="hero-desc">A community of developers collaborating, learning, and shipping impactful projects together.</p>
      </section>
      <section id="members">
        <div class="section-header">
          <div class="section-tag">Our Team</div>
          <h2 class="section-title">Members</h2>
        </div>
        <div class="filter-container" id="filter-container"></div>
        <div id="crx-members">
          <div class="members-grid" id="crx-grid">
            <div class="state-message">
              <div class="glass-spinner"></div>
              <p>Loading members...</p>
            </div>
          </div>
        </div>
      </section>
      <footer id="crx-footer">
        <div class="footer-logo">TEAM<span class="logo-dot"></span>CRX</div>
        <div class="footer-copy">&copy; ${new Date().getFullYear()} Team CRX</div>
      </footer>
    `;
    document.body.appendChild(app);

    const modal = document.createElement("div");
    modal.id = "crx-modal";
    modal.innerHTML = `<div class="modal-inner" id="crx-modal-inner"></div>`;
    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    const grid = document.getElementById("crx-grid");
    const filterContainer = document.getElementById("filter-container");

    try {
      const rawData = await fetchMembers();
      const members = rawData.map(mapMember);
      if (members.length === 0) {
        grid.innerHTML = `<div class="state-message"><p>No members found.</p><button class="retry-btn" onclick="location.reload()">Retry</button></div>`;
        return;
      }

      const levels = [...new Set(members.map(m => (m.level || "member").toLowerCase()))];

      let filterHTML = `<button class="filter-chip active" data-filter="all">All</button>`;
      levels.forEach(l => {
        filterHTML += `<button class="filter-chip" data-filter="level-${l}">${l.toUpperCase()}</button>`;
      });
      filterContainer.innerHTML = filterHTML;

      function renderCards(filter = "all") {
        grid.innerHTML = "";
        let filtered;
        if (filter === "all") {
          filtered = members;
        } else if (filter.startsWith("level-")) {
          const lvl = filter.replace("level-", "");
          filtered = members.filter(m => (m.level || "member").toLowerCase() === lvl);
        } else {
          filtered = members;
        }

        if (filtered.length === 0) {
          grid.innerHTML = `<div class="state-message"><p>No members match this filter.</p></div>`;
          return;
        }

        filtered.forEach((m, i) => {
          const card = buildMemberCard(m);
          card.style.opacity = "0";
          card.style.animation = `fadeUp 0.4s ${i * 0.04}s ease forwards`;
          card.addEventListener("click", () => {
            document.getElementById("crx-modal-inner").innerHTML = buildModalContent(m);
            modal.classList.add("open");
            document.body.style.overflow = "hidden";
            modal.scrollTop = 0;
            const backBtn = document.getElementById("crx-modal-back");
            if (backBtn) backBtn.addEventListener("click", closeModal);
          });
          grid.appendChild(card);
        });
      }

      renderCards();

      filterContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".filter-chip");
        if (!chip) return;
        filterContainer.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderCards(chip.dataset.filter);
      });

      if (!document.getElementById("crx-keyframes")) {
        const kf = document.createElement("style");
        kf.id = "crx-keyframes";
        kf.textContent = `@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`;
        document.head.appendChild(kf);
      }

    } catch (err) {
      console.error("Failed to load:", err);
      grid.innerHTML = `<div class="state-message"><p>Unable to load members.</p><p style="font-size:12px;color:var(--text-muted);margin-top:4px;">${escapeHTML(err.message)}</p><button class="retry-btn" onclick="location.reload()">Retry</button></div>`;
      filterContainer.innerHTML = "";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();