/**
 * mapa-effects.js — Luces, partículas y reveal-on-scroll para mapa.html
 * Mismo lenguaje visual que index.js, pero sin tocar #map, .leaflet-*
 * ni .results-list (esos los maneja app.js y se regeneran al filtrar).
 */

(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {

    /* ── SCROLL PROGRESS BAR ── */
    if (!document.getElementById('reco-progress-mapa')) {
      var bar = document.createElement('div');
      bar.id = 'reco-progress-mapa';
      document.body.prepend(bar);
      window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
      }, { passive: true });
    }

    /* ── PARTÍCULAS SUAVES en la barra de búsqueda/filtros ── */
    function addLights(sectionSel, wrapClass, count) {
      var section = document.querySelector(sectionSel);
      if (!section) return;
      if (section.querySelector('.' + wrapClass)) return; // evita duplicados
      var wrap = document.createElement('div');
      wrap.className = wrapClass;
      section.prepend(wrap);
      for (var i = 0; i < count; i++) {
        var dot = document.createElement('div');
        dot.className = 'light-dot';
        var size = 3 + Math.random() * 6;
        var x = Math.random() * 100;
        var y = Math.random() * 100;
        var dur = 6 + Math.random() * 8;
        var delay = Math.random() * -dur;
        var opacity = 0.12 + Math.random() * 0.30;
        dot.style.cssText =
          'left:' + x + '%;' +
          'top:' + y + '%;' +
          'width:' + size + 'px;' +
          'height:' + size + 'px;' +
          'opacity:' + opacity + ';' +
          'animation-duration:' + dur + 's;' +
          'animation-delay:' + delay + 's;';
        wrap.appendChild(dot);
      }
    }
    addLights('.controls', 'mapa-lights', 10);
    addLights('.footer-cta', 'mapa-lights', 6);
    addLights('.footer', 'mapa-lights', 14);

    /* ── REVEAL ON SCROLL (solo contenedores estáticos, nunca #map ni .result-item) ── */
    var revealTargets = ['.sidebar', '.footer-cta', '.footer'];

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12 });

      revealTargets.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) observer.observe(el);
      });
    } else {
      // Fallback sin IntersectionObserver: mostrar todo directamente
      revealTargets.forEach(function (sel) {
        var el = document.querySelector(sel);
        if (el) el.classList.add('is-visible');
      });
    }

  });
})();