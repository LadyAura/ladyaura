/* ============================================================
   LADY AURA ART · carrito.js
   Carrito global con localStorage. Funciona en todas las páginas.
   ============================================================ */

const CART_KEY = 'ladyaura_cart';

/* ── Leer / guardar ── */
function cartGet() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e) { return []; }
}
function cartSave(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  cartUpdateBadge();
  cartUpdateFloating();
}

/* ── Añadir al carrito ── */
function cartAdd(item) {
  // item = { id, nombre, img, precio, orient, coleccion/collection }
  item = item || {};
  const pagePath = (window.location.pathname || '').toLowerCase();
  const raw = [
    item.coleccion, item.collection, item.nombre, item.id, item.img, pagePath
  ].join(' ').toLowerCase();

  if (!item.coleccion && !item.collection && raw.includes('nedeka')) {
    item.coleccion = 'nedeka';
    item.collection = 'nedeka';
  }
  if (!item.coleccion && !item.collection && raw.includes('bruji')) {
    item.coleccion = 'bruji';
    item.collection = 'bruji';
  }
  const maikaImgList = ['artista-de-suenos','hada-de-los-cristales-rojos','muneca-de-flores','nina-del-mar-de-estrellas','galaxia-en-sus-ojos','artista-entre-luces','noche-de-cocoa','the-beautiful-and-the-broken','tata','ten-thousand-whys','resilience','from-zero','cupid','break-me-more','hello-how-are-you','superheroes','tarde-de-lectura','chica-del-pozo','jardinera-de-suenos'];
  if (!item.coleccion && !item.collection && (raw.includes('maika') || pagePath.includes('maika') || maikaImgList.some(function(n){ return raw.includes(n); }))) {
    item.coleccion = 'maika';
    item.collection = 'maika';
  }

  const items = cartGet();
  const exists = items.find(i => i.id === item.id);
  if (!exists) {
    items.push(item);
    cartSave(items);
    cartShowToast(item.nombre);
  } else {
    cartShowToast(item.nombre, true);
  }
}

/* ── Eliminar ── */
function cartRemove(id) {
  cartSave(cartGet().filter(i => i.id !== id));
}

/* ── Badge del icono en el nav ── */
function cartUpdateBadge() {
  const count = cartGet().length;
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ── Botón flotante del carrito ── */
function cartUpdateFloating() {
  const count = cartGet().length;
  const fab = document.getElementById('cart-fab');
  if (!fab) return;
  fab.querySelector('.cart-fab-count').textContent = count;
  fab.style.display = count > 0 ? 'flex' : 'none';
}

/* ── Toast de confirmación ── */
function cartShowToast(nombre, yaEsta) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = yaEsta
    ? `<span>✨</span> <em>${nombre}</em> ya está en tu carrito`
    : `<span>🛒</span> <em>${nombre}</em> añadido al carrito`;
  toast.classList.remove('out');
  toast.classList.add('in');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.classList.remove('in');
    toast.classList.add('out');
  }, 2800);
}

/* ── Inyectar icono carrito en el nav ── */
function cartInjectNav() {
  // Si ya hay un enlace hardcodeado, solo actualizar badge
  if (document.querySelector('.cart-nav-link')) {
    cartUpdateBadge();
    return;
  }
  const nav = document.getElementById('nav') || document.querySelector('.back-bar') || document.querySelector('nav');
  if (!nav) return;

  const link = document.createElement('a');
  link.href = 'carrito.html';
  link.className = 'cart-nav-link';
  link.setAttribute('aria-label', 'Ver carrito');
  link.innerHTML = '<span class="cart-icon">🛒</span><span class="cart-badge" style="display:none">0</span>';
  nav.appendChild(link);
  cartUpdateBadge();
}

/* ── Inyectar FAB flotante ── */
function cartInjectFAB() {
  if (document.getElementById('cart-fab')) return;
  const fab = document.createElement('a');
  fab.id = 'cart-fab';
  fab.href = 'carrito.html';
  fab.setAttribute('aria-label', 'Ver carrito');
  fab.style.display = 'none';
  fab.innerHTML = `🛒 <span class="cart-fab-count">0</span>`;
  document.body.appendChild(fab);
  cartUpdateFloating();
}

