/* =====================================================
   app.js — Mapa de Reciclaje y Donación
   ===================================================== */

// ── Data ──────────────────────────────────────────────
const POINTS = [

  {
    id: 1,
    name: "Best Metals",
    type: "reciclaje",
    address: "David, Chiriquí",
    distance: 0.5,
    lat: 8.4331,
    lng: -82.4308,
    materials: ["metal", "plasticos"],
    materialIcons: ["🥫", "🧴"],
  },

  {
    id: 2,
    name: "Reciclaje Joselyne",
    type: "reciclaje",
    address: "David, Chiriquí",
    distance: 1.0,
    lat: 8.4295,
    lng: -82.4317,
    materials: ["plasticos", "papel", "vidrio"],
    materialIcons: ["🧴", "📄", "🍾"],
  },

  {
    id: 3,
    name: "Recimetal Chiriqui",
    type: "acopio",
    address: "David, Chiriquí",
    distance: 1.5,
    lat: 8.4279,
    lng: -82.4330,
    materials: ["metal", "electronicos"],
    materialIcons: ["🥫", "💻"],
  },

  {
    id: 4,
    name: "Boquete Recycling",
    type: "reciclaje",
    address: "Boquete, Chiriquí",
    distance: 2.3,
    lat: 8.7801,
    lng: -82.4332,
    materials: ["plasticos", "papel", "vidrio"],
    materialIcons: ["🧴", "📄", "🍾"],
  },

  {
    id: 5,
    name: "Tierras Altas Recicla",
    type: "reciclaje",
    address: "Volcán, Chiriquí",
    distance: 3.1,
    lat: 8.7724,
    lng: -82.6388,
    materials: ["plasticos", "papel", "metal"],
    materialIcons: ["🧴", "📄", "🥫"],
  },

  {
    id: 6,
    name: "Recicla Panama",
    type: "reciclaje",
    address: "Pacora, Panamá",
    distance: 4.5,
    lat: 9.1038,
    lng: -79.2901,
    materials: ["electronicos", "plasticos"],
    materialIcons: ["💻", "🧴"],
  },

  {
    id: 7,
    name: "Grun Panama",
    type: "reciclaje",
    address: "Juan Díaz, Panamá",
    distance: 5.2,
    lat: 9.0469,
    lng: -79.4499,
    materials: ["plasticos", "papel", "vidrio", "metal"],
    materialIcons: ["🧴", "📄", "🍾", "🥫"],
  },

  {
    id: 8,
    name: "ECOSPOT – LEAFSINC",
    type: "reciclaje",
    address: "Multiplaza, Panamá",
    distance: 5.9,
    lat: 8.9826,
    lng: -79.5197,
    materials: ["plasticos", "papel", "vidrio"],
    materialIcons: ["🧴", "📄", "🍾"],
  },

  {
    id: 9,
    name: "Cruz Roja Panameña",
    type: "donacion",
    address: "Ciudad de Panamá",
    distance: 6.3,
    lat: 8.9935,
    lng: -79.5190,
    materials: ["ropa"],
    materialIcons: ["👕"],
  },

  {
    id: 10,
    name: "Casa Esperanza",
    type: "donacion",
    address: "Ciudad de Panamá",
    distance: 6.8,
    lat: 8.9981,
    lng: -79.5142,
    materials: ["ropa", "electronicos"],
    materialIcons: ["👕", "💻"],
  },

  {
    id: 11,
    name: "Banco De Alimentos Panamá",
    type: "donacion",
    address: "Ciudad de Panamá",
    distance: 7.1,
    lat: 9.0201,
    lng: -79.4820,
    materials: ["organicos"],
    materialIcons: ["🌿"],
  },

  {
    id: 12,
    name: "Recicladora Panama Oeste",
    type: "acopio",
    address: "Burunga, Panamá Oeste",
    distance: 8.4,
    lat: 8.9512,
    lng: -79.6803,
    materials: ["metal", "plasticos"],
    materialIcons: ["🥫", "🧴"],
  }

];

const FACTS = {
  es: [
    "Reciclar 1 botella de plástico ahorra suficiente energía para iluminar una bombilla por 6 horas.",
    "El papel reciclado usa un 70% menos de energía que el papel fabricado desde cero.",
    "Reciclar una lata de aluminio ahorra energía suficiente para ver TV durante 3 horas.",
    "El vidrio puede reciclarse indefinidamente sin perder calidad ni pureza.",
    "Compostar restos orgánicos reduce hasta un 30% los residuos domésticos enviados a vertederos.",
  ],
  en: [
    "Recycling 1 plastic bottle saves enough energy to power a light bulb for 6 hours.",
    "Recycled paper uses 70% less energy than paper made from scratch.",
    "Recycling one aluminum can saves enough energy to watch TV for 3 hours.",
    "Glass can be recycled indefinitely without losing quality or purity.",
    "Composting organic waste can reduce household garbage sent to landfills by up to 30%.",
  ]
};

