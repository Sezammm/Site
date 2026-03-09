document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".copybtn, .copybtn-square");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      let text = "";

      const targetId = btn.getAttribute("data-copy-target");
      const directText = btn.getAttribute("data-copy-text");

      if (directText) {
        text = directText.trim();
      } else if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          text = targetEl.textContent.trim();
        }
      }

      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const oldBg = btn.style.background;
        btn.style.background = "rgba(120,255,160,.25)";
        setTimeout(() => {
          btn.style.background = oldBg || "rgba(255,255,255,.10)";
        }, 600);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });
  });
});