/* ── Inyectar botón "Añadir al carrito" en cada product-card ── */
function cartInjectButtons() {
  document.querySelectorAll('.product-card:not(.sold-out)').forEach(card => {
    if (card.querySelector('.btn-add-cart')) return;
    const nombre = card.dataset.nombre;
    if (!nombre) return;

    const btn = document.createElement('button');
    btn.className = 'btn-add-cart';
    btn.innerHTML = '🛒 Añadir al carrito';
    btn.setAttribute('aria-label', `Añadir ${nombre} al carrito`);

    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // no abre el lightbox
      cartAdd({
        id: card.dataset.img || nombre,
        nombre: nombre,
        img: card.dataset.img || card.querySelector('img')?.src || '',
        precio: Number(card.dataset.precio || card.dataset.price) || 84,
        orient: card.dataset.orient || 'v',
        coleccion: card.dataset.coleccion || card.dataset.collection || (location.pathname.toLowerCase().includes('nedeka') ? 'nedeka' : location.pathname.toLowerCase().includes('bruji') ? 'bruji' : location.pathname.toLowerCase().includes('maika') ? 'maika' : location.pathname.toLowerCase().includes('circulo-aura') ? 'bambarelle71' : card.dataset.coleccion || card.dataset.collection || ''),
        collection: card.dataset.collection || card.dataset.coleccion || (location.pathname.toLowerCase().includes('nedeka') ? 'nedeka' : location.pathname.toLowerCase().includes('bruji') ? 'bruji' : location.pathname.toLowerCase().includes('maika') ? 'maika' : location.pathname.toLowerCase().includes('circulo-aura') ? 'bambarelle71' : card.dataset.coleccion || card.dataset.collection || '')
      });
      this.classList.add('added');
      this.innerHTML = '✓ En el carrito';
      setTimeout(() => {
        this.classList.remove('added');
        this.innerHTML = '🛒 Añadir al carrito';
      }, 2000);
    });

    const info = card.querySelector('.card-info');
    if (info) info.appendChild(btn);
  });
}

/* ── Estilos del carrito inyectados dinámicamente ── */
function cartInjectStyles() {
  if (document.getElementById('cart-styles')) return;
  const style = document.createElement('style');
  style.id = 'cart-styles';
  style.textContent = `
    /* === NAV ICONO === */
    .cart-nav-link {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      font-size: 1.15rem;
      padding: 0 0.3rem;
    }
    .cart-badge {
      position: absolute;
      top: -7px;
      right: -10px;
      background: linear-gradient(135deg, #a03fff, #ff4889);
      color: #fff;
      font-family: 'Cinzel', serif;
      font-size: 0.62rem;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      box-shadow: 0 0 8px rgba(160,63,255,0.6);
      pointer-events: none;
    }

    /* === BOTÓN AÑADIR === */
    .btn-add-cart {
      display: block;
      width: 100%;
      margin-top: 0.6rem;
      padding: 0.55rem 1rem;
      background: linear-gradient(135deg, rgba(160,63,255,0.15), rgba(255,72,137,0.1));
      border: 1px solid rgba(160,63,255,0.4);
      border-radius: 999px;
      color: rgba(255,255,255,0.85);
      font-family: 'Cinzel', serif;
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.25s;
    }
    .btn-add-cart:hover {
      background: linear-gradient(135deg, rgba(160,63,255,0.35), rgba(255,72,137,0.25));
      border-color: rgba(160,63,255,0.8);
      color: #fff;
      box-shadow: 0 0 18px rgba(160,63,255,0.3);
    }
    .btn-add-cart.added {
      background: linear-gradient(135deg, rgba(100,200,120,0.25), rgba(80,180,100,0.15));
      border-color: rgba(100,220,120,0.6);
      color: #a0ffb0;
    }

    /* === FAB FLOTANTE === */
    #cart-fab {
      position: fixed;
      bottom: 1.8rem;
      right: 1.8rem;
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.4rem;
      background: linear-gradient(135deg, rgba(160,63,255,0.92), rgba(255,72,137,0.88));
      color: #fff;
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      border-radius: 999px;
      text-decoration: none;
      box-shadow: 0 4px 30px rgba(160,63,255,0.5);
      transition: all 0.25s;
      animation: fabPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    #cart-fab:hover {
      box-shadow: 0 6px 40px rgba(160,63,255,0.7);
      transform: translateY(-2px);
    }
    .cart-fab-count {
      background: rgba(255,255,255,0.25);
      border-radius: 999px;
      padding: 0.1em 0.5em;
      font-size: 0.8em;
    }
    @keyframes fabPop {
      from { transform: scale(0.5); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }

    /* === TOAST === */
    #cart-toast {
      position: fixed;
      bottom: 5.5rem;
      right: 1.8rem;
      z-index: 9001;
      background: rgba(13,8,33,0.96);
      border: 1px solid rgba(160,63,255,0.4);
      border-radius: 16px;
      padding: 0.75rem 1.2rem;
      color: rgba(255,255,255,0.9);
      font-family: 'Cinzel', serif;
      font-size: 0.78rem;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 30px rgba(0,0,0,0.5);
      max-width: 260px;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s;
      pointer-events: none;
    }
    #cart-toast em { color: #c9a84c; font-style: normal; }
    #cart-toast.in { opacity: 1; transform: translateY(0); }
    #cart-toast.out { opacity: 0; transform: translateY(10px); }
  `;
  document.head.appendChild(style);
}

