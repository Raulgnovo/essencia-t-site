/* ESSÊNCIA T — comportamento do site (sem dependências) */
(function () {
  "use strict";

  /* ---------- Menu móvel ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu-mobile");
  var header = document.querySelector(".site-header");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    if (header) header.classList.toggle("is-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Catálogo: busca, filtros e ordenação ---------- */
  var grid = document.getElementById("grade-produtos");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-product]"));
  var search = document.getElementById("busca-produto");
  var sortSel = document.getElementById("ordenar");
  var fragSel = document.getElementById("filtro-fragrancia");
  var pills = Array.prototype.slice.call(document.querySelectorAll("[data-filter-category]"));
  var count = document.getElementById("contagem");
  var empty = document.getElementById("sem-resultados");

  var state = { q: "", category: "all", fragrance: "", sort: "default" };

  function normalize(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  function apply(updateUrl) {
    var visible = cards.filter(function (card) {
      var okCat = state.category === "all" || card.dataset.category === state.category;
      var okQ = !state.q || card.dataset.name.indexOf(state.q) !== -1;
      var okFr = !state.fragrance || card.dataset.fragrance === state.fragrance;
      var show = okCat && okQ && okFr;
      card.hidden = !show;
      return show;
    });

    var sorted = visible.slice().sort(function (a, b) {
      var s = state.sort;
      if (s === "name-asc") return a.dataset.name.localeCompare(b.dataset.name, "pt-BR");
      if (s === "name-desc") return b.dataset.name.localeCompare(a.dataset.name, "pt-BR");
      if (s === "price-asc" || s === "price-desc") {
        var pa = a.dataset.price === "" ? Infinity : Number(a.dataset.price);
        var pb = b.dataset.price === "" ? Infinity : Number(b.dataset.price);
        if (pa === pb) return Number(a.dataset.index) - Number(b.dataset.index);
        return s === "price-asc" ? pa - pb : (pb === Infinity ? -1 : pb) - (pa === Infinity ? -1 : pa);
      }
      return Number(a.dataset.index) - Number(b.dataset.index);
    });
    sorted.forEach(function (card) {
      grid.appendChild(card);
    });

    pills.forEach(function (p) {
      var active = p.dataset.filterCategory === state.category;
      p.classList.toggle("is-active", active);
      p.setAttribute("aria-pressed", String(active));
    });

    if (count) {
      count.textContent =
        visible.length === 0
          ? ""
          : visible.length === 1
          ? "1 produto"
          : visible.length + " produtos";
    }
    if (empty) empty.hidden = visible.length !== 0;
    grid.hidden = visible.length === 0;

    if (updateUrl && window.history && window.history.replaceState) {
      var params = new URLSearchParams();
      if (state.category !== "all") params.set("categoria", state.category);
      if (state.q) params.set("busca", search.value.trim());
      var qs = params.toString();
      window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
    }
  }

  if (search)
    search.addEventListener("input", function () {
      state.q = normalize(search.value);
      apply(true);
    });
  if (sortSel)
    sortSel.addEventListener("change", function () {
      state.sort = sortSel.value;
      apply(false);
    });
  if (fragSel)
    fragSel.addEventListener("change", function () {
      state.fragrance = fragSel.value;
      apply(false);
    });
  pills.forEach(function (p) {
    p.addEventListener("click", function () {
      state.category = p.dataset.filterCategory;
      apply(true);
    });
  });

  // Estado inicial a partir da URL (?categoria=vela&busca=...)
  var params = new URLSearchParams(window.location.search);
  var cat = params.get("categoria");
  if (cat && pills.some(function (p) { return p.dataset.filterCategory === cat; })) state.category = cat;
  var q = params.get("busca");
  if (q && search) {
    search.value = q;
    state.q = normalize(q);
  }
  apply(false);
})();