function getCurrentFacts() {
  var lang = localStorage.getItem("reco-lang") || "es";
  return FACTS[lang] || FACTS.es;
}

// ── Map markers setup ─────────────────────────────────
const ICON_HTML = {
  reciclaje: `<div style="background:#2d8c4e;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.25)"><img src="img/reciclaje.png" style="transform:rotate(45deg);width:35px;height:35px;object-fit:contain;filter:brightness(0) invert(1)" alt="reciclaje"></div>`,
  donacion:  `<div style="background:#d63a3a;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.25)"><img src="img/corazon.png" style="transform:rotate(45deg);width:35px;height:35px;object-fit:contain" alt="corazon"></div>`,
  acopio:    `<div style="background:#5a8c5a;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 3px 10px rgba(0,0,0,.25)"><img src="img/manos v2.png" style="transform:rotate(45deg);width:35px;height:35px;object-fit:contain" alt="manos"></div>`,
};

function makeIcon(type) {
  return L.divIcon({
    className: "",
    html: ICON_HTML[type] || ICON_HTML.reciclaje,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

// ── State ─────────────────────────────────────────────
let activeFilter = "todos";
let markers = [];
let map;

// ── Init ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderResults(POINTS);
  initFilters();
  initTooltip();
  initModal();
  initSearch();
  cycleFacts();
});

// ── Map ───────────────────────────────────────────────
function initMap() {

  map = L.map("map", {
    center: [9.3592, -79.9014],
    zoom: 13,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
  }).addTo(map);

  // Obtener ubicación REAL
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Centrar mapa
        map.setView([lat, lng], 15);

        // Círculo
        L.circle([lat, lng], {
          radius: 1500,
          color: "#2d8c4e",
          fillColor: "#a8dab5",
          fillOpacity: 0.18,
          weight: 1.5,
          dashArray: "6 4",
        }).addTo(map);

        // Marcador usuario
        L.circleMarker([lat, lng], {
          radius: 8,
          color: "#fff",
          fillColor: "#1a5c2a",
          fillOpacity: 1,
          weight: 3,
        })
        .addTo(map)
        .bindTooltip("Tu ubicación", {
          permanent: false,
          direction: "top"
        });

      },

      () => {
        console.log("No se pudo obtener ubicación");
      }

    );

  }

  addMarkers(POINTS);
}

function addMarkers(points) {
  // Remove old
  markers.forEach((m) => map.removeLayer(m));
  markers = [];

  points.forEach((p) => {
    const m = L.marker([p.lat, p.lng], { icon: makeIcon(p.type) })
      .addTo(map)
      .bindPopup(buildPopup(p), { maxWidth: 220 });

    m.on("click", () => highlightResult(p.id));
    markers.push(m);
  });
}

function buildPopup(p) {
  const tagClass = p.type === "reciclaje" ? "reciclaje" : p.type === "donacion" ? "donacion" : "acopio";
  const tagLabel = p.type.charAt(0).toUpperCase() + p.type.slice(1);
  return `
    <div style="font-family:'DM Sans',sans-serif;min-width:170px">
      <div style="display:flex;align-items:center;gap:.4rem;margin-bottom:.3rem">
        <strong style="font-size:.9rem;color:#1a5c2a">${p.name}</strong>
        <span style="font-size:.62rem;background:${tagClass === "reciclaje" ? "#ddf0e3;color:#1a5c2a" : tagClass === "donacion" ? "#dbeeff;color:#1a5a90" : "#ede8f8;color:#5a3a9a"};padding:.12rem .4rem;border-radius:999px;font-weight:700;text-transform:uppercase">${tagLabel}</span>
      </div>
      <p style="font-size:.74rem;color:#8aab90;margin:0 0 .4rem">${p.address}</p>
      <p style="font-size:.78rem;font-weight:700;color:#2d8c4e;margin:0">${p.distance} km</p>
      <div style="margin-top:.4rem;display:flex;gap:.2rem;flex-wrap:wrap">
        ${p.materialIcons.map((ic) => `<span style="font-size:.9rem">${ic}</span>`).join("")}
      </div>
    </div>
  `;
}