/* ── Inyectar botón en sign-cards del zodiaco ── */
function cartInjectZodiaco() {
  document.querySelectorAll('.sign-card:not(.sold-out)').forEach(card => {
    if (card.querySelector('.btn-add-cart')) return;
    const titulo = card.dataset.sign;
    if (!titulo) return;
    const isFem = card.dataset.fem === '1';
    const imgEl = card.querySelector('img');
    const imgSrc = imgEl ? imgEl.src : '';
    const nombre = (isFem ? 'Diosa ' : 'Retrato Celestial de ') + titulo;

    const btn = document.createElement('button');
    btn.className = 'btn-add-cart';
    btn.innerHTML = '🛒 Añadir al carrito';
    btn.style.cssText = 'display:block;width:100%;margin-top:0.5rem;padding:0.45rem 0.8rem;background:linear-gradient(135deg,rgba(160,63,255,0.15),rgba(255,72,137,0.1));border:1px solid rgba(160,63,255,0.4);border-radius:999px;color:rgba(255,255,255,0.85);font-family:Cinzel,serif;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:all 0.25s;';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      cartAdd({
        id: 'zodiaco-' + titulo + '-' + (isFem ? 'f' : 'm'),
        nombre: nombre,
        img: imgSrc,
        precio: Number(card.dataset.precio) || 84,
        orient: 'v'
      });
      this.classList.add('added');
      this.innerHTML = '✓ En el carrito';
      setTimeout(() => {
        this.classList.remove('added');
        this.innerHTML = '🛒 Añadir al carrito';
      }, 2000);
    });

    // Añadir debajo de la imagen/nombre
    card.appendChild(btn);
  });
}

