/**
 * acc-cards.js  —  LIGHTS EDITION
 * Spotlight cursor tracking, arrow navigation, drag-to-scroll, keyboard access.
 * Zero dependencies. No global scope pollution.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init () {
    const strip   = document.getElementById('accStrip');
    const btnPrev = document.getElementById('accPrev');
    const btnNext = document.getElementById('accNext');
    if (!strip) return;

    const cards = Array.from(strip.querySelectorAll('.acc-card'));

    // ── 1. Inject spotlight div into each card ──────────────────────
    cards.forEach(function (card) {
      var spot = document.createElement('div');
      spot.className = 'acc-card__spotlight';
      spot.setAttribute('aria-hidden', 'true');
      card.appendChild(spot);
    });

    // ── 2. Spotlight: follow cursor inside each card ─────────────────
    var rafId = null;

    function moveSpotlight (card, spot, e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      spot.style.left = x + 'px';
      spot.style.top  = y + 'px';
    }

    cards.forEach(function (card) {
      var spot = card.querySelector('.acc-card__spotlight');

      card.addEventListener('mousemove', function (e) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
          moveSpotlight(card, spot, e);
        });
      });

      card.addEventListener('mouseleave', function () {
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    // ── 3. Arrow navigation ──────────────────────────────────────────
    var SCROLL_AMT = 322;

    function scrollStrip (delta) {
      strip.scrollBy({ left: delta, behavior: 'smooth' });
    }

    if (btnPrev) btnPrev.addEventListener('click', function () { scrollStrip(-SCROLL_AMT); });
    if (btnNext) btnNext.addEventListener('click', function () { scrollStrip( SCROLL_AMT); });

    function updateArrows () {
      if (!btnPrev || !btnNext) return;
      var sl = strip.scrollLeft;
      var sw = strip.scrollWidth;
      var cw = strip.clientWidth;
      btnPrev.style.opacity = sl > 4 ? '1' : '0.3';
      btnNext.style.opacity = sl < sw - cw - 4 ? '1' : '0.3';
    }

    strip.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // ── 4. Drag-to-scroll ────────────────────────────────────────────
    var isDragging  = false;
    var startX      = 0;
    var scrollStart = 0;
    var dragMoved   = false;

    strip.addEventListener('mousedown', function (e) {
      if (e.target.closest('.acc-card__cta') || e.target.closest('.acc-arrow')) return;
      isDragging  = true;
      dragMoved   = false;
      startX      = e.clientX;
      scrollStart = strip.scrollLeft;
      strip.style.cursor = 'grabbing';
      strip.style.userSelect = 'none';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var delta = startX - e.clientX;
      if (Math.abs(delta) > 4) dragMoved = true;
      strip.scrollLeft = scrollStart + delta;
    });

    window.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      strip.style.cursor = '';
      strip.style.userSelect = '';
    });

    // ── 5. Card click (whole card is clickable unless dragging) ──────
    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (dragMoved) { dragMoved = false; return; }
        if (e.target.closest('.acc-card__cta')) return; // let the link handle it
        var href = card.dataset.href;
        if (href) window.location.href = href;
      });
    });

    // ── 6. Keyboard navigation ───────────────────────────────────────
    cards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var href = card.dataset.href;
          if (href) window.location.href = href;
        }
        if (e.key === 'ArrowRight') { e.preventDefault(); scrollStrip( SCROLL_AMT); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollStrip(-SCROLL_AMT); }
      });
    });

    // ── 7. Pause float animation when tab hidden ─────────────────────
    document.addEventListener('visibilitychange', function () {
      var floaters = strip.querySelectorAll('.acc-card__preview-img--float');
      var state = document.hidden ? 'paused' : 'running';
      floaters.forEach(function (el) {
        el.style.animationPlayState = state;
      });
    });
  }

})();