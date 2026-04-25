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
const lightboxBuy = document.getElementById("lightbox-buy");
const closeBtn = document.querySelector(".lightbox-close");

/* Cards de producto */
document.querySelectorAll(".product-card").forEach((card) => {
  const opener = card.querySelector(".image-open");
  const img = card.querySelector("img");
  const title = card.querySelector("h3")?.textContent || "Diseño Lady Aura";
  const buy = card.querySelector(".mini-btn.buy")?.href || "#";
  const price = card.dataset.price || "94";
  const oldPrice = card.dataset.oldPrice;

  opener.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    if (oldPrice) {
      lightboxPrice.innerHTML = `Diamond painting 60×90 cm · <span style="text-decoration:line-through;opacity:0.6;font-size:1.1rem;">${oldPrice} €</span> <strong>${price} €</strong>`;
    } else {
      lightboxPrice.textContent = `Diamond painting 60×90 cm · ${price} €`;
    }
    lightboxBuy.href = buy;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

/* Cards del zodiaco */
document.querySelectorAll(".zodiac-card").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    lightboxImg.src = card.dataset.img;
    lightboxImg.alt = card.dataset.title;
    lightboxTitle.textContent = card.dataset.title;
    lightboxPrice.textContent = "Diamond painting 60×90 cm · 94 €";
    const subject = encodeURIComponent(`Pre-reserva Lady Aura - ${card.dataset.title}`);
    const body = encodeURIComponent(
      `Hola Lady Aura, me interesa pre-reservar el diseño: ${card.dataset.title}. Formato: 60x90. Precio pre-reserva: 94€.\n\nMis datos:\nNombre:\nEmail de contacto:\n\nMe avisas cuando la tienda esté abierta oficialmente y decido si confirmar. ¡Gracias! ✨`
    );
    lightboxBuy.href = `https://mail.google.com/mail/?view=cm&fs=1&to=lady.aura.2025@gmail.com&su=${subject}&body=${body}`;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
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
