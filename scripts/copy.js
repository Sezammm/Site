document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyKisBtn");
  const textEl = document.getElementById("kisLink");

  if (!btn || !textEl) return;

  btn.addEventListener("click", async () => {
    const text = textEl.textContent.trim();

    try {
      await navigator.clipboard.writeText(text);
      btn.style.background = "rgba(120,255,160,.25)";
      setTimeout(() => {
        btn.style.background = "rgba(255,255,255,.10)";
      }, 600);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  });
});