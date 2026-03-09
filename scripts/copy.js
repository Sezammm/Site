document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".copybtn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy-target");
      if (!targetId) return;

      const el = document.getElementById(targetId);
      if (!el) return;

      const text = el.textContent.trim();

      try {
        await navigator.clipboard.writeText(text);
        btn.style.transform = "scale(0.92)";
        setTimeout(() => btn.style.transform = "", 120);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });
  });
});