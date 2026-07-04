/* ============================================================
   TEAM CRX — crx.js
   Clean, professional developer organization page.
   All data fetched from remote JSON — no hardcoded members.
   ============================================================ */

(function () {
  "use strict";

  /* ── REMOTE DATA SOURCE ────────────────────────────────── */
  const DATA_URL = "hackers.json";

  /* ── STYLES ─────────────────────────────────────────────── */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-primary: #0A0A14;
      --bg-secondary: #111122;
      --bg-card: #16162B;
      --border: #252545;
      --border-hover: #3D3D6B;
      --text-primary: #EAEAEF;
      --text-secondary: #9A9ABF;
      --text-muted: #5E5E8A;
      --accent: #4F7CFF;
      --accent-hover: #6B90FF;
      --accent-subtle: rgba(79, 124, 255, 0.1);
      --telegram: #2AABEE;
      --telegram-hover: #1E96D4;
      --radius: 12px;
      --radius-sm: 8px;
      --shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3);
      --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.5), 0 12px 40px rgba(79, 124, 255, 0.12);
      --transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-primary); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--border-hover); }

    /* ── TELEGRAM BAR ── */
    #tg-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--telegram);
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 600;
      font-size: 15px;
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.3px;
      transition: background var(--transition);
      box-shadow: 0 2px 24px rgba(42, 171, 238, 0.35);
      cursor: pointer;
      border: none;
      width: 100%;
    }
    #tg-bar:hover { background: var(--telegram-hover); }
    #tg-bar svg { width: 22px; height: 22px; flex-shrink: 0; }

    /* ── MAIN WRAPPER ── */
    #crx-app {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 32px;
    }

    /* ── NAV ── */
    #crx-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 64px;
    }
    .nav-logo {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.5px;
      user-select: none;
    }
    .nav-logo span { color: var(--accent); }
    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
      align-items: center;
    }
    .nav-links a {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition);
    }
    .nav-links a:hover { color: var(--text-primary); }
    .nav-cta {
      font-size: 13px;
      font-weight: 600;
      padding: 10px 20px;
      background: var(--accent);
      color: #fff;
      border-radius: 8px;
      text-decoration: none;
      transition: background var(--transition);
    }
    .nav-cta:hover { background: var(--accent-hover); }

    /* ── HERO ── */
    #crx-hero {
      margin-bottom: 80px;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      color: var(--accent);
      background: var(--accent-subtle);
      padding: 8px 16px;
      border-radius: 20px;
      margin-bottom: 28px;
    }
    .hero-badge-dot {
      width: 6px; height: 6px;
      background: var(--accent);
      border-radius: 50%;
      animation: pulse-dot 2s infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.5); }
    }
    .hero-title {
      font-size: clamp(36px, 5vw, 60px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -1.5px;
      color: var(--text-primary);
      margin-bottom: 20px;
    }
    .hero-title .accent { color: var(--accent); }
    .hero-desc {
      max-width: 560px;
      font-size: 17px;
      font-weight: 400;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 36px;
    }
    .hero-buttons {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: all var(--transition);
      cursor: pointer;
      border: none;
      font-family: inherit;
    }
    .btn-primary {
      background: var(--accent);
      color: #fff;
    }
    .btn-primary:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(79, 124, 255, 0.35);
    }
    .btn-secondary {
      background: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      border-color: var(--border-hover);
      background: var(--bg-secondary);
    }

    /* ── STATS ROW ── */
    #crx-stats {
      display: flex;
      gap: 0;
      margin-top: 64px;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      overflow: hidden;
    }
    .stat-item {
      flex: 1;
      padding: 28px 32px;
      text-align: center;
      border-right: 1px solid var(--border);
    }
    .stat-item:last-child { border-right: none; }
    .stat-value {
      font-size: 28px;
      font-weight: 800;
      color: var(--accent);
      letter-spacing: -1px;
      margin-bottom: 4px;
    }
    .stat-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* ── MEMBERS SECTION ── */
    .section-header {
      margin-bottom: 40px;
      margin-top: 20px;
    }
    .section-tag {
      font-size: 12px;
      font-weight: 600;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    .section-title {
      font-size: 32px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.5px;
    }
    .section-subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      margin-top: 8px;
    }

    /* ── MEMBERS GRID ── */
    #crx-members {
      padding-bottom: 40px;
    }
    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    /* ── MEMBER CARD ── */
    .member-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      cursor: pointer;
      transition: all var(--transition);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .member-card:hover {
      border-color: var(--border-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-card-hover);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .member-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), #3B5FD9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }
    .member-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .member-info-top {
      min-width: 0;
    }
    .member-name {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .member-username {
      font-size: 13px;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .member-department {
      display: inline-block;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
      letter-spacing: 0.3px;
    }
    .member-bio {
      font-size: 13.5px;
      color: var(--text-secondary);
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-footer {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }
    .card-link {
      font-size: 13px;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: gap var(--transition);
    }
    .card-link:hover { gap: 8px; }
    .card-link svg { width: 14px; height: 14px; }
    .card-link-muted {
      font-size: 13px;
      color: var(--text-muted);
      text-decoration: none;
    }

    /* ── MODAL ── */
    #crx-modal {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(10, 10, 20, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    #crx-modal.open {
      opacity: 1;
      pointer-events: all;
    }
    .modal-inner {
      max-width: 700px;
      margin: 0 auto;
      padding: 60px 32px 80px;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }
    #crx-modal.open .modal-inner { transform: translateY(0); }
    .modal-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-secondary);
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 40px;
      padding: 8px 0;
      font-family: inherit;
      transition: color var(--transition);
    }
    .modal-back:hover { color: var(--text-primary); }
    .modal-back svg { width: 16px; height: 16px; }
    .modal-profile {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }
    .modal-avatar {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), #3B5FD9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }
    .modal-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    .modal-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text-primary);
    }
    .modal-username {
      font-size: 15px;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .modal-department {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      padding: 5px 12px;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
      margin-top: 10px;
    }
    .modal-bio {
      font-size: 15px;
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 32px;
    }
    .modal-section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--text-muted);
      margin-bottom: 14px;
    }
    .modal-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 32px;
    }
    .detail-item {
      font-size: 14px;
      color: var(--text-secondary);
      display: flex;
      gap: 6px;
    }
    .detail-label {
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .modal-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .modal-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: all var(--transition);
    }
    .modal-link-primary {
      background: var(--accent);
      color: #fff;
    }
    .modal-link-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 4px 18px rgba(79, 124, 255, 0.35);
    }
    .modal-link-outline {
      background: transparent;
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    .modal-link-outline:hover { border-color: var(--border-hover); }

    /* ── LOADING / ERROR STATES ── */
    .state-message {
      text-align: center;
      padding: 80px 20px;
      grid-column: 1 / -1;
    }
    .state-message .spinner {
      width: 36px; height: 36px;
      border: 3px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .state-message p {
      color: var(--text-secondary);
      font-size: 15px;
    }
    .state-message .retry-btn {
      display: inline-block;
      margin-top: 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--accent);
      cursor: pointer;
      text-decoration: underline;
      background: none;
      border: none;
      font-family: inherit;
    }

    /* ── FOOTER ── */
    #crx-footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-logo {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .footer-logo span { color: var(--accent); }
    .footer-copy {
      font-size: 13px;
      color: var(--text-muted);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      #crx-app { padding: 0 16px; }
      #crx-nav { flex-direction: column; gap: 16px; align-items: flex-start; }
      .nav-links { gap: 20px; flex-wrap: wrap; }
      #crx-stats { flex-wrap: wrap; }
      .stat-item { flex: 1 1 50%; border-right: none; border-bottom: 1px solid var(--border); }
      .stat-item:nth-child(3), .stat-item:nth-child(4) { border-bottom: none; }
      .members-grid { grid-template-columns: 1fr; gap: 12px; }
      .modal-inner { padding: 40px 16px 60px; }
      .modal-profile { flex-direction: column; align-items: flex-start; }
      .modal-details { grid-template-columns: 1fr; }
      .hero-title { font-size: 32px; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  `;

  /* ── SVG ICONS ── */
  const SVG = {
    telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>`,
    arrow: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="9,4 13,8 9,12"/></svg>`,
    back: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="13" y1="8" x2="3" y2="8"/><polyline points="7,4 3,8 7,12"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  };

  /* ── HELPERS ── */
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

  /* ── DATA FETCHING ── */
  async function fetchMembers() {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const data = await response.json();
    // Handle different possible JSON structures
    if (Array.isArray(data)) return data;
    if (data.members && Array.isArray(data.members)) return data.members;
    if (data.data && Array.isArray(data.data)) return data.data;
    // Try to find any array in the object
    const arrayKey = Object.keys(data).find(k => Array.isArray(data[k]));
    if (arrayKey) return data[arrayKey];
    throw new Error("Unexpected JSON structure — could not find member array.");
  }

  function mapMember(raw) {
    // Normalize all possible field names
    const id = raw.id || raw._id || raw.entry || raw.Entry || String(Math.random());
    const name = raw.name || raw.Name || raw.fullName || raw.full_name || "Unknown Member";
    const username = raw.username || raw.Username || raw.handle || raw.github || raw.GitHub || "";
    const department = raw.department || raw.Department || raw.section || raw.Section || raw.dept || "Member";
    const bio = raw.bio || raw.Bio || raw.about || raw.About || raw.description || "";
    const avatar = raw.avatar || raw.Avatar || raw.image || raw.Image || raw.photo || raw.Photo || null;
    const status = raw.status || raw.Status || raw.active || "";
    const github = raw.github || raw.GitHub || raw.github_url || raw.githubUrl || "";
    const website = raw.website || raw.Website || raw.url || raw.Url || raw.portfolio || raw.Portfolio || "";
    const telegram = raw.telegram || raw.Telegram || raw.tg || raw.TG || "";

    return { id, name, username, department, bio, avatar, status, github, website, telegram };
  }

  /* ── BUILD HTML ── */
  function buildMemberCard(m) {
    const card = document.createElement("div");
    card.className = "member-card";
    card.dataset.id = m.id;

    const avatarContent = m.avatar
      ? `<img src="${escapeHTML(m.avatar)}" alt="${escapeHTML(m.name)}" loading="lazy" onerror="this.parentElement.innerHTML='${getInitials(m.name)}'">`
      : getInitials(m.name);

    const displayUsername = m.username ? `@${escapeHTML(m.username.replace(/^@/, ""))}` : "";

    const links = [];
    if (m.github) links.push(`<a class="card-link" href="${escapeHTML(m.github)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${SVG.github} GitHub</a>`);
    if (m.website) links.push(`<a class="card-link" href="${escapeHTML(m.website)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${SVG.globe} Website</a>`);
    if (links.length === 0) links.push(`<span class="card-link-muted">No links</span>`);

    card.innerHTML = `
      <div class="card-header">
        <div class="member-avatar">${avatarContent}</div>
        <div class="member-info-top">
          <div class="member-name">${escapeHTML(m.name)}</div>
          ${displayUsername ? `<div class="member-username">${displayUsername}</div>` : ""}
        </div>
      </div>
      <span class="member-department">${escapeHTML(m.department)}</span>
      ${m.bio ? `<div class="member-bio">${escapeHTML(m.bio)}</div>` : ""}
      <div class="card-footer">${links.join("")}</div>
    `;

    return card;
  }

  function buildModalContent(m) {
    const avatarContent = m.avatar
      ? `<img src="${escapeHTML(m.avatar)}" alt="${escapeHTML(m.name)}" onerror="this.parentElement.innerHTML='${getInitials(m.name)}'">`
      : getInitials(m.name);

    const displayUsername = m.username ? `@${escapeHTML(m.username.replace(/^@/, ""))}` : "";

    const detailsHTML = [];
    if (m.status) detailsHTML.push(`<div class="detail-item"><span class="detail-label">Status:</span> ${escapeHTML(m.status)}</div>`);
    if (m.department) detailsHTML.push(`<div class="detail-item"><span class="detail-label">Department:</span> ${escapeHTML(m.department)}</div>`);

    const linksHTML = [];
    if (m.github) linksHTML.push(`<a class="modal-link modal-link-primary" href="${escapeHTML(m.github)}" target="_blank" rel="noopener">${SVG.github} GitHub</a>`);
    if (m.website) linksHTML.push(`<a class="modal-link modal-link-outline" href="${escapeHTML(m.website)}" target="_blank" rel="noopener">${SVG.globe} Website</a>`);
    if (m.telegram) linksHTML.push(`<a class="modal-link modal-link-outline" href="${escapeHTML(m.telegram)}" target="_blank" rel="noopener">${SVG.telegram} Telegram</a>`);

    return `
      <button class="modal-back" id="crx-modal-back">${SVG.back} Back to Team</button>
      <div class="modal-profile">
        <div class="modal-avatar">${avatarContent}</div>
        <div>
          <div class="modal-name">${escapeHTML(m.name)}</div>
          ${displayUsername ? `<div class="modal-username">${displayUsername}</div>` : ""}
          <span class="modal-department">${escapeHTML(m.department)}</span>
        </div>
      </div>
      ${m.bio ? `<p class="modal-bio">${escapeHTML(m.bio)}</p>` : ""}
      ${detailsHTML.length > 0 ? `<div class="modal-section-label">Details</div><div class="modal-details">${detailsHTML.join("")}</div>` : ""}
      ${linksHTML.length > 0 ? `<div class="modal-section-label">Links</div><div class="modal-links">${linksHTML.join("")}</div>` : ""}
    `;
  }

  /* ── RENDER ── */
  function calculateStats(members) {
    const departments = new Set();
    let withGithub = 0;
    members.forEach(m => {
      if (m.department) departments.add(m.department);
      if (m.github) withGithub++;
    });
    return [
      { label: "Members", value: members.length },
      { label: "Departments", value: departments.size },
      { label: "GitHub Linked", value: withGithub },
      { label: "Active", value: members.length }, // fallback
    ];
  }

  async function render() {
    // Inject styles
    const styleEl = document.createElement("style");
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    // Set meta
    document.title = "Team CRX — Developer Organization";
    const metaVP = document.querySelector("meta[name=viewport]") || document.createElement("meta");
    metaVP.name = "viewport";
    metaVP.content = "width=device-width, initial-scale=1";
    if (!metaVP.parentElement) document.head.appendChild(metaVP);

    // Build app shell
    const app = document.createElement("div");
    app.id = "crx-app";
    app.innerHTML = `
      <nav id="crx-nav">
        <div class="nav-logo">TEAM<span>CRX</span></div>
        <ul class="nav-links">
          <li><a href="#members">Members</a></li>
          <li><a href="https://t.me/teamcrx" target="_blank" rel="noopener">Contact</a></li>
        </ul>
      </nav>
      <section id="crx-hero">
        <div class="hero-badge"><span class="hero-badge-dot"></span> Open Source Developer Collective</div>
        <h1 class="hero-title">We are <span class="accent">Team CRX</span></h1>
        <p class="hero-desc">A community of developers building projects, sharing knowledge, and growing together. Join us on Telegram to be part of the journey.</p>
        <div class="hero-buttons">
          <a href="#members" class="btn btn-primary">${SVG.arrow} View Members</a>
          <a href="https://github.com/TeamCRX" target="_blank" rel="noopener" class="btn btn-secondary">${SVG.github} GitHub</a>
        </div>
        <div id="crx-stats"></div>
      </section>
      <section id="members">
        <div class="section-header">
          <div class="section-tag">Team</div>
          <h2 class="section-title">Our Members</h2>
          <p class="section-subtitle">Data loaded live from the CRX database.</p>
        </div>
        <div id="crx-members">
          <div class="members-grid" id="crx-grid">
            <div class="state-message"><div class="spinner"></div><p>Loading members...</p></div>
          </div>
        </div>
      </section>
      <footer id="crx-footer">
        <div class="footer-logo">TEAM<span>CRX</span></div>
        <div class="footer-copy">&copy; ${new Date().getFullYear()} Team CRX. All rights reserved.</div>
      </footer>
    `;
    document.body.appendChild(app);

    // Telegram bar at top
    const tgBar = document.createElement("a");
    tgBar.id = "tg-bar";
    tgBar.href = "https://t.me/teamcrx";
    tgBar.target = "_blank";
    tgBar.rel = "noopener";
    tgBar.innerHTML = `${SVG.telegram} Join Our Telegram Community`;
    document.body.insertBefore(tgBar, document.body.firstChild);

    // Modal
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

    // Fetch and render members
    const grid = document.getElementById("crx-grid");
    const statsContainer = document.getElementById("crx-stats");

    try {
      const rawData = await fetchMembers();
      const members = rawData.map(mapMember).filter(m => m.name !== "Unknown Member" || m.username);

      if (members.length === 0) {
        grid.innerHTML = `<div class="state-message"><p>No members found in the database.</p><button class="retry-btn" onclick="location.reload()">Retry</button></div>`;
        statsContainer.innerHTML = "";
        return;
      }

      // Render stats
      const stats = calculateStats(members);
      statsContainer.innerHTML = stats.map(s =>
        `<div class="stat-item"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`
      ).join("");

      // Render cards
      grid.innerHTML = "";
      members.forEach((m, i) => {
        const card = buildMemberCard(m);
        card.style.opacity = "0";
        card.style.animation = `fadeUp 0.4s ${i * 0.05}s cubic-bezier(0.4,0,0.2,1) forwards`;
        card.addEventListener("click", () => {
          document.getElementById("crx-modal-inner").innerHTML = buildModalContent(m);
          modal.classList.add("open");
          document.body.style.overflow = "hidden";
          modal.scrollTop = 0;
          // Re-bind back button
          const backBtn = document.getElementById("crx-modal-back");
          if (backBtn) backBtn.addEventListener("click", closeModal);
        });
        grid.appendChild(card);
      });

      // Inject fadeUp keyframes if not already present
      if (!document.getElementById("crx-keyframes")) {
        const kf = document.createElement("style");
        kf.id = "crx-keyframes";
        kf.textContent = `@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`;
        document.head.appendChild(kf);
      }

    } catch (err) {
      console.error("Failed to load members:", err);
      grid.innerHTML = `
        <div class="state-message">
          <p>Unable to load members.</p>
          <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">${escapeHTML(err.message)}</p>
          <button class="retry-btn" onclick="location.reload()">Retry</button>
        </div>
      `;
      statsContainer.innerHTML = "";
    }
  }

  // Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();