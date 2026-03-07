(function () {
  const STORAGE_KEY = "site_lang";

  function isEnPath(pathname) {
    return pathname === "/en" || pathname.startsWith("/en/");
  }

  function getPageLang(pathname) {
    const declared = document.documentElement.getAttribute("data-page-lang");
    if (declared === "ru" || declared === "en") return declared;
    return isEnPath(pathname) ? "en" : "ru";
  }

  function getPreferredLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en") return saved;

    const navLang = (navigator.language || "").toLowerCase();
    return navLang.startsWith("ru") ? "ru" : "en";
  }

  function mirrorPath(pathname, targetLang) {
    const enNow = isEnPath(pathname);

    if (targetLang === "en") {
      if (enNow) return pathname;
      return pathname === "/" ? "/en/index.html" : "/en" + pathname;
    } else {
      if (!enNow) return pathname;
      let p = pathname.replace(/^\/en/, "");
      if (p === "" || p === "/") p = "/index.html";
      return p;
    }
  }

  function normalizePath() {
    return location.pathname || "/index.html";
  }

  function setToggleUI(lang) {
    const wrap = document.getElementById("langToggle");
    if (!wrap) return;

    wrap.setAttribute("data-lang", lang);

    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      btn.setAttribute(
        "title",
        lang === "en" ? "Switch to Russian" : "Switch to English"
      );
    }
  }

  function goToLang(targetLang) {
    localStorage.setItem(STORAGE_KEY, targetLang);

    const path = normalizePath();
    const target = mirrorPath(path, targetLang);
    location.href = target + location.search + location.hash;
  }

  const path = normalizePath();
  const pageLang = getPageLang(path);
  const preferred = getPreferredLang();

  setToggleUI(pageLang);

  if (preferred !== pageLang) {
    const target = mirrorPath(path, preferred);
    if (target !== path) {
      location.replace(target + location.search + location.hash);
      return;
    }
  }

  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      const current = getPageLang(normalizePath());
      const next = current === "ru" ? "en" : "ru";
      goToLang(next);
    });
  }
})();