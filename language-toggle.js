(function () {
  'use strict';

  var STORAGE_KEY = 'ladyaura_site_lang';
  var COOKIE_DOMAIN = location.hostname && location.hostname !== 'localhost' ? ';domain=' + location.hostname : '';
  var GOOGLE_SCRIPT_ID = 'google-translate-script';
  var WIDGET_ID = 'google_translate_element';

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

  function browserPrefersEnglish() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || ''];
    return /^en\b/i.test(languages[0] || '');
  }

  function getInitialLanguage() {
    var stored = getStoredLanguage();
    if (stored === 'en' || stored === 'es') return stored;
    return browserPrefersEnglish() ? 'en' : 'es';
  }

  function setTranslateCookie(lang) {
    var value = lang === 'en' ? '/es/en' : '/es/es';
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
      '.site-header{display:flex!important;align-items:center!important;gap:.8rem!important;overflow:visible!important}',
      '.site-header .brand{display:inline-flex!important;align-items:center!important;flex:0 0 auto!important}',
      '.site-header .brand img{display:block!important;max-height:58px!important;width:auto!important;object-fit:contain!important}',
      '.site-header .nav{align-items:center!important;gap:.55rem!important}',
      '.site-header .nav a{white-space:nowrap!important}',
      '.site-header .menu-toggle{width:42px;height:38px;border:1px solid rgba(255,217,138,.28);border-radius:999px;background:rgba(8,4,20,.68);color:#fff;font-size:1.2rem;line-height:1;cursor:pointer;align-items:center;justify-content:center;flex:0 0 auto}',
      '.site-header .header-button{white-space:nowrap!important}',
      '.lady-aura-header-actions{display:flex;align-items:center;gap:.45rem;margin-left:.35rem;position:relative;z-index:10002}',
      '.lady-aura-header-actions .cart-nav-link{display:inline-flex!important;align-items:center;justify-content:center;min-width:38px;min-height:34px;padding:.25rem .45rem!important;border:1px solid rgba(255,217,138,.25);border-radius:999px;background:rgba(8,4,20,.55);text-decoration:none!important}',
      '.lady-aura-language{display:flex;align-items:center;gap:4px;padding:3px;border:1px solid rgba(255,217,138,.32);border-radius:999px;background:rgba(8,4,20,.64);box-shadow:0 8px 22px rgba(0,0,0,.24);backdrop-filter:blur(10px);font-family:Arial,sans-serif}',
      '.lady-aura-language button{width:32px;height:28px;border:0;border-radius:999px;background:transparent;color:#fff;cursor:pointer;font-size:17px;line-height:1;display:inline-flex;align-items:center;justify-content:center;transition:transform .18s,background .18s,box-shadow .18s}',
      '.lady-aura-language button:hover{transform:translateY(-1px);background:rgba(255,255,255,.10)}',
      '.lady-aura-language button[aria-pressed="true"]{background:linear-gradient(135deg,rgba(160,63,255,.72),rgba(255,72,137,.55));box-shadow:0 0 18px rgba(160,63,255,.42)}',
      '#google_translate_element{position:fixed!important;left:-9999px!important;top:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;display:block!important;opacity:.01!important;pointer-events:none!important}',
      '.goog-te-banner-frame,.goog-te-balloon-frame,.goog-logo-link{display:none!important}',
      'body{top:0!important}',
      'body > .skiptranslate{display:none!important}',
      '@media(max-width:1180px){.site-header{position:sticky!important;min-height:68px;justify-content:flex-start!important}.site-header .header-button{display:none!important}.site-header .menu-toggle{display:flex!important;order:97;margin-left:auto}.site-header .lady-aura-header-actions{margin-left:.4rem;order:99}.site-header .nav .cart-nav-link{display:none!important}.lady-aura-header-actions .cart-nav-link{position:relative!important}.site-header .nav{position:absolute!important;top:100%!important;right:4%!important;left:auto!important;display:none!important;flex-direction:column!important;align-items:flex-end!important;min-width:220px!important;width:max-content!important;max-width:min(92vw,320px)!important;padding:.9rem 1rem!important;border:1px solid rgba(255,217,138,.18)!important;border-radius:18px!important;background:rgba(8,4,20,.96)!important;box-shadow:0 18px 42px rgba(0,0,0,.45)!important;backdrop-filter:blur(18px)!important;z-index:10001!important}.site-header .nav.active{display:flex!important}.site-header .nav a{width:100%!important;text-align:right!important;padding:.65rem 0!important;border-bottom:1px solid rgba(255,217,138,.12)!important}.site-header .nav a:last-child{border-bottom:none!important}.lady-aura-language button{width:30px;height:27px;font-size:16px}}',
      '@media(max-width:560px){.site-header{padding-right:.75rem!important}.site-header .brand img{max-width:150px;height:auto}.lady-aura-header-actions{gap:.32rem}.lady-aura-header-actions .cart-nav-link{min-width:34px;min-height:31px;padding:.18rem .35rem!important}.lady-aura-language{gap:2px;padding:2px}.lady-aura-language button{width:27px;height:25px;font-size:15px}}'
    ].join('');
    document.head.appendChild(style);
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
        includedLanguages: 'es,en',
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
        combo.value = lang === 'en' ? 'en' : '';
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
    document.documentElement.classList.toggle('translated-en', lang === 'en');
    document.documentElement.classList.toggle('translated-es', lang === 'es');
  }

  function updateButtons(lang) {
    document.querySelectorAll('[data-lady-aura-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-lady-aura-lang') === lang ? 'true' : 'false');
    });
  }

  function applyLanguage(lang, options) {
    var shouldReload = options && options.reload;
    saveLanguage(lang);
    setHtmlLanguage(lang);
    updateButtons(lang);

    if (lang === 'en') {
      setTranslateCookie('en');
      ensureGoogleWidget();
      syncGoogleCombo('en');
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
    wrap.innerHTML = '<button type="button" data-lady-aura-lang="es" aria-label="Ver en español" title="Español">🇪🇸</button><button type="button" data-lady-aura-lang="en" aria-label="View in English" title="English">🇬🇧</button>';
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

  document.addEventListener('DOMContentLoaded', function () {
    addStyles();
    addToggle();
    bindMobileMenu();
    applyLanguage(getInitialLanguage(), { reload: false });
  });
})();
