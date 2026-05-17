/* ===== Estrellas decorativas ===== */
const starsContainer = document.getElementById("stars");
if (starsContainer) {
  const STAR_COUNT = 70;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2.5 + 0.5;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDelay = Math.random() * 3 + "s";
    s.style.animationDuration = (Math.random() * 3 + 2) + "s";
    starsContainer.appendChild(s);
  }
}

/* ===== Menú móvil ===== */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("active"));
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("active"));
  });
}

/* ===== Lightbox del index (solo si existe) ===== */
const lightbox        = document.getElementById("lightbox");
const lightboxImg     = document.getElementById("lightbox-img");
const lightboxTitle   = document.getElementById("lightbox-title");
const lightboxPrice   = document.getElementById("lightbox-price");
const lightboxWhatsapp= document.getElementById("lightbox-whatsapp");
const lightboxEmail   = document.getElementById("lightbox-email");
const closeBtn        = document.querySelector(".lightbox-close");

function buildWhatsappUrl(titulo, precio) {
  return `https://wa.me/34621355638?text=${encodeURIComponent(`Hola Lady Aura ✨ Quiero pre-reservar: ${titulo}. Diamond painting 60x90, ${precio}€. ¡Gracias!`)}`;
}
function buildEmailUrl(titulo, precio) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=lady.aura.2025@gmail.com&su=${encodeURIComponent(`Pre-reserva Lady Aura - ${titulo}`)}&body=${encodeURIComponent(`Hola Lady Aura, me interesa pre-reservar: ${titulo}. 60x90, ${precio}€.\n\nNombre:\nEmail:\n\n¡Gracias! ✨`)}`;
}

if (lightbox && lightboxImg && closeBtn) {
  document.querySelectorAll(".product-card").forEach(card => {
    const opener = card.querySelector(".image-open");
    if (!opener) return;
    const img   = card.querySelector("img");
    const title = card.querySelector("h3")?.textContent || "Diseño Lady Aura";
    const price = card.dataset.price || "79";
    const oldPrice = card.dataset.oldPrice;
    opener.addEventListener("click", () => {
      try {
        lightboxImg.src = img.src; lightboxImg.alt = img.alt;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxPrice) lightboxPrice.innerHTML = oldPrice
          ? `Diamond painting 60×90 cm · <span style="text-decoration:line-through;opacity:0.6">${oldPrice} €</span> <strong>${price} €</strong> · Envío incluido`
          : `Diamond painting 60×90 cm · Envío incluido`;
        if (lightboxWhatsapp) lightboxWhatsapp.href = buildWhatsappUrl(title, price);
        if (lightboxEmail)    lightboxEmail.href    = buildEmailUrl(title, price);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden","false");
        document.body.style.overflow = "hidden";
      } catch(e){ console.error(e); }
    });
  });

  document.querySelectorAll(".zodiac-card").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      try {
        const titulo = card.dataset.title || card.querySelector("span")?.textContent || "Diseño Lady Aura";
        const imgSrc = card.dataset.img || card.querySelector("img")?.src || "";
        if (!imgSrc) return;
        lightboxImg.src = imgSrc; lightboxImg.alt = titulo;
        if (lightboxTitle) lightboxTitle.textContent = titulo;
        if (lightboxPrice) lightboxPrice.textContent = "Diamond painting 60×90 cm · Envío incluido";
        if (lightboxWhatsapp) lightboxWhatsapp.href = buildWhatsappUrl(titulo,"79");
        if (lightboxEmail)    lightboxEmail.href    = buildEmailUrl(titulo,"79");
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden","false");
        document.body.style.overflow = "hidden";
      } catch(e){ console.error(e); }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden","true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  };
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key==="Escape" && lightbox.classList.contains("active")) closeLightbox(); });
}

/* ── PAGINACIÓN ── */
(function(){
  const ITEMS_PER_PAGE = 10;
  const grid = null;
  if (!grid) return;
  const allCards = Array.from(grid.children);
  if (allCards.length <= ITEMS_PER_PAGE) return;
  const totalPages = Math.ceil(allCards.length / ITEMS_PER_PAGE);
  let currentPage = 1;
  function showPage(page) {
    currentPage = page;
    allCards.forEach((card,i) => {
      card.style.display = (i>=(page-1)*ITEMS_PER_PAGE && i<page*ITEMS_PER_PAGE) ? '' : 'none';
    });
    renderPagination();
    window.scrollTo({top: grid.offsetTop-100, behavior:'smooth'});
  }
  function renderPagination() {
    let pag = document.querySelector('.pagination');
    if (!pag) { pag=document.createElement('div'); pag.className='pagination'; grid.parentNode.insertBefore(pag,grid.nextSibling); }
    pag.innerHTML='';
    const prev=document.createElement('button'); prev.className='page-btn'+(currentPage===1?' disabled':''); prev.textContent='←'; prev.onclick=()=>{ if(currentPage>1)showPage(currentPage-1); }; pag.appendChild(prev);
    for(let i=1;i<=totalPages;i++){ const btn=document.createElement('button'); btn.className='page-btn'+(i===currentPage?' active':''); btn.textContent=i; btn.onclick=()=>showPage(i); pag.appendChild(btn); }
    const next=document.createElement('button'); next.className='page-btn'+(currentPage===totalPages?' disabled':''); next.textContent='→'; next.onclick=()=>{ if(currentPage<totalPages)showPage(currentPage+1); }; pag.appendChild(next);
  }
  showPage(1);
})();

/* ── PAGINACIÓN GLOBAL DE TARJETAS ── */
(function(){
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const gridSelectors = [
    '.products-grid',
    '.grid-laminas',
    '.gallery-grid',
    '.collections-grid',
    '.tools-grid',
    '#zodiacGrid'
  ];
  const grids = Array.from(document.querySelectorAll(gridSelectors.join(',')));
  if (!grids.length) return;

  grids.forEach(grid => {
    if (grid.dataset.ladyAuraPaged === '1') return;
    const cards = Array.from(grid.children).filter(el => {
      return el.nodeType === 1 && !el.classList.contains('pagination');
    });
    const itemsPerPage = grid.id === 'zodiacGrid' ? 5 : DEFAULT_ITEMS_PER_PAGE;
    if (cards.length <= itemsPerPage) return;

    grid.dataset.ladyAuraPaged = '1';
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    let currentPage = 1;
    const pag = document.createElement('div');
    pag.className = 'pagination lady-aura-pagination';
    pag.setAttribute('aria-label', 'Paginación de tarjetas');
    grid.parentNode.insertBefore(pag, grid.nextSibling);

    function showPage(page, shouldScroll) {
      currentPage = Math.max(1, Math.min(totalPages, page));
      cards.forEach((card, i) => {
        card.style.display = (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) ? '' : 'none';
      });
      renderPagination();
      if (shouldScroll) {
        window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      }
    }

    function renderPagination() {
      pag.innerHTML = '';
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
      prev.textContent = '←';
      prev.setAttribute('aria-label', 'Página anterior');
      prev.disabled = currentPage === 1;
      prev.onclick = () => showPage(currentPage - 1, true);
      pag.appendChild(prev);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.setAttribute('aria-label', 'Página ' + i);
        btn.onclick = () => showPage(i, true);
        pag.appendChild(btn);
      }

      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
      next.textContent = '→';
      next.setAttribute('aria-label', 'Página siguiente');
      next.disabled = currentPage === totalPages;
      next.onclick = () => showPage(currentPage + 1, true);
      pag.appendChild(next);
    }

    showPage(1, false);
  });
})();
