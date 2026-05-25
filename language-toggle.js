(function () {
  'use strict';

  var STORAGE_KEY = 'ladyaura_site_lang';
  var COOKIE_DOMAIN = location.hostname && location.hostname !== 'localhost' ? ';domain=' + location.hostname : '';
  var GOOGLE_SCRIPT_ID = 'google-translate-script';
  var WIDGET_ID = 'google_translate_element';
  var SUPPORTED_LANGS = ['es', 'en', 'fr', 'de', 'it', 'pt'];
  var LANG_META = {
    es: { flag: '', title: 'Espanol', label: 'Ver en espanol' },
    en: { flag: '', title: 'English', label: 'View in English' },
    fr: { flag: '', title: 'Francais', label: 'Voir en francais' },
    de: { flag: '', title: 'Deutsch', label: 'Auf Deutsch anzeigen' },
    it: { flag: '', title: 'Italiano', label: 'Vedi in italiano' },
    pt: { flag: '', title: 'Portugues', label: 'Ver em portugues' }
  };

  function getStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('la_lang') || localStorage.getItem('ladyaura-lang');
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('la_lang', lang);
      localStorage.setItem('ladyaura-lang', lang);
    } catch (error) {}
  }

  function browserPreferredLanguage() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || ''];
    for (var i = 0; i < languages.length; i += 1) {
      var code = String(languages[i] || '').toLowerCase().split('-')[0];
      if (SUPPORTED_LANGS.indexOf(code) !== -1) return code;
    }
    return 'es';
  }

  function getInitialLanguage() {
    var stored = getStoredLanguage();
    if (SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    return browserPreferredLanguage();
  }

  function setTranslateCookie(lang) {
    var value = lang === 'es' ? '/es/es' : '/es/' + lang;
    document.cookie = 'googtrans=' + value + ';path=/' + COOKIE_DOMAIN;
    document.cookie = 'googtrans=' + value + ';path=/';
  }

  function removeTranslateCookie() {
    var expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'googtrans=;expires=' + expires + ';path=/' + COOKIE_DOMAIN;
    document.cookie = 'googtrans=;expires=' + expires + ';path=/';
  }

  function addStyles() {
    if (document.getElementById('lady-aura-language-styles')) return;
    var style = document.createElement('style');
    style.id = 'lady-aura-language-styles';
    style.textContent = [
      '.site-header{position:sticky!important;top:0!important;z-index:10000!important;display:flex!important;align-items:center!important;gap:.75rem!important;justify-content:space-between!important;width:100%!important;min-height:70px!important;padding:.72rem clamp(.85rem,4vw,3.2rem)!important;background:rgba(5,5,16,.88)!important;backdrop-filter:blur(18px)!important;border-bottom:1px solid rgba(255,217,138,.16)!important;box-shadow:0 8px 26px rgba(0,0,0,.28)!important;overflow:visible!important}',
      '.site-header .brand{display:inline-flex!important;align-items:center!important;flex:0 0 auto!important}',
      '.site-header .brand img{display:block!important;height:auto!important;max-height:54px!important;max-width:165px!important;width:auto!important;object-fit:contain!important}',
      '.site-header .nav{display:flex!important;align-items:center!important;justify-content:center!important;gap:.42rem!important;flex:1 1 auto!important;min-width:0!important}',
      '.site-header .nav a{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:.38rem!important;min-height:34px!important;padding:.36rem .74rem!important;border:1px solid rgba(255,217,138,.16)!important;border-radius:999px!important;background:rgba(12,7,29,.34)!important;color:rgba(255,255,255,.78)!important;font-family:Cinzel,serif!important;font-size:clamp(.62rem,.74vw,.76rem)!important;line-height:1!important;letter-spacing:.08em!important;text-decoration:none!important;text-transform:uppercase!important;white-space:nowrap!important;box-shadow:none!important;transition:color .18s,border-color .18s,background .18s,transform .18s!important}',
      '.site-header .nav a:hover,.site-header .nav a[aria-current="page"]{color:#e8c97a!important;border-color:rgba(232,201,122,.45)!important;background:rgba(160,63,255,.13)!important;transform:translateY(-1px)!important}',
      '.site-header .red-circle-dot{display:inline-block!important;width:.68em!important;height:.68em!important;min-width:.68em!important;border:2px solid #ff2d6f!important;border-radius:50%!important;box-shadow:0 0 10px rgba(255,45,111,.55)!important;vertical-align:-.04em!important}',
      '.site-header .menu-toggle{display:none;width:42px!important;height:38px!important;border:1px solid rgba(255,217,138,.28)!important;border-radius:999px!important;background:rgba(8,4,20,.68)!important;color:#fff!important;font-size:1.2rem!important;line-height:1!important;cursor:pointer!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important}',
      '.site-header .header-button{display:none!important}',
      '.lady-aura-header-actions{display:flex!important;align-items:center!important;gap:.72rem!important;margin-left:.35rem!important;padding-right:.18rem!important;position:relative!important;z-index:10002!important;flex:0 0 auto!important;overflow:visible!important}',
      '.lady-aura-header-actions .cart-nav-link{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:42px!important;min-height:38px!important;padding:.25rem .55rem!important;margin-right:.08rem!important;border:1px solid rgba(255,217,138,.25)!important;border-radius:999px!important;background:rgba(8,4,20,.55)!important;text-decoration:none!important;position:relative!important;overflow:visible!important}',
      '.lady-aura-language{display:flex!important;align-items:center!important;gap:4px!important;padding:5px!important;border:1px solid rgba(255,217,138,.32)!important;border-radius:18px!important;background:rgba(8,4,20,.78)!important;box-shadow:0 8px 22px rgba(0,0,0,.24)!important;backdrop-filter:blur(10px)!important;font-family:Arial,sans-serif!important;flex-wrap:wrap!important;justify-content:center!important;width:82px!important;max-width:82px!important}',
      '.lady-aura-language button{width:32px!important;height:23px!important;border:0!important;border-radius:7px!important;background:transparent!important;color:#fff!important;cursor:pointer!important;font-size:0!important;line-height:1!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;transition:transform .18s,background .18s,box-shadow .18s!important;padding:0!important;overflow:hidden!important}',
      '.lady-aura-language button:hover{transform:translateY(-1px);background:rgba(255,255,255,.10)}',
      '.lady-aura-language button[aria-pressed="true"]{background:rgba(160,63,255,.38)!important;box-shadow:0 0 0 2px rgba(255,255,255,.18),0 0 18px rgba(160,63,255,.42)!important}',
      '.cart-badge{position:absolute!important;top:-8px!important;right:-10px!important;min-width:18px!important;height:18px!important;padding:0 5px!important;border-radius:999px!important;background:#d93cff!important;color:#fff!important;font-size:11px!important;font-weight:800!important;line-height:18px!important;text-align:center!important;z-index:5!important;box-shadow:0 0 0 2px rgba(5,5,16,.95)!important}',
      '.flag-icon{position:relative!important;display:block!important;width:22px!important;height:15px!important;border-radius:3px!important;overflow:hidden!important;box-shadow:0 0 0 1px rgba(255,255,255,.28)!important;background:#eee!important}',
      '.flag-es{background:linear-gradient(#c60b1e 0 25%,#ffc400 25% 75%,#c60b1e 75% 100%)!important}',
      '.flag-fr{background:linear-gradient(90deg,#0055a4 0 33%,#fff 33% 66%,#ef4135 66% 100%)!important}',
      '.flag-de{background:linear-gradient(#000 0 33%,#dd0000 33% 66%,#ffce00 66% 100%)!important}',
      '.flag-it{background:linear-gradient(90deg,#009246 0 33%,#fff 33% 66%,#ce2b37 66% 100%)!important}',
      '.flag-pt{background:linear-gradient(90deg,#006600 0 40%,#ff0000 40% 100%)!important}',
      '.flag-en,.flag-gb{background:#012169!important;background-image:linear-gradient(33deg,transparent 0 42%,#fff 42% 47%,#c8102e 47% 53%,#fff 53% 58%,transparent 58% 100%),linear-gradient(147deg,transparent 0 42%,#fff 42% 47%,#c8102e 47% 53%,#fff 53% 58%,transparent 58% 100%),linear-gradient(90deg,transparent 0 40%,#fff 40% 60%,transparent 60% 100%),linear-gradient(0deg,transparent 0 36%,#fff 36% 64%,transparent 64% 100%),linear-gradient(90deg,transparent 0 45%,#c8102e 45% 55%,transparent 55% 100%),linear-gradient(0deg,transparent 0 43%,#c8102e 43% 57%,transparent 57% 100%)!important}',
      '.flag-en:before,.flag-gb:before{content:none!important}',
      '#google_translate_element{position:fixed!important;left:-9999px!important;top:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;display:block!important;opacity:.01!important;pointer-events:none!important}',
      '.goog-te-banner-frame,.goog-te-balloon-frame,.goog-logo-link{display:none!important}',
      'body{top:0!important}',
      'body > .skiptranslate{display:none!important}',
      '.lady-aura-pagination,.pagination{display:flex!important;align-items:center!important;justify-content:center!important;gap:.45rem!important;flex-wrap:wrap!important;margin:2rem auto 0!important;padding:0 1rem!important}',
      '.lady-aura-pagination .page-btn,.pagination .page-btn{min-width:38px!important;height:36px!important;border:1px solid rgba(255,217,138,.28)!important;border-radius:999px!important;background:rgba(8,4,20,.72)!important;color:rgba(255,255,255,.88)!important;font-family:Cinzel,serif!important;font-size:.82rem!important;cursor:pointer!important;box-shadow:0 8px 20px rgba(0,0,0,.24)!important}',
      '.lady-aura-pagination .page-btn.active,.pagination .page-btn.active{background:linear-gradient(135deg,rgba(160,63,255,.74),rgba(255,72,137,.55))!important;border-color:rgba(255,217,138,.48)!important;color:#fff!important}',
      '.lady-aura-pagination .page-btn.disabled,.pagination .page-btn.disabled,.lady-aura-pagination .page-btn:disabled,.pagination .page-btn:disabled{opacity:.4!important;cursor:default!important}',
      '@media(max-width:1180px){.site-header{min-height:64px!important;justify-content:flex-start!important}.site-header .brand img{max-height:48px!important;max-width:150px!important}.site-header .menu-toggle{display:flex!important;order:97;margin-left:auto!important}.site-header .lady-aura-header-actions{margin-left:.5rem!important;order:99!important;gap:.66rem!important}.site-header .nav .cart-nav-link{display:none!important}.lady-aura-header-actions .cart-nav-link{position:relative!important}.site-header .nav{position:absolute!important;top:calc(100% + .45rem)!important;right:clamp(.7rem,4vw,2rem)!important;left:auto!important;display:none!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:.35rem!important;min-width:230px!important;width:max-content!important;max-width:min(92vw,330px)!important;padding:.72rem!important;border:1px solid rgba(255,217,138,.18)!important;border-radius:18px!important;background:rgba(8,4,20,.97)!important;box-shadow:0 18px 42px rgba(0,0,0,.45)!important;backdrop-filter:blur(18px)!important;z-index:10001!important;flex:none!important}.site-header .nav.active{display:flex!important}.site-header .nav a{width:100%!important;justify-content:flex-end!important;text-align:right!important;min-height:37px!important;padding:.62rem .72rem!important;font-size:.74rem!important}.lady-aura-language button{width:32px!important;height:23px!important;font-size:0!important}}',
      '@media(max-width:760px){.products-grid,.grid-laminas,.gallery-grid,.collections-grid,.tools-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:.72rem!important}.product-card,.lamina-doble,.gallery-card,.col-card,.tool-card{min-width:0!important;width:auto!important}.product-card h3,.lamina-nombre,.gallery-card-label,.col-card-tag,.tool-card h3{overflow-wrap:anywhere!important}#zodiacGrid .zod-pair{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:.72rem!important;padding:.72rem!important}#zodiacGrid .zod-center{grid-column:1/-1!important;order:-1!important}#zodiacGrid .zod-card{min-width:0!important}.zod-ci{padding:.55rem!important}.zod-ci h3{font-size:.78rem!important}.zod-ci p{font-size:.72rem!important}.lady-aura-language{width:82px!important;max-width:82px!important;flex-wrap:wrap!important;justify-content:center!important;border-radius:14px!important}.lady-aura-language button{width:32px!important;height:23px!important;font-size:0!important}}',
      '@media(max-width:560px){.site-header{padding:.55rem .72rem!important;gap:.38rem!important}.site-header .brand img{max-width:132px!important;max-height:42px!important}.site-header .menu-toggle{width:36px!important;height:34px!important}.lady-aura-header-actions{gap:.58rem!important;margin-left:.32rem!important}.lady-aura-header-actions .cart-nav-link{min-width:38px!important;min-height:34px!important;padding:.18rem .38rem!important}.lady-aura-language{gap:3px!important;padding:4px!important;width:78px!important;max-width:78px!important}.lady-aura-language button{width:30px!important;height:22px!important;font-size:0!important}}'
    ].join('');
    document.head.appendChild(style);
  }

  function normalizeHeader() {
    var header = document.getElementById('site-header') || document.querySelector('.site-header') || document.querySelector('header.header') || document.querySelector('header');
    if (!header || header.dataset.ladyAuraNormalized === '1') return;
    header.dataset.ladyAuraNormalized = '1';
    header.id = 'site-header';
    header.className = 'site-header';
    header.removeAttribute('style');

    var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var links = [
      ['index.html', 'Inicio'],
      ['horoscopo.html', '♈ Horoscopo'],
      ['especiales.html', '✨ AURA'],
      ['nedeka.html', '🌙 NEDEKA'],
      ['bruji.html', '🔮 BRUJI'],
      ['maika.html', '🎨 MAIKA'],
      ['circulo-aura.html', '<span class="red-circle-dot" aria-hidden="true"></span>CIRCULO AURA'],
      ['personalizados.html', '🎨 Personalizados'],
      ['colorear.html', '🎨 Colorear'],
      ['pedidos.html', '📦 Mis pedidos']
    ];

    var navHtml = links.map(function (link) {
      var active = current === link[0] ? ' aria-current="page"' : '';
      return '<a href="' + link[0] + '"' + active + '>' + link[1] + '</a>';
    }).join('');

    var cartActive = current === 'carrito.html' ? ' aria-current="page"' : '';
    header.innerHTML = [
      '<a class="brand" href="index.html" aria-label="Lady Aura inicio"><img src="assets/Logo-transparent.webp" alt="Logo Lady Aura Art - Diamond Painting Premium"></a>',
      '<button class="menu-toggle" id="menuToggle" type="button" aria-label="Abrir menu" aria-expanded="false">☰</button>',
      '<nav class="nav" id="nav" aria-label="Navegacion principal">' + navHtml + '</nav>',
      '<div class="lady-aura-header-actions" aria-label="Carrito e idioma"><a href="carrito.html" class="cart-nav-link" aria-label="Ver carrito"' + cartActive + ' style="position:relative;display:inline-flex;align-items:center;text-decoration:none;">🛒<span class="cart-badge" style="display:none">0</span></a></div>'
    ].join('');
    if (typeof window.cartUpdateBadge === 'function') {
      window.cartUpdateBadge();
    }
  }

  function ensureGoogleWidget() {
    if (!document.getElementById(WIDGET_ID)) {
      var holder = document.createElement('div');
      holder.id = WIDGET_ID;
      holder.setAttribute('aria-hidden', 'true');
      document.body.appendChild(holder);
    }

    window.googleTranslateElementInit = function () {
      if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) return;
      new window.google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: SUPPORTED_LANGS.join(','),
        autoDisplay: false
      }, WIDGET_ID);
    };

    if (!document.getElementById(GOOGLE_SCRIPT_ID)) {
      var script = document.createElement('script');
      script.id = GOOGLE_SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (typeof window.googleTranslateElementInit === 'function') {
      window.googleTranslateElementInit();
    }
  }

  function syncGoogleCombo(lang) {
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      var combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang === 'es' ? '' : lang;
        if (typeof Event === 'function') {
          combo.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          var event = document.createEvent('HTMLEvents');
          event.initEvent('change', true, true);
          combo.dispatchEvent(event);
        }
        clearInterval(timer);
      }
      if (tries > 40) clearInterval(timer);
    }, 240);
  }

  function setHtmlLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    SUPPORTED_LANGS.forEach(function (code) {
      document.documentElement.classList.toggle('translated-' + code, lang === code);
    });
  }

  function updateButtons(lang) {
    document.querySelectorAll('[data-lady-aura-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-lady-aura-lang') === lang ? 'true' : 'false');
    });
  }

  function protectArtworkTitles(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var selectors = [
      '.product-card h3',
      '.zod-card h3',
      '.sign-card h3',
      '.cart-item-info h3',
      '#lbTitle',
      '.lb-title',
      '.gallery-card-label',
      '[data-artwork-title]'
    ].join(',');

    scope.querySelectorAll(selectors).forEach(function (el) {
      el.classList.add('notranslate');
      el.setAttribute('translate', 'no');
      if (!el.getAttribute('data-no-translate')) {
        el.setAttribute('data-no-translate', 'artwork-title');
      }
    });

    scope.querySelectorAll('img[alt]').forEach(function (img) {
      var alt = img.getAttribute('alt') || '';
      if (/diamond painting/i.test(alt) || /Lady Aura/i.test(alt)) {
        img.classList.add('notranslate');
        img.setAttribute('translate', 'no');
      }
    });
  }

  function applyLanguage(lang, options) {
    var shouldReload = options && options.reload;
    saveLanguage(lang);
    setHtmlLanguage(lang);
    updateButtons(lang);
    protectArtworkTitles(document);

    if (lang !== 'es') {
      setTranslateCookie(lang);
      ensureGoogleWidget();
      syncGoogleCombo(lang);
      if (shouldReload) {
        setTimeout(function () {
          location.reload();
        }, 500);
      }
    } else {
      removeTranslateCookie();
      if (shouldReload) {
        location.reload();
      }
    }
  }

  function addToggle() {
    if (document.querySelector('.lady-aura-language')) return;
    var header = document.getElementById('site-header') || document.querySelector('.site-header') || document.querySelector('header');
    var actions = document.querySelector('.lady-aura-header-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'lady-aura-header-actions';
      actions.setAttribute('aria-label', 'Carrito e idioma');
    }
    var navCart = document.querySelector('.site-header .cart-nav-link') || document.querySelector('.cart-nav-link');
    if (navCart && !actions.contains(navCart)) {
      actions.appendChild(navCart);
    }
    var wrap = document.createElement('div');
    wrap.className = 'lady-aura-language';
    wrap.setAttribute('aria-label', 'Selector de idioma');
    wrap.innerHTML = SUPPORTED_LANGS.map(function (code) {
      var meta = LANG_META[code];
      return '<button type="button" data-lady-aura-lang="' + code + '" aria-label="' + meta.label + '" title="' + meta.title + '"><span class="flag-icon flag-' + code + '" aria-hidden="true"></span></button>';
    }).join('');
    wrap.addEventListener('click', function (event) {
      var button = event.target.closest('[data-lady-aura-lang]');
      if (!button) return;
      applyLanguage(button.getAttribute('data-lady-aura-lang'), { reload: true });
    });
    actions.appendChild(wrap);
    if (header && !header.contains(actions)) {
      header.appendChild(actions);
    } else if (!header) {
      document.body.appendChild(actions);
    }
  }

  function bindMobileMenu() {
    var menuToggle = document.getElementById('menuToggle') || document.querySelector('.site-header .menu-toggle');
    var nav = document.getElementById('nav') || document.querySelector('.site-header .nav');
    if (!menuToggle || !nav || menuToggle.dataset.ladyAuraBound === '1') return;
    menuToggle.dataset.ladyAuraBound = '1';
    menuToggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var isOpen = nav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }, true);
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function paginateCardGrids(reset) {
    var selectors = [
      '.products-grid',
      '.grid-laminas',
      '.gallery-grid',
      '.collections-grid',
      '.tools-grid'
    ].join(',');

    document.querySelectorAll(selectors).forEach(function (grid) {
      if (reset) {
        delete grid.dataset.ladyAuraPaged;
        if (grid.nextElementSibling && grid.nextElementSibling.classList.contains('lady-aura-pagination')) {
          grid.nextElementSibling.remove();
        }
      }
      if (grid.nextElementSibling && grid.nextElementSibling.classList.contains('pagination') && !grid.nextElementSibling.classList.contains('lady-aura-pagination')) {
        grid.nextElementSibling.remove();
      }
      if (grid.dataset.ladyAuraPaged === '1') return;

      var cards = Array.prototype.slice.call(grid.children).filter(function (el) {
        return el.nodeType === 1 && !el.classList.contains('pagination');
      });
      var itemsPerPage = 10;
      if (cards.length <= itemsPerPage) return;

      grid.dataset.ladyAuraPaged = '1';
      var totalPages = Math.ceil(cards.length / itemsPerPage);
      var currentPage = 1;
      var pag = document.createElement('div');
      pag.className = 'pagination lady-aura-pagination';
      pag.setAttribute('aria-label', 'Paginacion de tarjetas');
      grid.parentNode.insertBefore(pag, grid.nextSibling);

      function showPage(page, shouldScroll) {
        currentPage = Math.max(1, Math.min(totalPages, page));
        cards.forEach(function (card, i) {
          card.style.display = (i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage) ? '' : 'none';
        });
        renderPagination();
        if (shouldScroll) {
          window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
        }
      }

      function renderPagination() {
        pag.innerHTML = '';
        var prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
        prev.textContent = '←';
        prev.disabled = currentPage === 1;
        prev.setAttribute('aria-label', 'Pagina anterior');
        prev.addEventListener('click', function () { showPage(currentPage - 1, true); });
        pag.appendChild(prev);

        for (var i = 1; i <= totalPages; i += 1) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
          btn.textContent = i;
          btn.setAttribute('aria-label', 'Pagina ' + i);
          btn.addEventListener('click', (function (page) {
            return function () { showPage(page, true); };
          })(i));
          pag.appendChild(btn);
        }

        var next = document.createElement('button');
        next.type = 'button';
        next.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
        next.textContent = '→';
        next.disabled = currentPage === totalPages;
        next.setAttribute('aria-label', 'Pagina siguiente');
        next.addEventListener('click', function () { showPage(currentPage + 1, true); });
        pag.appendChild(next);
      }

      showPage(1, false);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    addStyles();
    normalizeHeader();
    addToggle();
    bindMobileMenu();
    protectArtworkTitles(document);
    var titleObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) protectArtworkTitles(node);
        });
      });
    });
    titleObserver.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { paginateCardGrids(false); }, 0);
    applyLanguage(getInitialLanguage(), { reload: false });
  });

  window.addEventListener('ladyAuraLangChanged', function () {
    protectArtworkTitles(document);
    setTimeout(function () { paginateCardGrids(true); }, 0);
  });
})();
