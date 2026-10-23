/* Nebula lobby - Team CRX | single file: CSS + HTML shell + data + red gaming HUD animation */
(function () {
"use strict";

/* ================= CSS ================= */
var css = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{--bg:#070306;--in:#10060b;--rd:#ff2438;--rd2:#ff6a3c;--gr:#2dff9f;--tx:#f1e9ee;--mu:#9a7f88;--cut:14px}
html,body{background:var(--bg)}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--tx);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at 12% 0,rgba(255,36,56,.16),transparent 55%),radial-gradient(circle at 92% 100%,rgba(255,106,60,.1),transparent 55%)}
.wrap{position:relative;z-index:1;max-width:620px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px calc(env(safe-area-inset-bottom,0px) + 28px)}
.sk{position:relative;overflow:hidden;background:#1d0d14;border-radius:8px}
.sk::after{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,90,90,.13) 50%,transparent 70%);transform:translateX(-100%);animation:sh 1.3s infinite}
@keyframes sh{to{transform:translateX(100%)}}

/* cut-corner frame with a comet of light running around the edge */
.fr,.in{clip-path:polygon(0 0,calc(100% - var(--cut)) 0,100% var(--cut),100% 100%,var(--cut) 100%,0 calc(100% - var(--cut)))}
.fr{--d:3.4s;position:relative;overflow:hidden;padding:1.5px;background:rgba(255,36,56,.26);display:block;color:inherit;text-decoration:none}
.fr::before{content:"";position:absolute;left:50%;top:50%;width:160%;aspect-ratio:1;background:conic-gradient(from 0deg,transparent 0 58%,rgba(255,36,56,.2) 70%,#ff2438 90%,#ffe3e3 99.5%,transparent 100%);transform:translate(-50%,-50%) rotate(0);animation:orb var(--d) linear infinite;animation-delay:var(--dl,0s);will-change:transform}
@keyframes orb{to{transform:translate(-50%,-50%) rotate(360deg)}}
.in{position:relative;z-index:1;background:var(--in);display:flex;align-items:center;gap:12px;padding:12px 14px}
.hd{margin-bottom:14px}.hd .fr{--d:4.6s}
.logo{width:46px;height:46px;border-radius:50%;flex-shrink:0;object-fit:cover;border:2px solid rgba(255,36,56,.75);box-shadow:0 0 14px rgba(255,36,56,.45)}
.logo.sk{border:0}
.hi{flex:1;min-width:0}
.nm{font-size:1.02rem;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:1px;background:linear-gradient(100deg,#ffb0a8,var(--rd));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:4px}
.sub{display:flex;align-items:center;gap:6px;margin-top:3px;font-size:.66rem;letter-spacing:1.6px;color:var(--mu);text-transform:uppercase}
.dot{width:6px;height:6px;border-radius:50%;background:var(--gr);box-shadow:0 0 8px var(--gr);animation:bl 2s ease-in-out infinite}
@keyframes bl{50%{opacity:.25}}
.join{position:relative;overflow:hidden;flex-shrink:0;padding:10px 20px;font-weight:900;font-style:italic;font-size:.78rem;letter-spacing:1px;color:#fff;text-decoration:none;background:linear-gradient(135deg,var(--rd),#a80017);clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);transition:filter .2s,transform .15s}
.join::after{content:"";position:absolute;top:0;left:0;width:30%;height:100%;background:rgba(255,255,255,.4);transform:translateX(-200%) skewX(-20deg);animation:shine 3s infinite}
@keyframes shine{0%,55%{transform:translateX(-200%) skewX(-20deg)}100%{transform:translateX(500%) skewX(-20deg)}}
.join:active{transform:scale(.94);filter:brightness(1.3)}
.l1{height:14px;width:60%}.l2{height:9px;width:35%;margin-top:8px}.bt{width:76px;height:36px}

/* stage */
.stage{position:relative;height:clamp(230px,64vw,340px);margin-bottom:18px;touch-action:pan-y}
.stage .fr{position:absolute;inset:0;--d:7s}
.stage .in{width:100%;height:100%;display:block;padding:0;overflow:hidden;background:radial-gradient(circle at 50% 46%,#240810,#08030a 72%)}
#cv{position:absolute;inset:0;width:100%;height:100%;display:block}
.cn{position:absolute;width:16px;height:16px;border:0 solid var(--rd);opacity:.8}
.cn.a{top:10px;left:10px;border-width:2px 0 0 2px}.cn.b{top:10px;right:10px;border-width:2px 2px 0 0}
.cn.c{bottom:10px;left:10px;border-width:0 0 2px 2px}.cn.d{bottom:10px;right:10px;border-width:0 2px 2px 0}

.sec{display:flex;align-items:center;gap:10px;margin:0 0 12px;font-size:.72rem;font-weight:900;font-style:italic;letter-spacing:3.4px;color:var(--mu)}
.sec::before,.sec::after{content:"";height:2px;flex:1;background:linear-gradient(90deg,transparent,rgba(255,36,56,.8));transform:skewX(-30deg)}
.sec::after{transform:scaleX(-1) skewX(-30deg)}
.ls{display:flex;flex-direction:column;gap:10px}
.cd{transition:transform .15s,filter .2s}
.cd:hover{filter:brightness(1.2) saturate(1.2)}
.cd:hover::before{animation-duration:1.1s}
.cd:active{transform:scale(.975)}
.cd .in::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(var(--rd),var(--rd2))}
.ic{width:46px;height:46px;border-radius:12px;flex-shrink:0;object-fit:cover;border:1px solid rgba(255,36,56,.45)}
.ic.sk{border:0}
.ph{display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.1rem;color:#fff;background:linear-gradient(135deg,var(--rd),#7a0012)}
.ai{flex:1;min-width:0}
.an{font-size:.96rem;font-weight:800;font-style:italic;display:flex;align-items:center;flex-wrap:wrap;gap:7px}
.ad{font-size:.72rem;color:var(--mu);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.go{color:var(--mu);font-weight:900;transition:transform .2s,color .2s}
.cd:hover .go{color:var(--rd);transform:translateX(4px)}
.bd{font-size:.54rem;font-weight:900;font-style:normal;letter-spacing:1.1px;padding:2px 7px;border:1px solid}
.bd.active{color:var(--gr);border-color:rgba(45,255,159,.4);background:rgba(45,255,159,.1)}
.bd.beta{color:#ffb020;border-color:rgba(255,176,32,.4);background:rgba(255,176,32,.1)}
.bd.offline{color:#ff5470;border-color:rgba(255,84,112,.4);background:rgba(255,84,112,.1)}
.cd.off{opacity:.5;pointer-events:none}
.cd.pop{animation:pop .5s cubic-bezier(.2,.9,.3,1.2) both}
@keyframes pop{from{opacity:0;transform:translateX(-18px) scale(.97)}}
.er{padding:22px;text-align:center;color:#ff5470;font-size:.9rem}
.er button{display:block;margin:14px auto 0;padding:10px 26px;border:0;font-weight:900;letter-spacing:1px;color:#fff;background:linear-gradient(135deg,var(--rd),#a80017);clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);cursor:pointer}
.ft{text-align:center;margin-top:26px;font-size:.7rem;color:var(--mu)}
.ft a{color:#ff8f86;font-weight:800;text-decoration:none}
a:focus-visible,button:focus-visible{outline:2px solid var(--rd);outline-offset:2px}
@media(prefers-reduced-motion:reduce){.sk::after,.dot,.cd.pop,.fr::before,.join::after{animation:none}}
`;
var st = document.createElement("style");
st.textContent = css;
document.head.appendChild(st);

/* ================= SHELL (instant skeleton) ================= */
function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
var skCard = '<div class="fr"><div class="in"><div class="ic sk"></div><div class="ai"><div class="sk l1"></div><div class="sk l2" style="width:70%"></div></div></div></div>';
var wrap = el("div", "wrap");
wrap.innerHTML =
  '<header class="hd" id="hd"><div class="fr"><div class="in"><div class="logo sk"></div><div class="hi"><div class="sk l1"></div><div class="sk l2"></div></div><div class="sk bt"></div></div></div></header>' +
  '<section class="stage" aria-hidden="true"><div class="fr"><div class="in"><canvas id="cv"></canvas>' +
  '<i class="cn a"></i><i class="cn b"></i><i class="cn c"></i><i class="cn d"></i>' +
  '</div></div></section>' +
  '<h2 class="sec">SUPPORTED APPS</h2><main class="ls" id="ls">' + skCard + skCard + skCard + skCard + '</main><footer class="ft" id="ft"></footer>';
document.body.appendChild(wrap);
var $ = function (i) { return document.getElementById(i); };

/* ================= DATA + RENDER (cache first) ================= */
var KEY = "nebula_cache_v1", hd = $("hd"), ls = $("ls"), last = "";
function logo(src, name, cls) {
  var ph = function () { return el("div", cls + " ph", (name || "N").trim().charAt(0).toUpperCase()); };
  if (!src || !String(src).trim()) return ph();
  var i = new Image(); i.className = cls; i.alt = ""; i.decoding = "async"; i.src = src;
  i.onerror = function () { if (i.parentNode) i.parentNode.replaceChild(ph(), i); };
  return i;
}
function header(s) {
  var fr = el("div", "fr"), In = el("div", "in"), name = s.channelName || s.title || "Nebula";
  In.appendChild(logo(s.nebulaProfilePic, name, "logo"));
  var hi = el("div", "hi"); hi.appendChild(el("div", "nm", name));
  var sub = el("div", "sub"); sub.appendChild(el("span", "dot")); sub.appendChild(document.createTextNode(s.team || "Team CRX"));
  hi.appendChild(sub); In.appendChild(hi);
  var j = el("a", "join", "\u26A1 JOIN"); j.href = s.joinUrl || "#"; j.target = "_blank"; j.rel = "noopener";
  In.appendChild(j); fr.appendChild(In); hd.replaceChildren(fr);
}
function card(a, i) {
  var fr = el("a", "fr cd pop"), In = el("div", "in"), off = a.status === "offline";
  fr.style.animationDelay = (i * 55) + "ms";
  fr.style.setProperty("--dl", "-" + (i * 0.7).toFixed(2) + "s");
  fr.href = a.url || "#";
  if (off) fr.className += " off"; else { fr.target = "_blank"; fr.rel = "noopener"; }
  In.appendChild(logo(a.image, a.name, "ic"));
  var ai = el("div", "ai"), an = el("div", "an", a.name || "App");
  if (a.status === "active" || a.status === "beta" || off) an.appendChild(el("span", "bd " + a.status, a.status.toUpperCase()));
  ai.appendChild(an);
  if (a.description) ai.appendChild(el("div", "ad", a.description));
  In.appendChild(ai); In.appendChild(el("span", "go", "\u279C"));
  fr.appendChild(In); return fr;
}
function render(d) {
  header(d.siteInfo || {});
  var apps = d.supportedApps || [];
  if (!apps.length) { fail("No apps found"); return; }
  var f = document.createDocumentFragment();
  apps.forEach(function (a, i) { f.appendChild(card(a, i)); });
  ls.replaceChildren(f);
  var ft = $("ft"); ft.textContent = "\u00A9 " + new Date().getFullYear() + " ";
  var l = el("a", null, "Team CRX"); l.href = "https://crxx.netlify.app"; l.target = "_blank"; l.rel = "noopener";
  ft.appendChild(l); ft.appendChild(document.createTextNode(" \u2022 Powered by Nebula"));
}
function fail(m) {
  var e = el("div", "er", m), b = el("button", null, "RETRY");
  b.onclick = function () { location.reload(); }; e.appendChild(b); ls.replaceChildren(e);
}
try { var c = localStorage.getItem(KEY); if (c) { last = c; render(JSON.parse(c)); } } catch (e) {}
fetch("./nebula.json", { cache: "no-cache" }).then(function (r) {
  if (!r.ok) throw new Error("HTTP " + r.status); return r.text();
}).then(function (t) {
  if (t === last) return;
  var d = JSON.parse(t); render(d); last = t;
  try { localStorage.setItem(KEY, t); } catch (e) {}
}).catch(function (e) { if (!last) fail(e.message || "Failed to load"); });

/* ================= RED COMBAT HUD ANIMATION =================
   Hex-grid arena, spinning segmented rings, radar sweep that lights up
   enemy blips, target-lock brackets, a reactor core and rising embers.
   Tap the stage: shockwave + rings overdrive. */
var cv = $("cv"), ctx = cv.getContext("2d");
var W = 0, H = 0, CX = 0, CY = 0, R = 100, dpr = 1, base = null;
var TAU = Math.PI * 2, T = 0, run = false, prev = 0;
var a1 = 0, a2 = 0, a3 = 0, sa = 0, boost = 0, fl = 0;
var blips = [], sparks = [], shocks = [], lock = null, lt = 0;
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches;

function mkBlip() { return { a: Math.random() * TAU, r: .22 + Math.random() * .38, id: 1 + ((Math.random() * 98) | 0) }; }
function hexP(x, y, r, rot) {
  ctx.beginPath();
  for (var i = 0; i < 6; i++) { var a = rot + i * TAU / 6; i ? ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r) : ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
  ctx.closePath();
}
function paint() {
  base = document.createElement("canvas"); base.width = W * dpr; base.height = H * dpr;
  var b = base.getContext("2d"); b.setTransform(dpr, 0, 0, dpr, 0, 0);
  var s = 15, w = Math.sqrt(3) * s;
  b.strokeStyle = "rgba(255,50,60,.2)"; b.lineWidth = 1; b.beginPath();
  for (var r = -1; r * 1.5 * s < H + s; r++) for (var c = -1; c * w < W + w; c++) {
    var x = c * w + (r & 1 ? w / 2 : 0), y = r * 1.5 * s;
    for (var i = 0; i < 6; i++) { var a = Math.PI / 6 + i * TAU / 6, px = x + Math.cos(a) * s, py = y + Math.sin(a) * s; i ? b.lineTo(px, py) : b.moveTo(px, py); }
    b.closePath();
  }
  b.stroke();
  b.globalCompositeOperation = "destination-in";
  var g = b.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * .55);
  g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(.55, "rgba(0,0,0,.45)"); g.addColorStop(1, "rgba(0,0,0,0)");
  b.fillStyle = g; b.fillRect(0, 0, W, H);
}
function size() {
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  var r = cv.getBoundingClientRect(); W = r.width; H = r.height; if (!W) return;
  cv.width = W * dpr; cv.height = H * dpr; CX = W / 2; CY = H / 2; R = Math.min(W, H) * .44;
  if (!blips.length) { for (var i = 0; i < 7; i++) blips.push(mkBlip()); }
  if (!sparks.length) for (i = 0; i < 34; i++) sparks.push({ x: Math.random() * W, y: Math.random() * H, v: 14 + Math.random() * 30, s: 1 + Math.random() * 1.6, p: Math.random() * 6 });
  paint();
  if (!reduce && !run && !document.hidden) start();
}
function bracket(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x - s, y - s + 6); ctx.lineTo(x - s, y - s); ctx.lineTo(x - s + 6, y - s);
  ctx.moveTo(x + s - 6, y - s); ctx.lineTo(x + s, y - s); ctx.lineTo(x + s, y - s + 6);
  ctx.moveTo(x + s, y + s - 6); ctx.lineTo(x + s, y + s); ctx.lineTo(x + s - 6, y + s);
  ctx.moveTo(x - s + 6, y + s); ctx.lineTo(x - s, y + s); ctx.lineTo(x - s, y + s - 6);
  ctx.stroke();
}
function frame(now) {
  if (!run) return;
  var dt = Math.min((now - prev) / 1000, .05); prev = now; T += dt;
  boost = Math.max(0, boost - dt * 1.1);
  var sp = 1 + boost * 4;
  a1 += dt * .28 * sp; a2 -= dt * .18 * sp; a3 += dt * .9 * sp; sa += dt * 1.6 * (1 + boost * 1.5);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = "source-over"; ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.drawImage(base, 0, 0);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
  var i, k, a;

  /* embers */
  for (i = 0; i < sparks.length; i++) {
    var p = sparks[i]; p.y -= p.v * dt; p.x += Math.sin(T * 2 + p.p) * 8 * dt;
    if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
    ctx.fillStyle = "rgba(255," + (70 + ((p.p * 30) | 0)) + ",50," + (.25 + .5 * Math.abs(Math.sin(T * 3 + p.p))) + ")";
    ctx.fillRect(p.x, p.y, p.s, p.s);
  }

  /* outer segmented ring */
  ctx.strokeStyle = "rgba(255,36,56,.9)"; ctx.lineWidth = 3;
  for (i = 0; i < 3; i++) { a = a1 + i * TAU / 3; ctx.beginPath(); ctx.arc(CX, CY, R, a, a + TAU / 3 * .7); ctx.stroke(); }
  /* tick bezel */
  ctx.strokeStyle = "rgba(255,110,80,.55)"; ctx.lineWidth = 1; ctx.beginPath();
  for (i = 0; i < 72; i++) {
    a = a2 + i * TAU / 72; var l = i % 6 ? 4 : 9, r0 = R * .89;
    ctx.moveTo(CX + Math.cos(a) * r0, CY + Math.sin(a) * r0); ctx.lineTo(CX + Math.cos(a) * (r0 + l), CY + Math.sin(a) * (r0 + l));
  }
  ctx.stroke();
  /* dashed mid ring + charge arc */
  var rm = R * .74, dash = TAU * rm / 24;
  ctx.setLineDash([dash * .62, dash * .38]); ctx.lineDashOffset = -a3 * rm * .5;
  ctx.strokeStyle = "rgba(255,36,56,.38)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(CX, CY, rm, 0, TAU); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(255,120,90,.95)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(CX, CY, rm, -a3 * 1.3, -a3 * 1.3 + .8); ctx.stroke();

  /* radar: fan + sweep line */
  var rr = R * .62, s = ((sa % TAU) + TAU) % TAU;
  ctx.strokeStyle = "rgba(255,60,70,.22)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(CX, CY, rr, 0, TAU); ctx.moveTo(CX - rr, CY); ctx.lineTo(CX + rr, CY); ctx.moveTo(CX, CY - rr); ctx.lineTo(CX, CY + rr);
  ctx.moveTo(CX + rr * .5, CY); ctx.arc(CX, CY, rr * .5, 0, TAU); ctx.stroke();
  for (k = 0; k < 18; k++) {
    ctx.fillStyle = "rgba(255,36,56," + (.3 * Math.pow(1 - k / 18, 1.6)) + ")";
    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, rr, s - (k + 1) * .055, s - k * .055); ctx.closePath(); ctx.fill();
  }
  ctx.strokeStyle = "rgba(255,200,190,.95)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + Math.cos(s) * rr, CY + Math.sin(s) * rr); ctx.stroke();

  /* blips lit by the sweep */
  for (i = 0; i < blips.length; i++) {
    var bl = blips[i], d = ((s - bl.a) % TAU + TAU) % TAU, br = Math.max(0, 1 - d / 4.4);
    bl.x = CX + Math.cos(bl.a) * bl.r * R * 1.6; bl.y = CY + Math.sin(bl.a) * bl.r * R * 1.6;
    if (Math.hypot(bl.x - CX, bl.y - CY) > rr) { bl.x = CX + Math.cos(bl.a) * rr * .8; bl.y = CY + Math.sin(bl.a) * rr * .8; }
    ctx.fillStyle = "rgba(255,70,70," + (.15 + br * .85) + ")";
    ctx.save(); ctx.translate(bl.x, bl.y); ctx.rotate(Math.PI / 4); ctx.fillRect(-2.5, -2.5, 5, 5); ctx.restore();
    if (br > .85) { ctx.strokeStyle = "rgba(255,120,100,.6)"; ctx.beginPath(); ctx.arc(bl.x, bl.y, 4 + (1 - br) * 60, 0, TAU); ctx.stroke(); }
  }

  /* target lock */
  lt += dt;
  if (!lock && lt > 2.2) { lock = { b: blips[(Math.random() * blips.length) | 0], t: 0 }; }
  if (lock) {
    lock.t += dt; var q = Math.min(lock.t / .4, 1), bs = 30 - 17 * (1 - Math.pow(1 - q, 3)), bx = lock.b.x, by = lock.b.y;
    ctx.strokeStyle = lock.t > .4 && Math.sin(lock.t * 20) > 0 ? "#fff" : "#ff2438"; ctx.lineWidth = 1.6; bracket(bx, by, bs);
    ctx.font = "700 9px ui-monospace,Menlo,monospace"; ctx.fillStyle = "rgba(255,225,220,.95)";
    var tx = Math.min(bx + 16, W - 96), ty = Math.max(by - 12, 40);
    ctx.fillText("TGT-" + String(lock.b.id).padStart(2, "0") + " " + (80 + lock.b.id * 3) + "m", tx, ty);
    ctx.fillStyle = lock.t > .4 ? "rgba(255,60,60,.95)" : "rgba(255,160,150,.7)"; ctx.fillText(lock.t > .4 ? "LOCKED" : "ACQUIRING", tx, ty + 10);
    if (lock.t > 2) {
      shocks.push({ x: bx, y: by, t: 0, m: 46 }); fl = Math.max(fl, .12);
      Object.assign(lock.b, mkBlip()); lock = null; lt = 0;
    }
  }

  /* reactor core */
  var cp = 1 + .08 * Math.sin(T * 4) + boost * .25, g = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * .3 * cp);
  g.addColorStop(0, "rgba(255,230,220,.95)"); g.addColorStop(.25, "rgba(255,60,60,.6)"); g.addColorStop(1, "rgba(255,36,56,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, R * .3 * cp, 0, TAU); ctx.fill();
  ctx.strokeStyle = "rgba(255,70,70,.95)"; ctx.lineWidth = 2; hexP(CX, CY, R * .12 * cp, a1 * 2.2); ctx.stroke();
  ctx.strokeStyle = "rgba(255,170,150,.8)"; ctx.lineWidth = 1; hexP(CX, CY, R * .075 * cp, -a1 * 3); ctx.stroke();
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(CX, CY, 2.2, 0, TAU); ctx.fill();

  /* shockwaves */
  ctx.lineWidth = 1.8;
  for (i = shocks.length - 1; i >= 0; i--) {
    var w = shocks[i]; w.t += dt * 1.3;
    if (w.t >= 1) { shocks.splice(i, 1); continue; }
    ctx.strokeStyle = "rgba(255,70,60," + (1 - w.t) + ")"; ctx.beginPath(); ctx.arc(w.x, w.y, w.m * w.t, 0, TAU); ctx.stroke();
  }
  /* scanline + flash */
  ctx.fillStyle = "rgba(255,60,60,.07)"; ctx.fillRect(0, (T * 55) % (H + 40) - 20, W, 2);
  if (fl > 0) { ctx.fillStyle = "rgba(255,36,56," + fl * .5 + ")"; ctx.fillRect(0, 0, W, H); fl -= dt * 1.8; }

  requestAnimationFrame(frame);
}
function start() { if (run || !W) return; run = true; prev = performance.now(); requestAnimationFrame(frame); }
function stop() { run = false; }

size();
cv.parentNode.addEventListener("pointerdown", function () {
  shocks.push({ x: CX, y: CY, t: 0, m: R * 1.15 }); boost = 1; fl = .35;
});
if (window.ResizeObserver) new ResizeObserver(function () { size(); }).observe(cv.parentNode); else window.addEventListener("resize", size);
document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
if (reduce) {
  run = true; prev = performance.now(); frame(prev + 16); run = false;
} else start();
})();
