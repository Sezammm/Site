document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".download-item");

  items.forEach((item) => {
    const btn = item.querySelector(".download-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
});