/* ── Inyectar botón en láminas kawaii de colorear.html ── */
function cartInjectColorear() {
  document.querySelectorAll('.lamina-doble').forEach(card => {
    if (card.querySelector('.btn-add-cart')) return;
    const nombreEl = card.querySelector('.lamina-nombre');
    if (!nombreEl) return;
    const nombre = nombreEl.textContent.trim();
    if (nombre === 'Lámina personalizada') return; // precio variable, skip
    const img = card.querySelector('img');
    const imgSrc = img ? img.src : '';

    const btn = document.createElement('button');
    btn.className = 'btn-add-cart';
    btn.innerHTML = '🛒 Añadir al carrito';
    btn.style.marginTop = '0.5rem';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      cartAdd({
        id: 'colorear-' + nombre,
        nombre: 'Lámina kawaii · ' + nombre,
        img: imgSrc,
        precio: 3,
        orient: 'v'
      });
      this.classList.add('added');
      this.innerHTML = '✓ En el carrito';
      setTimeout(() => {
        this.classList.remove('added');
        this.innerHTML = '🛒 Añadir al carrito';
      }, 2000);
    });

    const info = card.querySelector('.lamina-info');
    if (info) info.appendChild(btn);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  cartInjectStyles();
  cartInjectNav();
  cartInjectFAB();
  cartInjectButtons();
  cartInjectColorear();
  // Reintento para páginas que generan cards dinámicamente (zodiaco)
  setTimeout(function() {
    cartInjectButtons();
    cartInjectColorear();
    cartInjectZodiaco();
  }, 800);
  setTimeout(function() {
    cartInjectZodiaco(); // segundo intento por si los tabs tardan más
  }, 2000);
  // MutationObserver para cards que aparecen después (zodiaco tabs)
  var observer = new MutationObserver(function() {
    cartInjectButtons();
    cartInjectColorear();
    cartInjectZodiaco();
  });
  var grid = document.querySelector('.products-grid') || document.querySelector('.grid-laminas') || document.querySelector('.signs-grid') || document.querySelector('main');
  if (grid) observer.observe(grid, { childList: true, subtree: true });

  // También inyectar en lightbox si existe (añadir desde ficha ampliada)
  const lbInner = document.getElementById('lbInner');
  if (lbInner && !lbInner.querySelector('.lb-btn-cart')) {
    // Se inyecta cuando se abre el lightbox via patchLightbox()
  }

  fullscreenInjectStyles();
});

/* ── Patch del openLB para añadir botón dentro del lightbox ── */
// Se llama desde cada página que tenga openLB
function cartPatchLightbox(card) {
  const btns = document.getElementById('lbBtns') || document.querySelector('.lb-btns');
  if (!btns) return;
  if (btns.querySelector('.lb-btn-cart')) {
    // Actualizar el onclick del botón existente
    const b = btns.querySelector('.lb-btn-cart');
    b.onclick = function() {
      cartAdd({
        id: card.dataset.img || card.dataset.nombre,
        nombre: card.dataset.nombre,
        img: card.dataset.img || '',
        precio: Number(card.dataset.precio) || 84,
        orient: card.dataset.orient || 'v'
      });
      this.classList.add('added');
      this.textContent = '✓ Añadido';
      setTimeout(() => {
        this.classList.remove('added');
        this.textContent = '🛒 Añadir al carrito';
      }, 2000);
    };
    return;
  }
  const btn = document.createElement('button');
  btn.className = 'lb-btn lb-btn-cart';
  btn.textContent = '🛒 Añadir al carrito';
  btn.style.cssText = `
    background: linear-gradient(135deg,rgba(160,63,255,0.2),rgba(255,72,137,0.15));
    border: 1px solid rgba(160,63,255,0.5);
    color: rgba(255,255,255,0.9);
    cursor: pointer;
  `;
  btn.onclick = function() {
    cartAdd({
      id: card.dataset.img || card.dataset.nombre,
      nombre: card.dataset.nombre,
      img: card.dataset.img || '',
      precio: Number(card.dataset.precio) || 84,
      orient: card.dataset.orient || 'v'
    });
    this.classList.add('added');
    this.textContent = '✓ Añadido al carrito';
    setTimeout(() => {
      this.classList.remove('added');
      this.textContent = '🛒 Añadir al carrito';
    }, 2000);
  };
  btns.insertBefore(btn, btns.firstChild);
}

/* ============================================================
   VISOR FULLSCREEN · Al hacer click en la imagen del lightbox
   se abre a pantalla completa con la imagen entera
   ============================================================ */