// ── Results List ──────────────────────────────────────
function renderResults(points) {
  const list = document.getElementById("resultsList");
  const count = document.getElementById("resultCount");
  count.textContent = points.length;

  list.innerHTML = "";

  if (!points.length) {
    list.innerHTML = `<li style="padding:1.5rem 1.1rem;text-align:center;color:var(--text-light);font-size:.85rem">Sin resultados para este filtro.</li>`;
    return;
  }

  points.forEach((p) => {
    const typeLabel =
      p.type === "reciclaje" ? "Reciclaje" : p.type === "donacion" ? "Donación" : "Acopio";
    const iconEmoji = p.type === "reciclaje"
      ? `<img src="img/reciclaje.png" style="width:35px;height:35px;object-fit:contain;filter:brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(500%) hue-rotate(90deg)" alt="reciclaje">`
      : p.type === "donacion"
      ? `<img src="img/corazon.png" style="width:50px;height:50px;object-fit:contain" alt="corazon">`
      : `<img src="img/manos v2.png" style="width:35px;height:35px;object-fit:contain" alt="manos">`;

    const li = document.createElement("li");
    li.className = "result-item";
    li.dataset.id = p.id;
    li.innerHTML = `
      <div class="result-icon ${p.type}">${iconEmoji}</div>
      <div class="result-body">
        <div class="result-name-row">
          <span class="result-name">${p.name}</span>
          <span class="type-tag ${p.type === "donacion" ? "donacion" : p.type === "acopio" ? "acopio" : "reciclaje"}">${typeLabel}</span>
        </div>
        <p class="result-address">${p.address}</p>
        <div class="result-materials">
          ${p.materialIcons.map((ic) => `<span class="material-icon">${ic}</span>`).join("")}
        </div>
      </div>
      <div class="result-distance">${p.distance} km</div>
    `;
    li.addEventListener("click", () => {
      map.setView([p.lat, p.lng], 16, { animate: true });
      markers.forEach((m) => {
        const pos = m.getLatLng();
        if (Math.abs(pos.lat - p.lat) < 0.001 && Math.abs(pos.lng - p.lng) < 0.001) {
          m.openPopup();
        }
      });
      li.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    list.appendChild(li);
  });
}

function highlightResult(id) {
  document.querySelectorAll(".result-item").forEach((el) => {
    el.style.background = el.dataset.id == id ? "var(--green-pale)" : "";
  });
  const target = document.querySelector(`.result-item[data-id="${id}"]`);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── Filters ───────────────────────────────────────────
function initFilters() {
  document.getElementById("filterChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    activeFilter = chip.dataset.filter;
    applyFilter();
  });
}

function applyFilter() {
  let filtered = POINTS;

  if (activeFilter !== "todos") {
    filtered = POINTS.filter((p) => p.materials.includes(activeFilter));
  }

  renderResults(filtered);
  addMarkers(filtered);
}

// ── Search ────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { applyFilter(); return; }

    const filtered = POINTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.type.includes(q)
    );
    renderResults(filtered);
    addMarkers(filtered);
  });

  // Locate button
  document.querySelector(".locate-btn").addEventListener("click", () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 15, { animate: true });
      },
      () => alert("No se pudo obtener tu ubicación.")
    );
  });
}

// ── Tooltip / Facts ───────────────────────────────────
function initTooltip() {
  document.getElementById("tooltipClose").addEventListener("click", () => {
    document.getElementById("mapTooltip").classList.add("hidden");
  });
}

function cycleFacts() {
  let idx = 0;
  const factEl = document.getElementById("tooltipFact");
  factEl.textContent = getCurrentFacts()[idx];

  setInterval(() => {
    const facts = getCurrentFacts();
    idx = (idx + 1) % facts.length;
    const tooltip = document.getElementById("mapTooltip");
    if (!tooltip.classList.contains("hidden")) {
      factEl.style.opacity = 0;
      setTimeout(() => {
        factEl.textContent = facts[idx];
        factEl.style.transition = "opacity .4s";
        factEl.style.opacity = 1;
      }, 250);
    }
  }, 8000);
}

// ── Modal ─────────────────────────────────────────────
function initModal() {
  const overlay = document.getElementById("modalOverlay");

  document.getElementById("suggestBtn").addEventListener("click", () => {
    overlay.classList.add("open");
  });

  document.getElementById("modalClose").addEventListener("click", () => {
    overlay.classList.remove("open");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });

  document.querySelector(".modal-submit").addEventListener("click", () => {
    overlay.classList.remove("open");
    showToast("¡Gracias! Tu sugerencia fue enviada 🌱");
  });

  // See all button (just a demo toast)
  document.getElementById("seeAllBtn").addEventListener("click", () => {
    showToast("Mostrando todos los puntos disponibles.");
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    document.querySelector(".chip[data-filter='todos']").classList.add("active");
    activeFilter = "todos";
    renderResults(POINTS);
    addMarkers(POINTS);
  });
}

// ── Toast ─────────────────────────────────────────────
function showToast(msg) {
  const old = document.getElementById("toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1a5c2a",
    color: "#fff",
    padding: ".65rem 1.4rem",
    borderRadius: "999px",
    fontFamily: "'DM Sans',sans-serif",
    fontSize: ".85rem",
    fontWeight: "600",
    boxShadow: "0 4px 20px rgba(0,0,0,.2)",
    zIndex: "2000",
    opacity: "0",
    transition: "opacity .3s",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = "1"; });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}