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
  // item = { id, nombre, img, precio, orient }
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
        precio: 94,
        orient: card.dataset.orient || 'v'
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
        precio: 94,
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
        precio: 94,
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
      precio: 94,
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
