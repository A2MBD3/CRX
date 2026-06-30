/* ============================================================
   TEAM CRX — crx.js
   All styles, markup, logic — single file.
   ============================================================ */

(function () {
  "use strict";

  /* ── DATA ───────────────────────────────────────────────── */
  const MEMBERS = [
    {
      id: "alpha",
      role: "ADMIN",
      codename: "ALPHA",
      name: "Rafiul Islam",
      title: "Lead Architect",
      bio: "Full-stack engineer obsessed with system design and distributed architectures. Builds things that scale.",
      stack: ["Node.js", "React", "PostgreSQL", "Docker", "AWS"],
      portfolio: "https://github.com/rafiul",
      github: "https://github.com/rafiul",
      hidden: false,
      badge: "FOUNDER",
    },
    {
      id: "beta",
      role: "ADMIN",
      codename: "BETA",
      name: "Nafis Rahman",
      title: "DevOps Engineer",
      bio: "Infrastructure wizard. If it's running in production, he built the pipeline that got it there.",
      stack: ["Kubernetes", "Terraform", "Go", "Linux", "CI/CD"],
      portfolio: "https://github.com/nafis",
      github: "https://github.com/nafis",
      hidden: false,
      badge: "CORE",
    },
    {
      id: "gamma",
      role: "DEV",
      codename: "GAMMA",
      name: "Tanvir Ahmed",
      title: "Frontend Specialist",
      bio: "Pixel-perfect UI and blazing-fast web experiences. Turns Figma files into living code.",
      stack: ["Vue.js", "TypeScript", "Tailwind", "WebGL", "Vite"],
      portfolio: "https://github.com/tanvir",
      github: "https://github.com/tanvir",
      hidden: false,
      badge: "DEV",
    },
    {
      id: "delta",
      role: "DEV",
      codename: "DELTA",
      name: "██████ ██████",
      title: "Security Researcher",
      bio: "[CLASSIFIED — ACCESS RESTRICTED]",
      stack: ["???", "???", "???"],
      portfolio: null,
      github: null,
      hidden: true,
      badge: "CLASSIFIED",
    },
    {
      id: "epsilon",
      role: "DEV",
      codename: "EPSILON",
      name: "Sumaiya Khan",
      title: "ML Engineer",
      bio: "Trains models, breaks them, trains better ones. Research-to-production ML pipelines.",
      stack: ["Python", "PyTorch", "FastAPI", "CUDA", "HuggingFace"],
      portfolio: "https://github.com/sumaiya",
      github: "https://github.com/sumaiya",
      hidden: false,
      badge: "DEV",
    },
    {
      id: "zeta",
      role: "DEV",
      codename: "ZETA",
      name: "██████",
      title: "Backend Engineer",
      bio: "[IDENTITY CONCEALED BY REQUEST]",
      stack: ["???"],
      portfolio: null,
      github: null,
      hidden: true,
      badge: "GHOST",
    },
  ];

  const STATS = [
    { label: "Members", value: "06" },
    { label: "Projects Shipped", value: "34+" },
    { label: "Lines of Code", value: "1.2M" },
    { label: "Coffee Cups", value: "∞" },
  ];

  /* ── STYLES ─────────────────────────────────────────────── */
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Inter:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --void:    #0A0A0F;
      --deep:    #0E0E1A;
      --panel:   #12121F;
      --navy:    #1A1A2E;
      --slate:   #2A2A45;
      --muted:   #3A3A5C;
      --dim:     #6B6B9A;
      --cold:    #C8C8E0;
      --white:   #E8E8F0;
      --cyan:    #00D4FF;
      --violet:  #7B2FBE;
      --pink:    #FF2D78;
      --green:   #00FF88;
      --amber:   #FFB800;
      --mono: 'JetBrains Mono', monospace;
      --sans: 'Inter', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--void);
      color: var(--white);
      font-family: var(--sans);
      overflow-x: hidden;
      min-height: 100vh;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--void); }
    ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

    /* ── CANVAS BACKGROUND ── */
    #crx-canvas {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.35;
    }

    /* ── NOISE OVERLAY ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.4;
    }

    /* ── MAIN WRAPPER ── */
    #crx-app {
      position: relative;
      z-index: 2;
    }

    /* ── NAV ── */
    #crx-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 40px;
      background: rgba(10,10,15,0.7);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(123,47,190,0.2);
    }

    .nav-logo {
      font-family: var(--mono);
      font-size: 20px;
      font-weight: 800;
      color: var(--cyan);
      letter-spacing: -1px;
      cursor: pointer;
    }
    .nav-logo span { color: var(--violet); }

    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
    }
    .nav-links a {
      font-family: var(--mono);
      font-size: 12px;
      font-weight: 500;
      color: var(--dim);
      text-decoration: none;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--cyan); }

    .nav-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--mono);
      font-size: 11px;
      color: var(--green);
    }
    .nav-status::before {
      content: '';
      width: 6px; height: 6px;
      background: var(--green);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    /* ── HERO ── */
    #crx-hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 120px 40px 80px;
      position: relative;
    }

    .hero-eyebrow {
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 500;
      color: var(--cyan);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .hero-eyebrow::before {
      content: '';
      width: 32px; height: 1px;
      background: var(--cyan);
    }

    .hero-title {
      font-family: var(--mono);
      font-size: clamp(56px, 9vw, 120px);
      font-weight: 800;
      line-height: 0.9;
      letter-spacing: -4px;
      color: var(--white);
      margin-bottom: 8px;
    }
    .hero-title .accent { color: var(--cyan); }
    .hero-title .dim-char { color: var(--muted); }

    .hero-subtitle {
      font-family: var(--mono);
      font-size: clamp(18px, 3vw, 32px);
      font-weight: 300;
      color: var(--violet);
      letter-spacing: 2px;
      margin-bottom: 40px;
    }

    .hero-desc {
      max-width: 520px;
      font-size: 16px;
      font-weight: 400;
      color: var(--dim);
      line-height: 1.8;
      margin-bottom: 56px;
    }

    .hero-cta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-primary {
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 14px 32px;
      background: var(--cyan);
      color: var(--void);
      border: none;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0,212,255,0.35);
    }

    .btn-ghost {
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 13px 32px;
      background: transparent;
      color: var(--cold);
      border: 1px solid var(--muted);
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-ghost:hover {
      border-color: var(--violet);
      color: var(--white);
    }

    /* ── STATS BAR ── */
    #crx-stats {
      display: flex;
      gap: 0;
      margin-top: 80px;
      border-top: 1px solid var(--slate);
      padding-top: 40px;
    }

    .stat-item {
      flex: 1;
      padding: 0 32px 0 0;
      border-right: 1px solid var(--slate);
    }
    .stat-item:last-child { border-right: none; }

    .stat-value {
      font-family: var(--mono);
      font-size: 36px;
      font-weight: 800;
      color: var(--cyan);
      letter-spacing: -2px;
      line-height: 1;
      margin-bottom: 6px;
    }
    .stat-label {
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 500;
      color: var(--muted);
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    /* ── SECTION HEADERS ── */
    .section-header {
      padding: 80px 40px 48px;
    }
    .section-tag {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--violet);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-tag::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, var(--slate), transparent);
    }
    .section-title {
      font-family: var(--mono);
      font-size: clamp(28px, 4vw, 48px);
      font-weight: 800;
      color: var(--white);
      letter-spacing: -2px;
    }

    /* ── MEMBERS GRID ── */
    #crx-members {
      padding: 0 40px 100px;
    }

    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2px;
    }

    /* ── MEMBER CARD ── */
    .member-card {
      position: relative;
      background: var(--panel);
      border: 1px solid var(--slate);
      padding: 32px;
      cursor: pointer;
      overflow: hidden;
      transition: border-color 0.3s, transform 0.3s;
    }

    .member-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,212,255,0.03), transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .member-card:hover {
      border-color: var(--cyan);
      transform: translateY(-2px);
      z-index: 10;
    }
    .member-card:hover::before { opacity: 1; }

    /* Holographic shimmer for visible cards */
    .member-card:not(.member-hidden)::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(0,212,255,0.04) 45%,
        rgba(123,47,190,0.06) 50%,
        rgba(0,212,255,0.04) 55%,
        transparent 60%
      );
      animation: shimmer 6s linear infinite;
      pointer-events: none;
    }

    /* Hidden/classified card style */
    .member-hidden {
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255,45,120,0.015) 2px,
        rgba(255,45,120,0.015) 4px
      ), var(--panel);
    }
    .member-hidden .member-name {
      font-family: var(--mono);
      color: var(--pink);
      text-shadow: 0 0 8px var(--pink);
      animation: glitch 3s infinite;
    }
    .member-hidden .member-bio {
      color: var(--muted);
      font-style: italic;
    }

    .card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .member-avatar {
      width: 52px; height: 52px;
      border-radius: 2px;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--mono);
      font-size: 18px;
      font-weight: 800;
      color: var(--void);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .member-hidden .member-avatar {
      background: linear-gradient(135deg, #2a0a1a, #1a0a2a);
      color: var(--pink);
      text-shadow: 0 0 10px var(--pink);
    }

    .badge {
      font-family: var(--mono);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 4px 8px;
      border-radius: 2px;
    }
    .badge-FOUNDER  { background: rgba(255,184,0,0.15);  color: var(--amber);  border: 1px solid rgba(255,184,0,0.3); }
    .badge-CORE     { background: rgba(0,212,255,0.1);   color: var(--cyan);   border: 1px solid rgba(0,212,255,0.3); }
    .badge-DEV      { background: rgba(123,47,190,0.15); color: var(--violet); border: 1px solid rgba(123,47,190,0.3);}
    .badge-CLASSIFIED { background: rgba(255,45,120,0.1); color: var(--pink);  border: 1px solid rgba(255,45,120,0.3);}
    .badge-GHOST    { background: rgba(58,58,92,0.3);    color: var(--muted);  border: 1px solid var(--slate); }

    .member-codename {
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 500;
      color: var(--dim);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .member-name {
      font-family: var(--mono);
      font-size: 20px;
      font-weight: 700;
      color: var(--white);
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }

    .member-title {
      font-size: 13px;
      color: var(--cyan);
      font-weight: 500;
      margin-bottom: 16px;
    }
    .member-hidden .member-title { color: var(--muted); }

    .member-bio {
      font-size: 13px;
      color: var(--dim);
      line-height: 1.7;
      margin-bottom: 20px;
      min-height: 44px;
    }

    .member-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 24px;
    }

    .stack-tag {
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 500;
      padding: 3px 8px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--slate);
      color: var(--cold);
      border-radius: 1px;
    }
    .member-hidden .stack-tag {
      background: rgba(255,45,120,0.05);
      border-color: rgba(255,45,120,0.2);
      color: var(--muted);
      letter-spacing: 2px;
    }

    .card-footer {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-top: 20px;
      border-top: 1px solid var(--slate);
    }

    .card-link {
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--cyan);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: gap 0.2s;
    }
    .card-link:hover { gap: 10px; }
    .card-link svg { width: 12px; height: 12px; }

    .card-link-ghost {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: not-allowed;
    }

    .view-profile-btn {
      margin-left: auto;
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 6px 14px;
      background: transparent;
      border: 1px solid var(--muted);
      color: var(--dim);
      cursor: pointer;
      transition: all 0.2s;
    }
    .view-profile-btn:hover {
      border-color: var(--cyan);
      color: var(--cyan);
    }

    /* ── MODAL / PROFILE PAGE ── */
    #crx-modal {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(10,10,15,0.97);
      backdrop-filter: blur(24px);
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    #crx-modal.open {
      opacity: 1;
      pointer-events: all;
    }

    .modal-inner {
      max-width: 860px;
      margin: 0 auto;
      padding: 80px 40px 120px;
      transform: translateY(24px);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    #crx-modal.open .modal-inner { transform: translateY(0); }

    .modal-back {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: var(--mono);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--dim);
      background: none;
      border: none;
      cursor: pointer;
      margin-bottom: 60px;
      transition: color 0.2s;
      padding: 0;
    }
    .modal-back:hover { color: var(--cyan); }
    .modal-back svg { width: 14px; height: 14px; }

    .modal-header {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 32px;
      align-items: start;
      margin-bottom: 56px;
      padding-bottom: 56px;
      border-bottom: 1px solid var(--slate);
    }

    .modal-avatar {
      width: 96px; height: 96px;
      border-radius: 4px;
      background: linear-gradient(135deg, var(--violet), var(--cyan));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--mono);
      font-size: 36px;
      font-weight: 800;
      color: var(--void);
      position: relative;
    }
    .modal-avatar::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 5px;
      background: linear-gradient(135deg, var(--cyan), var(--violet));
      z-index: -1;
      opacity: 0.6;
    }

    .modal-id {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--cyan);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .modal-name {
      font-family: var(--mono);
      font-size: 42px;
      font-weight: 800;
      letter-spacing: -2px;
      color: var(--white);
      line-height: 1;
      margin-bottom: 8px;
    }
    .modal-title-role {
      font-size: 15px;
      color: var(--cyan);
      font-weight: 500;
    }
    .modal-badges {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .modal-bio {
      font-size: 16px;
      color: var(--cold);
      line-height: 1.85;
      margin-bottom: 48px;
      max-width: 600px;
    }

    .modal-section-label {
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--violet);
      margin-bottom: 16px;
    }

    .modal-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 48px;
    }
    .modal-stack-tag {
      font-family: var(--mono);
      font-size: 12px;
      padding: 6px 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--slate);
      color: var(--cold);
      transition: border-color 0.2s, color 0.2s;
    }
    .modal-stack-tag:hover {
      border-color: var(--cyan);
      color: var(--cyan);
    }

    .modal-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .modal-link {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: var(--mono);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      padding: 12px 24px;
      text-decoration: none;
      border: 1px solid;
      transition: all 0.2s;
    }
    .modal-link-primary {
      background: var(--cyan);
      color: var(--void);
      border-color: var(--cyan);
    }
    .modal-link-primary:hover {
      box-shadow: 0 4px 24px rgba(0,212,255,0.4);
      transform: translateY(-1px);
    }
    .modal-link-github {
      background: transparent;
      color: var(--cold);
      border-color: var(--muted);
    }
    .modal-link-github:hover {
      border-color: var(--violet);
      color: var(--violet);
    }

    /* classified modal */
    .modal-classified {
      text-align: center;
      padding: 80px 40px;
    }
    .classified-icon {
      font-family: var(--mono);
      font-size: 64px;
      color: var(--pink);
      text-shadow: 0 0 32px var(--pink);
      margin-bottom: 24px;
      animation: glitch 2s infinite;
    }
    .classified-title {
      font-family: var(--mono);
      font-size: 32px;
      font-weight: 800;
      color: var(--pink);
      letter-spacing: -1px;
      margin-bottom: 16px;
    }
    .classified-msg {
      font-family: var(--mono);
      font-size: 13px;
      color: var(--muted);
      line-height: 2;
    }
    .classified-border {
      border: 1px solid rgba(255,45,120,0.3);
      padding: 40px;
      max-width: 480px;
      margin: 0 auto;
      background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 8px,
        rgba(255,45,120,0.03) 8px,
        rgba(255,45,120,0.03) 16px
      );
    }

    /* ── FOOTER ── */
    #crx-footer {
      padding: 48px 40px;
      border-top: 1px solid var(--slate);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: gap;
      gap: 16px;
    }
    .footer-logo {
      font-family: var(--mono);
      font-size: 18px;
      font-weight: 800;
      color: var(--cyan);
    }
    .footer-logo span { color: var(--violet); }
    .footer-copy {
      font-family: var(--mono);
      font-size: 11px;
      color: var(--muted);
      letter-spacing: 1px;
    }

    /* ── ANIMATIONS ── */
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(0deg); }
    }

    @keyframes glitch {
      0%, 90%, 100% { transform: none; text-shadow: 0 0 8px var(--pink); }
      92% { transform: translateX(-3px) skewX(-2deg); text-shadow: 3px 0 0 rgba(0,212,255,0.5), -3px 0 0 rgba(255,45,120,0.5); }
      94% { transform: translateX(3px) skewX(2deg); }
      96% { transform: translateX(-1px); }
      98% { transform: translateX(1px); text-shadow: -2px 0 0 rgba(123,47,190,0.5); }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .fade-up {
      opacity: 0;
      animation: fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
    }

    /* ── SCANLINES (hidden cards) ── */
    .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0,0,0,0.4) 1px,
        rgba(0,0,0,0.4) 2px
      );
      opacity: 0.4;
    }

    /* ── TERMINAL CURSOR ── */
    .cursor {
      display: inline-block;
      width: 10px; height: 1.2em;
      background: var(--cyan);
      vertical-align: middle;
      margin-left: 4px;
      animation: blink 1.1s step-end infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      #crx-nav { padding: 14px 20px; }
      .nav-links { display: none; }
      #crx-hero { padding: 100px 20px 60px; }
      #crx-stats { flex-wrap: wrap; gap: 24px; }
      .stat-item { border-right: none; padding: 0; }
      .section-header { padding: 60px 20px 36px; }
      #crx-members { padding: 0 20px 80px; }
      .members-grid { grid-template-columns: 1fr; gap: 2px; }
      .modal-inner { padding: 60px 20px 80px; }
      .modal-header { grid-template-columns: 1fr; }
      .modal-name { font-size: 28px; }
      #crx-footer { padding: 32px 20px; flex-direction: column; text-align: center; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  `;

  /* ── GRID CANVAS ANIMATION ── */
  function initCanvas() {
    const canvas = document.getElementById("crx-canvas");
    const ctx = canvas.getContext("2d");
    let W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((W * H) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = "rgba(58,58,92,0.3)";
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      });

      // Connections
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(123,47,190,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => { resize(); initParticles(); });
    resize(); initParticles(); draw();
  }

  /* ── HELPERS ── */
  function getInitials(name) {
    if (!name || name.includes("█")) return "?";
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  }

  const svgArrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="8" x2="14" y2="8"/><polyline points="9,3 14,8 9,13"/></svg>`;
  const svgBack  = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="14" y1="8" x2="2" y2="8"/><polyline points="7,3 2,8 7,13"/></svg>`;
  const svgGithub = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
  const svgLock  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`;

  /* ── BUILD HTML ── */
  function buildMemberCard(m) {
    const div = document.createElement("div");
    div.className = `member-card${m.hidden ? " member-hidden" : ""}`;
    div.dataset.id = m.id;

    const stackHTML = m.stack.map(s =>
      `<span class="stack-tag">${m.hidden ? "██████" : s}</span>`
    ).join("");

    const footerHTML = m.hidden
      ? `<span class="card-link-ghost">${svgLock} Classified</span>
         <button class="view-profile-btn" style="border-color:rgba(255,45,120,0.3);color:#3A3A5C;cursor:not-allowed;" disabled>RESTRICTED</button>`
      : `<a class="card-link" href="${m.portfolio || "#"}" target="_blank" rel="noopener">Portfolio ${svgArrow}</a>
         <button class="view-profile-btn" data-open="${m.id}">PROFILE</button>`;

    div.innerHTML = `
      ${m.hidden ? '<div class="scanlines"></div>' : ""}
      <div class="card-top">
        <div class="member-avatar">${getInitials(m.name)}</div>
        <span class="badge badge-${m.badge}">${m.badge}</span>
      </div>
      <div class="member-codename">// ${m.codename}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-title">${m.hidden ? "[ IDENTITY CONCEALED ]" : m.title}</div>
      <div class="member-bio">${m.bio}</div>
      <div class="member-stack">${stackHTML}</div>
      <div class="card-footer">${footerHTML}</div>
    `;

    return div;
  }

  function buildModalContent(m) {
    if (m.hidden) {
      return `
        <div class="modal-classified">
          <div class="classified-border">
            <div class="classified-icon">⚠</div>
            <div class="classified-title">ACCESS DENIED</div>
            <div class="classified-msg">
              CODENAME: ${m.codename}<br>
              CLEARANCE LEVEL REQUIRED: OMEGA<br>
              <br>
              This member's identity and details<br>
              are classified by their own request.<br>
              <br>
              ██████████████████████████████
            </div>
          </div>
        </div>
      `;
    }

    const stackHTML = m.stack.map(s => `<span class="modal-stack-tag">${s}</span>`).join("");
    const linksHTML = [
      m.portfolio ? `<a class="modal-link modal-link-primary" href="${m.portfolio}" target="_blank" rel="noopener">${svgArrow} View Portfolio</a>` : "",
      m.github    ? `<a class="modal-link modal-link-github" href="${m.github}" target="_blank" rel="noopener">${svgGithub} GitHub</a>` : "",
    ].filter(Boolean).join("");

    return `
      <div class="modal-header">
        <div class="modal-avatar">${getInitials(m.name)}</div>
        <div>
          <div class="modal-id">// MEMBER · ${m.codename} · ${m.role}</div>
          <div class="modal-name">${m.name}</div>
          <div class="modal-title-role">${m.title}</div>
          <div class="modal-badges">
            <span class="badge badge-${m.badge}">${m.badge}</span>
          </div>
        </div>
      </div>
      <p class="modal-bio">${m.bio}</p>
      <div class="modal-section-label">// TECH STACK</div>
      <div class="modal-stack">${stackHTML}</div>
      ${linksHTML ? `<div class="modal-section-label">// LINKS</div><div class="modal-links">${linksHTML}</div>` : ""}
    `;
  }

  /* ── RENDER ── */
  function render() {
    // Inject styles
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    // Set page meta
    document.title = "Team CRX";
    const metaVP = document.querySelector("meta[name=viewport]") ||
      Object.assign(document.createElement("meta"), { name: "viewport" });
    metaVP.content = "width=device-width, initial-scale=1";
    if (!metaVP.parentElement) document.head.appendChild(metaVP);

    // Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "crx-canvas";
    document.body.appendChild(canvas);

    // App root
    const app = document.createElement("div");
    app.id = "crx-app";

    // ── NAV ──
    app.innerHTML = `
      <nav id="crx-nav">
        <div class="nav-logo">TEAM<span>CRX</span></div>
        <ul class="nav-links">
          <li><a href="#members">Team</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div class="nav-status">ONLINE</div>
      </nav>

      <!-- HERO -->
      <section id="crx-hero">
        <div class="hero-eyebrow">Developer Organization · Est. 2023</div>
        <h1 class="hero-title">
          <span class="dim-char">[</span>TEAM<span class="accent">CRX</span><span class="dim-char">]</span>
        </h1>
        <div class="hero-subtitle">BUILD · SHIP · ITERATE<span class="cursor"></span></div>
        <p class="hero-desc">
          A collective of engineers who believe good software is part craft, part obsession.
          We design systems that scale, write code that lasts, and ship things that matter.
        </p>
        <div class="hero-cta">
          <a href="#members" class="btn-primary">${svgArrow} Meet the Team</a>
          <a href="https://github.com" target="_blank" class="btn-ghost">${svgGithub} GitHub</a>
        </div>
        <div id="crx-stats"></div>
      </section>

      <!-- MEMBERS -->
      <section id="members">
        <div class="section-header">
          <div class="section-tag">// THE TEAM</div>
          <h2 class="section-title">Core Members</h2>
        </div>
        <div id="crx-members">
          <div class="members-grid" id="crx-grid"></div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer id="crx-footer">
        <div class="footer-logo">TEAM<span>CRX</span></div>
        <div class="footer-copy">// BUILT BY TEAM CRX · ${new Date().getFullYear()}</div>
      </footer>
    `;

    document.body.appendChild(app);

    // Stats
    const statsEl = document.getElementById("crx-stats");
    STATS.forEach((s, i) => {
      const el = document.createElement("div");
      el.className = "stat-item fade-up";
      el.style.animationDelay = `${0.4 + i * 0.1}s`;
      el.innerHTML = `<div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div>`;
      statsEl.appendChild(el);
    });

    // Member cards
    const grid = document.getElementById("crx-grid");
    MEMBERS.forEach((m, i) => {
      const card = buildMemberCard(m);
      card.style.animationDelay = `${i * 0.08}s`;
      card.classList.add("fade-up");
      grid.appendChild(card);
    });

    // ── MODAL ──
    const modal = document.createElement("div");
    modal.id = "crx-modal";
    modal.innerHTML = `<div class="modal-inner" id="crx-modal-inner">
      <button class="modal-back" id="crx-modal-back">${svgBack} Back to Team</button>
      <div id="crx-modal-body"></div>
    </div>`;
    document.body.appendChild(modal);

    function openModal(id) {
      const m = MEMBERS.find(x => x.id === id);
      if (!m) return;
      document.getElementById("crx-modal-body").innerHTML = buildModalContent(m);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      modal.scrollTop = 0;
    }

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    document.getElementById("crx-modal-back").addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    // Event delegation for profile buttons
    document.getElementById("crx-grid").addEventListener("click", e => {
      const btn = e.target.closest("[data-open]");
      if (btn) openModal(btn.dataset.open);
    });

    initCanvas();
  }

  // Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
