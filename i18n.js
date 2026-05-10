/* ============================================================
   LADY AURA ART · i18n.js
   Traducción ES / EN compartida entre todas las páginas.
   Lee el idioma de localStorage y aplica las traducciones.
   ============================================================ */

const LA_TRANSLATIONS = {
  es: {
    /* ── NAV (todas las páginas) ── */
    nav_inicio:       'Inicio',
    nav_zodiaco:      '♈ Zodíaco',
    nav_parejas:      '💑 Parejas',
    nav_paisajes:     '🏔️ Paisajes',
    nav_especiales:   '✨ Diseños exclusivos',
    nav_personalizados:'🎨 Personalizados',
    nav_tarot:        '🔮 Tarot',
    nav_colorear:     '🎨 Colorear',

    /* ── ESPECIALES ── */
    esp_title:        '✨ Diseños exclusivos',
    esp_sub:          'Cuadros únicos que no encontrarás en ningún otro sitio',
    esp_dudas:        '¿Te quedaste con dudas?',
    esp_dudas_sub:    'Escríbeme por WhatsApp y te respondo personalmente',
    esp_wa:           '💬 Escríbeme por WhatsApp',
    esp_lb_eyebrow:   '✦ Diamond Painting Premium · Lady Aura Art ✦',
    esp_lb_includes:  'Incluye',
    esp_lb_formato:   '📐 Formato 60×90 cm',
    esp_lb_diamantes: '💎 Diamantes alta densidad',
    esp_lb_lienzo:    '🎨 Lienzo de alta calidad premium',
    esp_lb_herram:    '🛠️ Herramientas incluidas',
    esp_lb_instruc:   '📖 Instrucciones en español',
    esp_lb_diseno:    '✨ Diseño exclusivo Lady Aura',
    esp_lb_envio:     '✈️ Envío incluido',
    esp_dudas_link:   '💬 ¿Dudas? Escríbeme',

    /* ── PAISAJES ── */
    pai_title:        '🏔️ Paisajes',
    pai_sub:          'Mundos imposibles y naturaleza mágica para decorar y soñar',

    /* ── PAREJAS ── */
    par_title:        '💑 Parejas',
    par_sub:          'Amor, romance y magia oscura. El regalo perfecto para dos',

    /* ── ZODIACO ── */
    zod_title:        'Tu Signo Convertido<br>en Arte con Diamantes',
    zod_sub:          'Los 12 Signos del Zodíaco',
    zod_tab_fem:      '♀ Femenino',
    zod_tab_masc:     '♂ Masculino',
    zod_no_signo:     '¿No encuentras tu signo?<br>Escríbeme directamente',
    zod_lb_eyebrow:   '✦ Diamond Painting Premium · Lady Aura Art ✦',

    /* ── TAROT ── */
    tar_title_es:     'Echar las Cartas del Tarot Gratis<br>Tiradas Online en Español 🔮',
    tar_sub_es:       'Tarot diario, semanal y de amor. Sin registro, sin pago.',
    tar_btn_day:      '🌙 Tirada del Día',
    tar_btn_week:     '🌟 Tirada Semanal',
    tar_btn_love:     '❤️ Tirada de Amor',
    tar_shop_title:   '🖼️ Cuadros de Tarot',
    tar_shop_sub:     'Diamond painting de las 22 Arcanos Mayores. Diseños exclusivos.',

    /* ── COLOREAR ── */
    col_title:        '🎨 Láminas para Colorear Adultos<br>Estilo Fantasy · PDF A4',
    col_sub:          'Una lámina gratis sin registro. Descarga en PDF A4.',
    col_gratis:       'Una lámina gratis',
    col_premium:      'Pack completo',

    /* ── PERSONALIZADOS ── */
    per_title:        'Tu Retrato<br>Convertido en Magia',
    per_como:         '¿Cómo funciona?',
    per_ejemplos:     'Ejemplos reales',
    per_faq:          'Preguntas frecuentes',
    per_cta:          '¿Lista para tener tu retrato<br>en diamantes? ✨',
    per_eyebrow:      '✦ Diseño Exclusivo · Solo para ti · Lady Aura Art ✦',

    /* ── CARRITO ── */
    cart_title:       '🛒 Mi carrito',
    cart_empty_title: 'Tu carrito está vacío',
    cart_empty_sub:   'Explora nuestras colecciones y encuentra tu diamond painting perfecto.',
    cart_btn_shop:    '✨ Ver colecciones',
    cart_summary:     'Resumen',
    cart_items:       'Diseños seleccionados',
    cart_format:      'Formato',
    cart_format_val:  '60×90 cm · Diamond painting premium',
    cart_envio:       'Envío',
    cart_envio_val:   '✓ Incluido',
    cart_total:       'Total',
    cart_form_title:  '✨ Confirma tu pedido',
    cart_form_sub:    'Rellena tus datos y te contactaré en menos de 24h para coordinar el pago y el envío.',
    cart_nombre:      'Nombre *',
    cart_apellidos:   'Apellidos *',
    cart_email:       'Email *',
    cart_telefono:    'Teléfono',
    cart_direccion:   'Dirección de envío *',
    cart_ciudad:      'Ciudad *',
    cart_cp:          'Código postal *',
    cart_pais:        'País *',
    cart_notas:       'Notas adicionales',
    cart_btn_confirm: '✨ Confirmar pedido',
    cart_confirm_title:'¡Pedido enviado!',
    cart_confirm_sub: 'Gracias por tu confianza. Te he enviado una copia a tu email.',
    cart_confirm_sub2:'Me pondré en contacto contigo en menos de 24h para coordinar el pago.',
    cart_wa_btn:      '💬 Hablar por WhatsApp',

    /* ── PEDIDOS ── */
    ped_title:        '📦 Mis pedidos',
    ped_sub:          'Aquí puedes seguir el estado de todos tus pedidos',
    ped_empty_title:  'Aún no tienes pedidos',
    ped_empty_sub:    'Cuando realices tu primer pedido aparecerá aquí.',
    ped_btn_shop:     '✨ Ver colecciones',
    ped_recibido:     '✓ Marcar como recibido',
    ped_recibido_done:'✓ Recibido',
    ped_privacy:      '🔒 Tus pedidos se guardan solo en este dispositivo. Si cambias de navegador o borras los datos del sitio, esta información desaparecerá. Guarda el email de confirmación como referencia.',

    /* ── LIGHTBOX COMÚN ── */
    lb_add_cart:      '🛒 Añadir al carrito',
    lb_added:         '✓ Añadido al carrito',
    lb_dudas:         '💬 ¿Dudas? Escríbeme',
    lb_formato:       'Diamond painting 60×90 cm · Envío incluido',
    lb_vertical:      '↕ Cuadro Vertical · 60×90 cm',
    lb_horizontal:    '↔ Cuadro Horizontal · 90×60 cm',
  },

  en: {
    /* ── NAV ── */
    nav_inicio:       'Home',
    nav_zodiaco:      '♈ Zodiac',
    nav_parejas:      '💑 Couples',
    nav_paisajes:     '🏔️ Landscapes',
    nav_especiales:   '✨ Exclusive designs',
    nav_personalizados:'🎨 Custom art',
    nav_tarot:        '🔮 Tarot',
    nav_colorear:     '🎨 Coloring',

    /* ── ESPECIALES ── */
    esp_title:        '✨ Exclusive designs',
    esp_sub:          'Unique pieces you won\'t find anywhere else',
    esp_dudas:        'Still have questions?',
    esp_dudas_sub:    'Message me on WhatsApp and I\'ll reply personally',
    esp_wa:           '💬 Message me on WhatsApp',
    esp_lb_eyebrow:   '✦ Premium Diamond Painting · Lady Aura Art ✦',
    esp_lb_includes:  'Includes',
    esp_lb_formato:   '📐 60×90 cm format',
    esp_lb_diamantes: '💎 High density diamonds',
    esp_lb_lienzo:    '🎨 Premium quality canvas',
    esp_lb_herram:    '🛠️ Tools included',
    esp_lb_instruc:   '📖 Instructions in English',
    esp_lb_diseno:    '✨ Exclusive Lady Aura design',
    esp_lb_envio:     '✈️ Free shipping',
    esp_dudas_link:   '💬 Questions? Message me',

    /* ── PAISAJES ── */
    pai_title:        '🏔️ Landscapes',
    pai_sub:          'Impossible worlds and magical nature to decorate and dream',

    /* ── PAREJAS ── */
    par_title:        '💑 Couples',
    par_sub:          'Love, romance and dark magic. The perfect gift for two',

    /* ── ZODIACO ── */
    zod_title:        'Your Sign Turned Into<br>Diamond Art',
    zod_sub:          'All 12 Zodiac Signs',
    zod_tab_fem:      '♀ Feminine',
    zod_tab_masc:     '♂ Masculine',
    zod_no_signo:     'Can\'t find your sign?<br>Message me directly',
    zod_lb_eyebrow:   '✦ Premium Diamond Painting · Lady Aura Art ✦',

    /* ── TAROT ── */
    tar_title_es:     'Free Online Tarot Card Reading<br>Love, Daily & Weekly Spreads 🔮',
    tar_sub_es:       'Daily, weekly and love readings. No sign up, no payment.',
    tar_btn_day:      '🌙 Daily Reading',
    tar_btn_week:     '🌟 Weekly Reading',
    tar_btn_love:     '❤️ Love Reading',
    tar_shop_title:   '🖼️ Tarot Diamond Paintings',
    tar_shop_sub:     'Diamond painting of the 22 Major Arcana. Exclusive designs.',

    /* ── COLOREAR ── */
    col_title:        '🎨 Adult Coloring Pages<br>Fantasy Style · A4 PDF',
    col_sub:          'One free page, no sign up. Download in A4 PDF.',
    col_gratis:       'One free page',
    col_premium:      'Full pack',

    /* ── PERSONALIZADOS ── */
    per_title:        'Your Portrait<br>Turned Into Magic',
    per_como:         'How does it work?',
    per_ejemplos:     'Real examples',
    per_faq:          'FAQ',
    per_cta:          'Ready to get your portrait<br>in diamonds? ✨',
    per_eyebrow:      '✦ Exclusive Design · Just for you · Lady Aura Art ✦',

    /* ── CARRITO ── */
    cart_title:       '🛒 My cart',
    cart_empty_title: 'Your cart is empty',
    cart_empty_sub:   'Explore our collections and find your perfect diamond painting.',
    cart_btn_shop:    '✨ View collections',
    cart_summary:     'Summary',
    cart_items:       'Selected designs',
    cart_format:      'Format',
    cart_format_val:  '60×90 cm · Premium diamond painting',
    cart_envio:       'Shipping',
    cart_envio_val:   '✓ Free',
    cart_total:       'Total',
    cart_form_title:  '✨ Confirm your order',
    cart_form_sub:    'Fill in your details and I\'ll contact you within 24h to arrange payment and shipping.',
    cart_nombre:      'First name *',
    cart_apellidos:   'Last name *',
    cart_email:       'Email *',
    cart_telefono:    'Phone',
    cart_direccion:   'Shipping address *',
    cart_ciudad:      'City *',
    cart_cp:          'Postal code *',
    cart_pais:        'Country *',
    cart_notas:       'Additional notes',
    cart_btn_confirm: '✨ Confirm order',
    cart_confirm_title:'Order sent!',
    cart_confirm_sub: 'Thank you for your trust. I\'ve sent a copy to your email.',
    cart_confirm_sub2:'I\'ll contact you within 24h to arrange payment.',
    cart_wa_btn:      '💬 Chat on WhatsApp',

    /* ── PEDIDOS ── */
    ped_title:        '📦 My orders',
    ped_sub:          'Here you can track the status of all your orders',
    ped_empty_title:  'You have no orders yet',
    ped_empty_sub:    'When you place your first order it will appear here.',
    ped_btn_shop:     '✨ View collections',
    ped_recibido:     '✓ Mark as received',
    ped_recibido_done:'✓ Received',
    ped_privacy:      '🔒 Your orders are stored only on this device. If you change browser or clear site data, this information will be lost. Save your confirmation email as reference.',

    /* ── LIGHTBOX COMÚN ── */
    lb_add_cart:      '🛒 Add to cart',
    lb_added:         '✓ Added to cart',
    lb_dudas:         '💬 Questions? Message me',
    lb_formato:       'Diamond painting 60×90 cm · Free shipping',
    lb_vertical:      '↕ Vertical · 60×90 cm',
    lb_horizontal:    '↔ Horizontal · 90×60 cm',
  }
};

/* ── Aplicar traducciones ── */
function applyLang(lang) {
  const t = LA_TRANSLATIONS[lang];
  if (!t) return;

  // Guardar y marcar botones activos si existen en esta página
  localStorage.setItem('la_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('btn-' + lang);
  if (activeBtn) activeBtn.classList.add('active');

  // Aplicar por data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Aplicar placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
}

// setLang global (para onclick en los botones de bandera)
function setLang(lang) { applyLang(lang); }

// Aplicar al cargar
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('la_lang') || 'es';
  applyLang(saved);
});
