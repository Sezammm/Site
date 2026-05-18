document.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector("[data-local-view-counter]");
  if (!counter) return;

  const key = "sezam-local-home-views";
  const baseViews = 104160;
  const current = Number(localStorage.getItem(key) || "0") + 1;

  localStorage.setItem(key, String(current));
  counter.textContent = String(baseViews + current);
});
