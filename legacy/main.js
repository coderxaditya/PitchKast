/* ============================================================
   agenciy® — scroll-linked frame scrubber
   ------------------------------------------------------------
   The handshake is not a <video>: it is a decoded image sequence
   painted to a canvas. Scroll position maps linearly to a frame
   index, and a critically-damped follower eases the head toward
   that index every rAF — so forward and reverse scrubbing are
   equally precise, and nothing ever plays on its own.
   ============================================================ */

(() => {
  'use strict';

  // ── Config ────────────────────────────────────────────────
  const FRAME_COUNT   = 240;                     // 10s @ 24fps
  const FRAME_PATH    = i => `assets/frames/frame_${String(i).padStart(4, '0')}.jpg`;
  const SRC_W         = 1280;
  const SRC_H         = 720;
  const SRC_RATIO     = SRC_H / SRC_W;

  const DAMPING       = 0.155;   // follower stiffness (higher = tighter to scroll)
  const SNAP_EPSILON  = 0.015;   // when to consider the follower settled
  const MIN_STAGE_H   = 0.58;    // min share of viewport height the footage may occupy

  const HERO_FADE_IN  = 0.045;   // scroll progress where the hero starts receding
  const HERO_FADE_OUT = 0.30;    // …and where it is fully gone
  const OUTRO_IN      = 0.80;
  const OUTRO_FULL    = 0.93;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Elements ──────────────────────────────────────────────
  const canvas     = document.getElementById('film');
  const ctx        = canvas.getContext('2d', { alpha: false });
  const root       = document.documentElement;
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct  = document.getElementById('loaderPct');
  const railFill   = document.getElementById('railFill');
  const cue        = document.getElementById('cue');

  document.body.classList.add('is-loading');

  // ── State ─────────────────────────────────────────────────
  const frames   = new Array(FRAME_COUNT);
  let head       = 0;     // smoothed frame position
  let target     = 0;     // scroll-derived frame position
  let painted    = '';    // cache key of the last frame actually drawn
  let progress   = 0;     // 0 → 1
  let running    = false;
  let vw = 0, vh = 0, dpr = 1;

  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const norm  = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
  // gentle ease used for the copy, never for the footage itself
  const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // ── Layout ────────────────────────────────────────────────
  function resize() {
    vw  = window.innerWidth;
    vh  = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width  = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    canvas.style.width  = vw + 'px';
    canvas.style.height = vh + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    painted = '';          // force a repaint at the new size
    draw(Math.round(head));
  }

  /* Fit the footage to the full viewport width so the hands always
     enter from the true left and right edges. Only on unusually tall
     (portrait) viewports do we scale up and let the sides crop, so the
     handshake never shrinks into a stamp. */
  function frameRect() {
    let w = vw;
    let h = w * SRC_RATIO;

    if (h < vh * MIN_STAGE_H) {
      h = vh * MIN_STAGE_H;
      w = h / SRC_RATIO;
    }
    return { x: (vw - w) / 2, y: (vh - h) / 2, w, h };
  }

  // ── Paint ─────────────────────────────────────────────────
  function draw(index) {
    // A hair of extra black at the very top of the scroll, so the page
    // opens on a true #000000 field — navbar and headline only.
    const fade = norm(progress, 0, 0.014);
    const key  = index + ':' + fade.toFixed(3);
    if (key === painted) return;

    const img = frames[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const { x, y, w, h } = frameRect();

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, vw, vh);

    if (fade > 0) {
      ctx.globalAlpha = fade;
      ctx.drawImage(img, x, y, w, h);
      ctx.globalAlpha = 1;
    }
    painted = key;
  }

  // ── Scroll → frame ────────────────────────────────────────
  function readScroll() {
    const scrollable = document.documentElement.scrollHeight - vh;
    progress = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
    target   = progress * (FRAME_COUNT - 1);

    updateChrome();
    start();
  }

  // Copy + UI states are driven from the same progress value, so the
  // typography and the footage never drift apart.
  function updateChrome() {
    const fade  = easeInOut(norm(progress, HERO_FADE_IN, HERO_FADE_OUT));
    const outro = norm(progress, OUTRO_IN, OUTRO_FULL);

    root.style.setProperty('--heroFade', (1 - fade).toFixed(4));
    root.style.setProperty('--heroY',    (-72 * fade).toFixed(2) + 'px');
    root.style.setProperty('--heroBlur', reduceMotion ? '0px' : (7 * fade).toFixed(2) + 'px');
    root.style.setProperty('--outro',    outro.toFixed(4));
    root.style.setProperty('--scrim',    norm(progress, 0.10, 0.42).toFixed(4));

    railFill.style.height = (progress * 100).toFixed(2) + '%';
    cue.classList.toggle('is-hidden', progress > 0.012);
  }

  // ── Follower loop ─────────────────────────────────────────
  function tick() {
    const delta = target - head;

    if (Math.abs(delta) < SNAP_EPSILON) {
      head = target;
      draw(Math.round(head));
      running = false;
      return;                         // idle until the next scroll event
    }

    head += delta * (reduceMotion ? 1 : DAMPING);
    draw(Math.round(head));
    requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  }

  // ── Preload ───────────────────────────────────────────────
  function preload() {
    return new Promise(resolve => {
      let loaded = 0;
      let cursor = 0;
      const CONCURRENCY = 12;

      const bump = () => {
        loaded++;
        const pct = Math.round((loaded / FRAME_COUNT) * 100);
        loaderFill.style.width = pct + '%';
        loaderPct.textContent  = pct;

        if (loaded === 1) draw(0);            // first black frame, ready behind the loader
        if (loaded === FRAME_COUNT) resolve();
        else next();
      };

      const next = () => {
        if (cursor >= FRAME_COUNT) return;
        const i = cursor++;
        const img = new Image();
        img.decoding = 'async';
        img.onload  = bump;
        img.onerror = bump;                   // a dropped frame must not stall the page
        img.src = FRAME_PATH(i);
        frames[i] = img;
      };

      for (let i = 0; i < CONCURRENCY; i++) next();
    });
  }

  // ── Boot ──────────────────────────────────────────────────
  function reveal() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    loader.classList.add('is-done');
    setTimeout(() => loader.remove(), 1100);

    resize();
    readScroll();
  }

  // Always open on the first (black) frame — no restored scroll offset,
  // no autoplay, nothing but the navbar and the headline.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  resize();

  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', () => { resize(); readScroll(); });
  window.addEventListener('orientationchange', () => setTimeout(() => { resize(); readScroll(); }, 120));

  preload().then(() => {
    window.scrollTo(0, 0);
    head = target = 0;
    reveal();
  });
})();
