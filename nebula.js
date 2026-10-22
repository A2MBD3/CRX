(async function () {
    /* ===== Channel Header ===== */
    function channelHeader(siteInfo) {
        const h = document.createElement('div');
        h.className = 'channel-header';
        const logo = siteInfo.nebulaProfilePic ||
            'https://ui-avatars.com/api/?name=N&background=7c3aed&color=fff&size=96&bold=true';
        const joinUrl = siteInfo.joinUrl || '#';
        h.innerHTML = `
            <img class="channel-logo" src="${logo}" alt="Logo"
                 onerror="this.src='https://ui-avatars.com/api/?name=N&background=7c3aed&color=fff&size=96&bold=true'">
            <div class="channel-info">
                <div class="channel-name">${siteInfo.channelName || siteInfo.title || 'Nebula'}</div>
                <div class="channel-sub"><span class="live-dot"></span> ${siteInfo.team || 'Team CRX'}</div>
            </div>
            <a class="join-btn" href="${joinUrl}" target="_blank" rel="noopener">⚡ JOIN</a>
        `;
        return h;
    }

    /* ===== Tech Animation Stage ===== */
    function techStage() {
        const s = document.createElement('div');
        s.className = 'tech-stage';
        s.innerHTML = `
            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>

            <div class="ring ring-3"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-1"></div>

            <div class="orb-core"></div>

            <div class="pulse-ring"></div>
            <div class="pulse-ring delay"></div>

            <div class="scan-line"></div>

            <div class="hud-label">// UNIVERSE BYPASS ENGINE //</div>
        `;
        return s;
    }

    /* ===== App Card ===== */
    function card(app) {
        const c = document.createElement('a');
        c.className = 'app-card';
        c.href = app.url || '#';
        c.target = '_blank';
        c.rel = 'noopener';

        const icon = app.image && app.image.trim() !== ''
            ? app.image
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=7c3aed&color=fff&size=92&bold=true`;

        let badge = '';
        if (app.status === 'active')  badge = '<span class="badge active">ACTIVE</span>';
        else if (app.status === 'beta')   badge = '<span class="badge beta">BETA</span>';
        else if (app.status === 'offline') badge = '<span class="badge offline">OFFLINE</span>';

        c.innerHTML = `
            <img class="app-icon" src="${icon}" alt="${app.name}"
                 onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=7c3aed&color=fff&size=92&bold=true'">
            <div class="app-info">
                <div class="app-name">${app.name}${badge}</div>
                ${app.description ? `<div class="app-desc">${app.description}</div>` : ''}
            </div>
            <span class="arrow">➜</span>
        `;

        if (app.status === 'offline') {
            c.style.opacity = '0.55';
            c.style.pointerEvents = 'none';
            c.removeAttribute('target');
        }
        return c;
    }

    /* ===== Apps Section ===== */
    function appsSection(apps) {
        const s = document.createElement('div');
        s.innerHTML = '<h2 class="section-title">SUPPORTED APPS</h2>';
        const list = document.createElement('div');
        list.className = 'apps-list';
        if (apps && apps.length) apps.forEach(a => list.appendChild(card(a)));
        s.appendChild(list);
        return s;
    }

    /* ===== Footer ===== */
    function footer() {
        const f = document.createElement('div');
        f.className = 'footer';
        f.innerHTML = `© ${new Date().getFullYear()} <a href="https://crxx.netlify.app" target="_blank" rel="noopener">Team CRX</a> • Powered by Nebula`;
        return f;
    }

    /* ===== Loading / Error ===== */
    function loading() {
        const l = document.createElement('div');
        l.className = 'loading';
        l.innerHTML = '<div class="spinner"></div><p>Initializing...</p>';
        return l;
    }
    function error(msg) {
        const e = document.createElement('div');
        e.className = 'error';
        e.innerHTML = `<p>⚠️ ${msg}</p><button class="retry-btn" onclick="location.reload()">RETRY</button>`;
        return e;
    }

    /* ===== Init ===== */
    async function init() {
        const stars = document.createElement('div');
        stars.className = 'stars';
        document.body.appendChild(stars);

        const container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);

        const loader = loading();
        container.appendChild(loader);

        try {
            const res = await fetch('./nebula.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            loader.remove();

            container.appendChild(channelHeader(data.siteInfo || {}));
            container.appendChild(techStage());

            if (data.supportedApps && data.supportedApps.length) {
                container.appendChild(appsSection(data.supportedApps));
            } else {
                container.appendChild(error('No apps found'));
            }
        } catch (err) {
            loader.remove();
            console.error(err);
            container.appendChild(error(err.message || 'Failed to load'));
        }

        container.appendChild(footer());
    }

    init();
})();