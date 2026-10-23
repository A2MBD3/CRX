/* Nebula lobby - Team CRX | HTML shell + data + red gaming HUD animation (styles in nebula.css) */
(function () {
"use strict";

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
