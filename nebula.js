(async function() {
    // Stars background
    function stars() {
        const c = document.createElement('div');
        c.className = 'stars';
        for (let i = 0; i < 120; i++) {
            const s = document.createElement('div');
            s.className = 'star';
            s.style.cssText = `
                width:${Math.random()*2+1}px;
                height:${Math.random()*2+1}px;
                left:${Math.random()*100}%;
                top:${Math.random()*100}%;
                --d:${Math.random()*3+2}s;
                --dl:${Math.random()*2}s;
            `;
            c.appendChild(s);
        }
        document.body.appendChild(c);
    }

    // Hero Section
    function hero() {
        const h = document.createElement('div');
        h.className = 'hero';
        h.innerHTML = `
            <h1 class="hero-title">Nebula</h1>
            <p class="hero-subtitle">by Team CRX</p>
            <div class="profiles">
                <div class="profile-frame">
                    <img class="profile-pic" src="https://i.ibb.co.com/Q7n4TgVN/Screenshot-2025-04-24-12-26-53-75-572064f74b5b9a6096a08806362cd216.jpg" alt="N" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2270%22 height=%2270%22><rect fill=%22%237c3aed%22 width=%2270%22 height=%2270%22 rx=%2235%22/><text fill=%22white%22 font-size=%2230%22 x=%2235%22 y=%2245%22 text-anchor=%22middle%22>N</text></svg>'">
                </div>
                <div class="spark-line"></div>
                <div class="profile-frame">
                    <img class="profile-pic" src="https://i.ibb.co.com/bjNQYmLr/Screenshot-2025-01-18-21-39-00-38-572064f74b5b9a6096a08806362cd216.jpg" alt="C" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2270%22 height=%2270%22><rect fill=%22%2306b6d4%22 width=%2270%22 height=%2270%22 rx=%2235%22/><text fill=%22white%22 font-size=%2230%22 x=%2235%22 y=%2245%22 text-anchor=%22middle%22>C</text></svg>'">
                </div>
            </div>
        `;
        return h;
    }

    // App Card
    function card(app) {
        const c = document.createElement('a');
        c.className = 'app-card';
        c.href = app.url || app.link || '#';
        c.target = '_blank';
        c.rel = 'noopener';
        
        const icon = app.icon || app.image || app.profile || `https://ui-avatars.com/api/?name=${app.name}&background=7c3aed&color=fff&size=84`;
        const desc = app.description || app.desc || '';
        const badge = app.status === 'active' ? '<span class="badge active">ACTIVE</span>' 
                    : app.status === 'beta' ? '<span class="badge beta">BETA</span>' : '';
        
        c.innerHTML = `
            <img class="app-icon" src="${icon}" alt="${app.name}" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=7c3aed&color=fff&size=84'">
            <div class="app-info">
                <div class="app-name">${app.name}${badge}</div>
                ${desc ? `<div class="app-desc">${desc}</div>` : ''}
            </div>
            <span class="arrow">→</span>
        `;
        
        return c;
    }

    // Apps Section
    function appsSection(apps) {
        const s = document.createElement('div');
        s.innerHTML = '<h2 class="section-title">✦ Supported Apps ✦</h2>';
        
        const list = document.createElement('div');
        list.className = 'apps-list';
        
        apps.forEach(app => list.appendChild(card(app)));
        s.appendChild(list);
        return s;
    }

    // Footer
    function footer() {
        const f = document.createElement('div');
        f.className = 'footer';
        f.textContent = `© ${new Date().getFullYear()} Nebula by Team CRX`;
        return f;
    }

    // Loading
    function loading() {
        const l = document.createElement('div');
        l.className = 'loading';
        l.innerHTML = '<div class="spinner"></div><p>Loading apps...</p>';
        return l;
    }

    // Error
    function error(msg) {
        const e = document.createElement('div');
        e.className = 'error';
        e.innerHTML = `<p>⚠️ ${msg}</p><button class="retry-btn" onclick="location.reload()">Retry</button>`;
        return e;
    }

    // Init
    async function init() {
        stars();
        
        const container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);
        
        container.appendChild(hero());
        
        const loader = loading();
        container.appendChild(loader);
        
        try {
            const res = await fetch('https://a2mbd3.github.io/CRX/nebula.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            
            const data = await res.json();
            loader.remove();
            
            // Extract apps array
            let apps = [];
            if (Array.isArray(data)) apps = data;
            else for (const k in data) if (Array.isArray(data[k])) { apps = data[k]; break; }
            
            if (!apps.length) throw new Error('No apps found');
            
            container.appendChild(appsSection(apps));
        } catch (err) {
            loader.remove();
            container.appendChild(error(err.message));
        }
        
        container.appendChild(footer());
    }

    init();
})();