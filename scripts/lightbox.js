// scripts/lightbox.js
(function () {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose"); // может быть, но не обязателен

  if (!lb || !lbImg) return;

  let currentSrc = "";

  function openLightbox(src, alt) {
    currentSrc = src;
    lbImg.src = src;
    lbImg.alt = alt || "Фото";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    currentSrc = "";
    document.body.style.overflow = "";
  }

  // Клик по превью: если уже открыто это же фото — закрыть (toggle)
  document.addEventListener("click", function (e) {
    const a = e.target.closest('a[data-lightbox="story"]');
    if (!a) return;

    e.preventDefault();
    const href = a.getAttribute("href");
    const img = a.querySelector("img");
    const alt = img ? img.getAttribute("alt") : "";

    if (lb.classList.contains("open") && href === currentSrc) {
      closeLightbox();
      return;
    }

    openLightbox(href, alt);
  });

  // Клик по открытому фото — закрыть
  lbImg.addEventListener("click", function () {
    if (lb.classList.contains("open")) closeLightbox();
  });

  // Клик по фону (не по фото) — тоже закрыть
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLightbox();
  });

  // Esc — закрыть
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Если крестик всё же есть — пусть работает
  if (lbClose) {
    lbClose.addEventListener("click", closeLightbox);
  }
})();