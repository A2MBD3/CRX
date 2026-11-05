(() => {
  const URL_TO = 'https://shop.crxmod.top/';
  const TOTAL = 5; // seconds
  const counter = document.getElementById('countdown');
  const fill = document.getElementById('fill');
  const cancel = document.getElementById('cancel');
  let stopped = false, start = performance.now();

  function tick(now) {
    if (stopped) return;
    const t = (now - start) / 1000;
    fill.style.width = Math.min(t / TOTAL, 1) * 100 + '%';
    counter.textContent = Math.max(Math.ceil(TOTAL - t), 0);
    if (t >= TOTAL) return window.location.replace(URL_TO);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  cancel.addEventListener('click', () => {
    stopped = true;
    cancel.hidden = true;
    counter.parentElement.textContent = 'Redirect cancelled';
  });

  // sakura petals
  const c = document.getElementById('petals'), ctx = c.getContext('2d');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let W, H, dpr = Math.min(devicePixelRatio || 1, 2);
  const resize = () => { W = innerWidth; H = innerHeight; c.width = W*dpr; c.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
  resize(); addEventListener('resize', resize);
  const N = innerWidth < 600 ? 22 : 40;
  const mk = (top) => ({
    x: Math.random()*W, y: top ? -20 : Math.random()*H,
    s: 5 + Math.random()*9, vy: .5 + Math.random()*1.1, vx: -.3 + Math.random()*.8,
    r: Math.random()*6.28, vr: (Math.random()-.5)*.04, sw: Math.random()*6.28,
    a: .45 + Math.random()*.45
  });
  const ps = Array.from({length: N}, () => mk(false));
  function draw() {
    ctx.clearRect(0,0,W,H);
    for (const p of ps) {
      p.sw += .02; p.x += p.vx + Math.sin(p.sw)*.5; p.y += p.vy; p.r += p.vr;
      if (p.y > H+20 || p.x > W+30 || p.x < -30) Object.assign(p, mk(true));
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a;
      ctx.fillStyle = '#ffb7e6'; ctx.shadowColor = '#ff3edc'; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.ellipse(0,0,p.s,p.s*.55,0,0,6.28); ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