function fullscreenInjectStyles() {
  if (document.getElementById('fs-styles')) return;
  const style = document.createElement('style');
  style.id = 'fs-styles';
  style.textContent = `
    #fs-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: rgba(0,0,0,0.96);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;
      cursor: zoom-out;
    }
    #fs-overlay.open {
      opacity: 1;
      pointer-events: all;
    }
    #fs-overlay img {
      max-width: 92vw;
      max-height: 92vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 0 80px rgba(160,63,255,0.3);
      user-select: none;
      animation: fsZoomIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes fsZoomIn {
      from { transform: scale(0.88); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }
    #fs-close {
      position: fixed;
      top: 1.2rem;
      right: 1.4rem;
      z-index: 1000000;
      background: rgba(13,8,33,0.85);
      border: 1px solid rgba(160,63,255,0.4);
      color: rgba(255,255,255,0.85);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      font-size: 1.3rem;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      backdrop-filter: blur(8px);
    }
    #fs-close:hover {
      background: rgba(160,63,255,0.3);
      color: #fff;
      border-color: rgba(160,63,255,0.8);
    }
    #fs-overlay.open ~ #fs-close,
    #fs-close.visible { display: flex; }

    /* Cursor zoom-in en imágenes de lightbox */
    .lb-img-wrap img,
    .lb-img img,
    #lbImg,
    .modal-img img { cursor: zoom-in !important; }
  `;
  document.head.appendChild(style);
}

function fullscreenOpen(src, alt) {
  let overlay = document.getElementById('fs-overlay');
  let closeBtn = document.getElementById('fs-close');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'fs-overlay';
    overlay.innerHTML = `<img id="fs-img" src="" alt="">`;
    document.body.appendChild(overlay);

    closeBtn = document.createElement('button');
    closeBtn.id = 'fs-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Cerrar imagen');
    document.body.appendChild(closeBtn);

    overlay.addEventListener('click', fullscreenClose);
    closeBtn.addEventListener('click', fullscreenClose);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') fullscreenClose();
    });
  }

  document.getElementById('fs-img').src = src;
  document.getElementById('fs-img').alt = alt || '';
  overlay.classList.add('open');
  closeBtn.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function fullscreenClose() {
  const overlay = document.getElementById('fs-overlay');
  const closeBtn = document.getElementById('fs-close');
  if (overlay) overlay.classList.remove('open');
  if (closeBtn) closeBtn.classList.remove('visible');
  document.body.style.overflow = '';
}

/* Enganchar click en imagen del lightbox */
function fullscreenAttach() {
  // Selectors de imagen dentro de cualquier lightbox
  const selectors = [
    '#lbImg',           // especiales, paisajes, zodiaco
    '#fs-img',          // evitar recursión
  ].join(',');

  document.querySelectorAll('#lbImg, .lb-img img, .modal-img img').forEach(img => {
    if (img.dataset.fsAttached) return;
    img.dataset.fsAttached = '1';
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      if (this.src) fullscreenOpen(this.src, this.alt);
    });
  });
}

// Llamada inmediata también por si el DOM ya está listo
if(document.readyState !== "loading") fullscreenInjectStyles();



/* ============================================================
   CUPONES LADY AURA
   ============================================================ */
