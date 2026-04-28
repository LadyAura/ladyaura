/* ===== Estrellas decorativas ===== */
const starsContainer = document.getElementById("stars");
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

/* ===== Menú móvil ===== */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});
nav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("active"));
});

/* ===== Lightbox (ficha ampliada) ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxPrice = document.getElementById("lightbox-price");
const lightboxWhatsapp = document.getElementById("lightbox-whatsapp");
const lightboxEmail = document.getElementById("lightbox-email");
const closeBtn = document.querySelector(".lightbox-close");

/* Construir URLs de pre-reserva */
function buildWhatsappUrl(titulo, precio) {
  const text = `Hola Lady Aura ✨ Quiero pre-reservar el diseño: ${titulo}. Diamond painting 60x90, precio ${precio}€. ¡Gracias!`;
  return `https://wa.me/34621355638?text=${encodeURIComponent(text)}`;
}

function buildEmailUrl(titulo, precio) {
  const subject = encodeURIComponent(`Pre-reserva Lady Aura - ${titulo}`);
  const body = encodeURIComponent(
    `Hola Lady Aura, me interesa pre-reservar el diseño: ${titulo}. Formato: 60x90. Precio pre-reserva: ${precio}€.\n\nMis datos:\nNombre:\nEmail de contacto:\n\nMe avisas cuando la tienda esté abierta oficialmente y decido si confirmar. ¡Gracias! ✨`
  );
  return `https://mail.google.com/mail/?view=cm&fs=1&to=lady.aura.2025@gmail.com&su=${subject}&body=${body}`;
}

/* Cards de producto */
document.querySelectorAll(".product-card").forEach((card) => {
  const opener = card.querySelector(".image-open");
  if (!opener) return;
  const img = card.querySelector("img");
  const title = card.querySelector("h3")?.textContent || "Diseño Lady Aura";
  const price = card.dataset.price || "94";
  const oldPrice = card.dataset.oldPrice;

  opener.addEventListener("click", () => {
    try {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = title;
      if (oldPrice) {
        // Oferta: mostrar precio tachado y oferta
        lightboxPrice.innerHTML = `Diamond painting 60×90 cm · <span style="text-decoration:line-through;opacity:0.6;font-size:1.1rem;">${oldPrice} €</span> <strong>${price} €</strong> · Envío incluido`;
      } else {
        // Normal: sin precio, solo info
        lightboxPrice.textContent = `Diamond painting 60×90 cm · Envío incluido`;
      }
      lightboxWhatsapp.href = buildWhatsappUrl(title, price);
      lightboxEmail.href = buildEmailUrl(title, price);
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    } catch(err) {
      console.error("Error abriendo lightbox:", err);
    }
  });
});

/* Cards del zodiaco */
document.querySelectorAll(".zodiac-card").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const titulo = card.dataset.title || card.querySelector("span")?.textContent || "Diseño Lady Aura";
      const imgSrc = card.dataset.img || card.querySelector("img")?.src || "";
      if (!imgSrc) return;
      lightboxImg.src = imgSrc;
      lightboxImg.alt = titulo;
      lightboxTitle.textContent = titulo;
      lightboxPrice.textContent = "Diamond painting 60×90 cm · Envío incluido";
      lightboxWhatsapp.href = buildWhatsappUrl(titulo, "94");
      lightboxEmail.href = buildEmailUrl(titulo, "94");
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    } catch(err) {
      console.error("Error abriendo lightbox:", err);
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
});
