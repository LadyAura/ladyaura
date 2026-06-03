/* ============================================================
   LADY AURA ART · Emparejador incremental de imagenes
   ============================================================ */
(function() {
  const SIZE_50X70_RE = /(?:50\s*x\s*70|70\s*x\s*50)/i;
  const SIZE_50X70_REPLACE = /(?:50\s*x\s*70|70\s*x\s*50)/gi;
  const SIZE_VARIANT_REPLACE = /(?:50\s*x\s*70|70\s*x\s*50|60\s*x\s*90|90\s*x\s*60|40\s*x\s*60|60\s*x\s*40)/gi;
  const IMAGE_EXT_RE = /\.(?:avif|webp|png|jpe?g|gif|svg)$/i;

  function cleanFilename(filename) {
    return String(filename || '')
      .split('?')[0]
      .split('#')[0]
      .split(/[\\/]/)
      .pop();
  }

  function normalizeName(filename) {
    return cleanFilename(filename)
      .replace(IMAGE_EXT_RE, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(SIZE_VARIANT_REPLACE, ' ')
      .replace(/[-_()]+/g, ' ')
      .replace(/[^a-z0-9\s]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function classifyImage(filename) {
    return SIZE_50X70_RE.test(cleanFilename(filename)) ?'version_50x70' : 'original';
  }

  function createImagePairStore(initialImages) {
    const groups = new Map();

    function ensureGroup(baseName) {
      if (!groups.has(baseName)) {
        groups.set(baseName, {
          baseName: baseName,
          originals: [],
          versions50x70: []
        });
      }
      return groups.get(baseName);
    }

    function addImage(image) {
      const src = typeof image === 'string' ?image : image && image.src;
      if (!src) return;

      const baseName = normalizeName(src);
      if (!baseName) return;

      const kind = (image && image.kind) || classifyImage(src);
      const group = ensureGroup(baseName);
      const bucket = kind === 'version_50x70' ?group.versions50x70 : group.originals;

      if (!bucket.includes(src)) bucket.push(src);
    }

    function registerBatch(images) {
      (images || []).forEach(addImage);
      return list();
    }

    function toProduct(group) {
      const originalImage = group.originals[0] || null;
      const image50x70 = group.versions50x70[0] || null;
      let status = 'matched';

      if (group.originals.length > 1 || group.versions50x70.length > 1) status = 'review_needed';
      else if (!originalImage && image50x70) status = 'missing_original';
      else if (originalImage && !image50x70) status = 'missing_50x70';
      else if (!originalImage && !image50x70) status = 'review_needed';

      return {
        baseName: group.baseName,
        originalImage: originalImage,
        image50x70: image50x70,
        status: status,
        originalCandidates: group.originals.slice(),
        image50x70Candidates: group.versions50x70.slice()
      };
    }

    function list() {
      return Array.from(groups.values()).map(toProduct).sort(function(a, b) {
        return a.baseName.localeCompare(b.baseName);
      });
    }

    function get(baseNameOrFilename) {
      const baseName = normalizeName(baseNameOrFilename);
      const group = groups.get(baseName);
      return group ?toProduct(group) : null;
    }

    registerBatch(initialImages || []);

    return { registerBatch: registerBatch, list: list, get: get };
  }

  function resolveImageForSize(productOrCard, selectedSize) {
    const size = String(selectedSize || '').toLowerCase();
    const originalImage = productOrCard && (
      productOrCard.originalImage ||
      productOrCard.dataset && (productOrCard.dataset.originalImage || productOrCard.dataset.img)
    );
    const image50x70 = productOrCard && (
      productOrCard.image50x70 ||
      productOrCard.dataset && productOrCard.dataset.image50x70
    );

    if (/(?:50\s*x\s*70|70\s*x\s*50)/i.test(size)) return image50x70 || originalImage || '';
    return originalImage || '';
  }

  const nedeka50x70Batch = [
    'assets/abejita-dorada-50x70.webp',
    'assets/alita-colibri-50x70.webp',
    'assets/alya-diosa-enjoyada-50x70.webp',
    'assets/ammonet-50x70.webp',
    'assets/aratiana-50x70.webp',
    'assets/bernabe-50x70.webp',
    'assets/abrazo-de-oriana-50x70.webp',
    'assets/bruster-punky-50x70.webp',
    'assets/caminante-galactica-50x70.webp',
    'assets/cita-a-ciegas-50x70.webp',
    'assets/contigo-me-siento-en-casa-50x70.webp',
    'assets/diosa-del-oceano-50x70.webp',
    'assets/elfa-del-bosque-neon-50x70.webp',
    'assets/heart-robogirl-50x70.webp',
    'assets/hestia-diosa-del-fuego-50x70.webp',
    'assets/noche-magica-50x70.webp',
    'assets/la-fiesta-de-los-monigotes-50x70.webp',
    'assets/jacecat-50x70.webp',
    'assets/mariquita-de-flores-50x70.webp',
    'assets/nedeka-ojo-cosmico-50x70.webp',
    'assets/nedeka-reina-del-papiro-50x70.webp',
    'assets/princesa-nesa-50x70.webp',
    'assets/rania-50x70.webp',
    'assets/scarlett-wolf-50x70.webp',
    'assets/sirena-nexralia-50x70.webp',
    'assets/sirena-perla-rosa-50x70.webp',
    'assets/viaje-en-dirigible-50x70.webp',
    'assets/vida-en-la-selva-50x70.webp'
  ];

  const aura50x70Batch = [
    'assets/aura-dama-galactica-retro-50x70.webp',
    'assets/aura-jardin-de-planetas-dorados-50x70.webp',
    'assets/aura-guardiana-del-lobo-estelar-50x70.webp',
    'assets/aura-noche-de-aurora-y-amigas-50x70.webp',
    'assets/aura-princesa-amatista-lunar-50x70.webp',
    'assets/aura-hechicera-de-luna-roja-50x70.webp',
    'assets/aura-mariposa-de-luz-violeta-50x70.webp',
    'assets/almas-de-luz-50x70.webp',
    'assets/hada-del-lago-lunar-50x70.webp',
    'assets/arbol-de-cristal-lunar-50x70.webp',
    'assets/abrazo-bajo-la-luna-roja-50x70.webp',
    'assets/rincon-encantado-de-magia-y-luz-50x70.webp',
    'assets/aura-luna-rosa-de-cristal-50x70.webp',
    'assets/aura-guardianas-de-luz-violeta-50x70.webp',
    'assets/aura-princesa-unicornio-lunar-50x70.webp',
    'assets/aura-rincon-de-hada-y-luna-50x70.webp',
    'assets/aura-eleccion-del-sol-y-la-luna-50x70.webp'
  ];

  const store = createImagePairStore();

  function hydrateProductCards() {
    const cards = document.querySelectorAll('.product-card[data-img]');
    const originalBatch = Array.from(cards).map(function(card) {
      return { src: card.dataset.img, kind: 'original' };
    });

    store.registerBatch(originalBatch);
    store.registerBatch(nedeka50x70Batch.map(function(src) {
      return { src: src, kind: 'version_50x70' };
    }));
    store.registerBatch(aura50x70Batch.map(function(src) {
      return { src: src, kind: 'version_50x70' };
    }));

    cards.forEach(function(card) {
      const pair = store.get(card.dataset.img);
      if (!pair) return;

      card.dataset.baseName = pair.baseName;
      card.dataset.originalImage = pair.originalImage || card.dataset.img || '';
      card.dataset.image50x70 = pair.image50x70 || card.dataset.image50x70 || '';
      card.dataset.pairStatus = pair.status;
    });

    window.LADY_AURA_IMAGE_PAIRS = store.list();
    window.NEDEKA_IMAGE_PAIRS = store.list();
    window.AURA_IMAGE_PAIRS = store.list();
  }

  window.LadyAuraImagePairs = {
    normalizeName: normalizeName,
    classifyImage: classifyImage,
    createImagePairStore: createImagePairStore,
    registerBatch: store.registerBatch,
    list: store.list,
    getProductPair: store.get,
    resolveImageForSize: resolveImageForSize,
    nedeka50x70Batch: nedeka50x70Batch,
    aura50x70Batch: aura50x70Batch,
    hydrateProductCards: hydrateProductCards
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateProductCards);
  } else {
    hydrateProductCards();
  }
})();