(function(){
  const COUPON_KEY = 'ladyaura_coupon';

  function normalizeCoupon(code) {
    return String(code || '').trim().toUpperCase();
  }

  function isBrujiItem(item) {
    var raw = [
      item?.coleccion, item?.collection, item?.categoria, item?.category,
      item?.id, item?.img, item?.nombre
    ].filter(Boolean).join(' ').toLowerCase();
    return raw.includes('bruji') || ['violeta','salemmiau','medialuna','anastada','flowerwolf','amor floral','amor-floral'].some(name => raw.includes(name));
  }

  function isMaikaItem(item) {
    var raw = [
      item?.coleccion, item?.collection, item?.categoria, item?.category,
      item?.img, item?.nombre, item?.id
    ].filter(Boolean).join(' ').toLowerCase();
    if (raw.includes('maika')) return true;
    // Detección por nombre de imagen (cuadros MAIKA sin coleccion guardada)
    var maikaImgs = [
      'artista-de-suenos','hada-de-los-cristales-rojos','muneca-de-flores',
      'nina-del-mar-de-estrellas','galaxia-en-sus-ojos','artista-entre-luces',
      'noche-de-cocoa','the-beautiful-and-the-broken','tata','ten-thousand-whys',
      'resilience','from-zero','cupid','break-me-more','hello-how-are-you','superheroes',
      'tarde-de-lectura','chica-del-pozo','jardinera-de-suenos'
    ];
    return maikaImgs.some(function(name) { return raw.includes(name); });
  }

  function isBambarelleItem(item) {
    var raw = [
      item?.coleccion, item?.collection, item?.categoria, item?.category,
      item?.img, item?.nombre, item?.id
    ].filter(Boolean).join(' ').toLowerCase();
    return raw.includes('bambarelle') || raw.includes('bambarella') || raw.includes('circulo-aura') || raw.includes('circulo aura') ||
      ['aura dorada','gatita arcoiris','dama dorada celestial','guardianas del bosque azul'].some(function(n){ return raw.includes(n); });
  }

  function isNedekaItem(item) {
    const raw = [
      item?.coleccion, item?.collection, item?.categoria, item?.category,
      item?.nombre, item?.id, item?.img
    ].join(' ').toLowerCase();
    return raw.includes('nedeka');
  }

  function getItemsSafe() {
    try {
      if (typeof cartGet === 'function') return cartGet();
      return JSON.parse(localStorage.getItem('ladyaura_cart')) || [];
    } catch(e) { return []; }
  }

  function getCoupon() {
    try { return JSON.parse(localStorage.getItem(COUPON_KEY)); }
    catch(e) { return null; }
  }

  function setCoupon(coupon) {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
    updateCouponUI();
  }

  function clearCoupon() {
    localStorage.removeItem(COUPON_KEY);
    updateCouponUI();
  }

  function calculateCouponDiscount(items, couponCode) {
    const code = normalizeCoupon(couponCode);
    const subtotal = items.reduce((sum, item) => sum + (Number(item.precio) || 84), 0);
    const nedekaSubtotal = items.filter(isNedekaItem).reduce((sum, item) => sum + (Number(item.precio) || 84), 0);

    const brujiSubtotal = items.filter(isBrujiItem).reduce((sum, item) => sum + (Number(item.precio) || 84), 0);

    if (code === 'LADYAURA5') {
      return subtotal > 0 ? 5 : 0;
    }
    if (code === 'NEDEKA10') {
      return nedekaSubtotal > 0 ? Math.min(10, nedekaSubtotal) : 0;
    }
    if (code === 'NEDEKA60') {
      const nedekaItems = items.filter(isNedekaItem);
      let totalDiscount = 0;
      nedekaItems.forEach(item => { totalDiscount += Math.max(0, (Number(item.precio) || 84) - 60); });
      return totalDiscount > 0 ? totalDiscount : 0;
    }
    if (code === 'BRUJI10') {
      return brujiSubtotal > 0 ? Math.min(10, brujiSubtotal) : 0;
    }
    if (code === 'BRUJI60') {
      // Descuento secreto: cada cuadro BRUJI queda a 60€
      const brujiItems = items.filter(isBrujiItem);
      let totalDiscount = 0;
      brujiItems.forEach(item => { totalDiscount += Math.max(0, (Number(item.precio) || 84) - 60); });
      return totalDiscount > 0 ? totalDiscount : 0;
    }
    if (code === 'MAIKA10') {
      const maikaSubtotal = items.filter(isMaikaItem).reduce((sum, item) => sum + (Number(item.precio) || 84), 0);
      return maikaSubtotal > 0 ? Math.min(10, maikaSubtotal) : 0;
    }
    if (code === 'MAIKA60') {
      // Descuento secreto diseñadora: cada cuadro MAIKA queda a 60€
      const maikaItems = items.filter(isMaikaItem);
      let totalDiscount = 0;
      maikaItems.forEach(item => { totalDiscount += Math.max(0, (Number(item.precio) || 84) - 60); });
      return totalDiscount > 0 ? totalDiscount : 0;
    }
    if (code === 'ALI10') {
      const bambaSubtotal = items.filter(isBambarelleItem).reduce((sum, item) => sum + (Number(item.precio) || 84), 0);
      return bambaSubtotal > 0 ? Math.min(10, bambaSubtotal) : 0;
    }
    return 0;
  }

  function couponMessage(text, ok) {
    let box = document.getElementById('coupon-message');
    const form = document.getElementById('coupon-form') || document.querySelector('.coupon-form') || document.querySelector('[data-coupon-form]');
    if (!box) {
      box = document.createElement('p');
      box.id = 'coupon-message';
      box.style.marginTop = '.55rem';
      box.style.fontSize = '.86rem';
      if (form) form.appendChild(box);
    }
    box.textContent = text;
    box.style.color = ok ? '#a0ffb0' : '#ff9bb8';
  }

  window.ladyAuraApplyCoupon = function(code) {
    const items = getItemsSafe();
    const clean = normalizeCoupon(code);
    const existing = getCoupon();

    if (!clean) {
      couponMessage('Escribe un cupón para aplicarlo.', false);
      return false;
    }

    if (existing && normalizeCoupon(existing.code) && normalizeCoupon(existing.code) !== clean) {
      couponMessage('Solo se puede usar un cupón por pedido.', false);
      return false;
    }

    if (!['LADYAURA5','NEDEKA10','NEDEKA60','BRUJI10','BRUJI60','MAIKA10','MAIKA60','ALI10'].includes(clean)) {
      couponMessage('Cupón no válido.', false);
      return false;
    }

    if ((clean === 'NEDEKA10' || clean === 'NEDEKA60') && !items.some(isNedekaItem)) {
      couponMessage('Este cup\u00f3n solo funciona con cuadros de la Colecci\u00f3n NEDEKA.', false);
      return false;
    }
    if ((clean === 'BRUJI10' || clean === 'BRUJI60') && !items.some(isBrujiItem)) {
      couponMessage('Este cupón solo funciona con cuadros de la Colección BRUJI.', false);
      return false;
    }
    if ((clean === 'MAIKA10' || clean === 'MAIKA60') && !items.some(isMaikaItem)) {
      couponMessage('Cupón no válido.', false);
      return false;
    }
    if (clean === 'ALI10' && !items.some(isBambarelleItem)) {
      couponMessage('Este cupón solo funciona con obras del Círculo Aura (Bambarelle71).', false);
      return false;
    }

    const discount = calculateCouponDiscount(items, clean);
    if (discount <= 0) {
      couponMessage('Este cupón no se puede aplicar a tu carrito actual.', false);
      return false;
    }

    setCoupon({ code: clean, discount: discount });
    couponMessage(`${clean === 'LADYAURA5' ? 'Cup\u00f3n LADYAURA5' : 'Cup\u00f3n ' + clean} aplicado: -${discount.toFixed(2).replace('.', ',')} \u20ac`, true);
    return true;
  };

  window.ladyAuraRemoveCoupon = function() {
    clearCoupon();
    couponMessage('Cupón eliminado.', true);
  };

  function ensureCouponBox() {
    if (!document.body || !/carrito\.html/i.test(location.pathname)) return;
    if (document.getElementById('coupon-form')) return;

    const target = document.querySelector('.cart-summary, #cart-summary, .summary-card, .order-summary, main');
    if (!target) return;

    const box = document.createElement('section');
    box.className = 'coupon-box';
    box.innerHTML = `
      <h3>¿Tienes un cupón?</h3>
      <form id="coupon-form">
        <input id="coupon-code" type="text" placeholder="Ej: LADYAURA5" autocomplete="off">
        <button type="submit">Aplicar</button>
        <button type="button" id="coupon-remove">Quitar</button>
      </form>
      <p class="coupon-help">Solo se puede usar un cupón por pedido.</p>
      <p id="coupon-message"></p>
    `;
    target.appendChild(box);
  }

  function injectCouponStyles() {
    if (document.getElementById('coupon-style')) return;
    const style = document.createElement('style');
    style.id = 'coupon-style';
    style.textContent = `
      .coupon-box{margin:1.2rem 0;padding:1rem;border:1px solid rgba(255,217,138,.28);border-radius:18px;background:rgba(255,217,138,.06)}
      .coupon-box h3{font-family:'Cinzel',serif;color:#e8c96a;font-size:1rem;margin:0 0 .75rem}
      #coupon-form{display:flex;gap:.5rem;flex-wrap:wrap}
      #coupon-form input{flex:1;min-width:170px;background:rgba(5,5,16,.7);border:1px solid rgba(160,63,255,.35);border-radius:999px;color:white;padding:.72rem 1rem}
      #coupon-form button{border:1px solid rgba(255,217,138,.35);border-radius:999px;background:linear-gradient(135deg,rgba(160,63,255,.4),rgba(255,72,137,.25));color:white;padding:.72rem 1rem;cursor:pointer;font-family:'Cinzel',serif;font-size:.75rem;letter-spacing:.08em}
      .coupon-help{font-size:.82rem;opacity:.75;margin:.65rem 0 0}
      .coupon-line{display:flex;justify-content:space-between;gap:1rem;color:#a0ffb0!important}
    `;
    document.head.appendChild(style);
  }

  function updateCouponUI() {
    const items = getItemsSafe();
    const coupon = getCoupon();
    const code = normalizeCoupon(coupon?.code);
    const discount = code ? calculateCouponDiscount(items, code) : 0;

    const input = document.getElementById('coupon-code');
    if (input && code) input.value = code;

    // Remove previous dynamic coupon lines
    document.querySelectorAll('[data-coupon-line="true"]').forEach(el => el.remove());

    if (code && discount > 0) {
      const totalSelectors = [
        '#cart-total', '.cart-total', '#total', '.total', '[data-cart-total]'
      ];
      const totalEl = totalSelectors.map(s => document.querySelector(s)).find(Boolean);

      // Try to add a visible coupon line before total
      if (totalEl && totalEl.parentElement) {
        const line = document.createElement('div');
        line.className = 'coupon-line';
        line.setAttribute('data-coupon-line','true');
        line.innerHTML = `<span>${code === 'LADYAURA5' ? 'Cup\u00f3n LADYAURA5' : 'Cup\u00f3n ' + code}</span><strong>-${discount.toFixed(2).replace('.', ',')} €</strong>`;
        totalEl.parentElement.insertBefore(line, totalEl);
      }

      // Recalculate visible totals if possible by text
      const subtotal = items.reduce((sum, item) => sum + (Number(item.precio) || 84), 0);
      const finalTotal = Math.max(0, subtotal - discount);
      if (totalEl) {
        totalEl.textContent = `${finalTotal.toFixed(2).replace('.', ',')} €`;
      }
    }

    const msg = document.getElementById('coupon-message');
    if (msg && code && discount > 0) {
      msg.textContent = `${code === 'LADYAURA5' ? 'Cup\u00f3n LADYAURA5' : 'Cup\u00f3n ' + code} aplicado: -${discount.toFixed(2).replace('.', ',')} €`;
      msg.style.color = '#a0ffb0';
    }
  }

  function bindCouponForm() {
    ensureCouponBox();
    injectCouponStyles();
    const form = document.getElementById('coupon-form');
    if (form && !form.dataset.bound) {
      form.dataset.bound = 'true';
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const input = document.getElementById('coupon-code');
        window.ladyAuraApplyCoupon(input?.value || '');
      });
    }
    const remove = document.getElementById('coupon-remove');
    if (remove && !remove.dataset.bound) {
      remove.dataset.bound = 'true';
      remove.addEventListener('click', function(){ window.ladyAuraRemoveCoupon(); });
    }
    updateCouponUI();
  }

  document.addEventListener('DOMContentLoaded', bindCouponForm);
  window.addEventListener('storage', updateCouponUI);
  setTimeout(bindCouponForm, 350);
  setTimeout(updateCouponUI, 900);
})();
