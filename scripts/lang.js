// scripts/lang.js
(function () {
  const STORAGE_KEY = "site_lang"; // "ru" | "en"

  function isEnPath(pathname) {
    return pathname === "/en" || pathname.startsWith("/en/");
  }

  function getPageLang(pathname) {
    // В HTML мы ставим data-page-lang="ru|en", но на всякий случай подстрахуемся
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
    // Для нормальной работы редиректов лучше тестировать через http://localhost:8000
    // В file:// редиректы могут быть ограничены.
    return location.pathname || "/index.html";
  }

  // --- ВАЖНО: правильные пути к картинкам флагов для разных папок ---
  function getFlagsBase(pathname) {
    // Где лежит текущая страница:
    // /index.html             -> img/flags/
    // /pages/test1.html        -> ../img/flags/
    // /en/index.html           -> ../img/flags/
    // /en/pages/test1.html     -> ../../img/flags/
    if (pathname.startsWith("/en/pages/")) return "../../img/flags/";
    if (pathname.startsWith("/pages/")) return "../img/flags/";
    if (pathname.startsWith("/en/")) return "../img/flags/";
    return "img/flags/";
  }

  function setToggleUI(lang, pathname) {
    const wrap = document.getElementById("langToggle");
    if (!wrap) return;

    wrap.setAttribute("data-lang", lang);

    // улучшение доступности
    const btn = document.getElementById("langToggleBtn");
    if (btn) {
      btn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      btn.setAttribute("title", lang === "en" ? "Switch to Russian" : "Switch to English");
    }

    // --- iOS-style flags: внутри ползунка активный язык ---
    const base = getFlagsBase(pathname);

    // Новый вариант HTML (как ты сделал): <img class="flag-in"> и <img class="flag-out">
    let flagIn = wrap.querySelector(".flag-in");
    let flagOut = wrap.querySelector(".flag-out");

    // Фолбэк для старого HTML с <span><img>...</span>
    if (!flagIn || !flagOut) {
      const imgs = wrap.querySelectorAll(".labels img");
      if (imgs && imgs.length >= 2) {
        flagIn = imgs[0];
        flagOut = imgs[1];
      }
    }

    if (flagIn && flagOut) {
      if (lang === "en") {
        // EN активен: внутри GB, снаружи RU
        flagIn.src = base + "gb.svg";
        flagIn.alt = "EN";

        flagOut.src = base + "ru.svg";
        flagOut.alt = "RU";
      } else {
        // RU активен: внутри RU, снаружи GB
        flagIn.src = base + "ru.svg";
        flagIn.alt = "RU";

        flagOut.src = base + "gb.svg";
        flagOut.alt = "EN";
      }
    }
  }

  function goToLang(targetLang) {
    localStorage.setItem(STORAGE_KEY, targetLang);

    const path = normalizePath();
    const target = mirrorPath(path, targetLang);
    location.href = target + location.search + location.hash;
  }

  // --- старт ---
  const path = normalizePath();
  const pageLang = getPageLang(path);
  const preferred = getPreferredLang();

  // 1) UI
  setToggleUI(pageLang, path);

  // 2) Авто-редирект (но только если предпочтение отличается)
  // Если в localStorage уже был выбор — он главнее браузера
  if (preferred !== pageLang) {
    const target = mirrorPath(path, preferred);
    if (target !== path) {
      location.replace(target + location.search + location.hash);
      return;
    }
  }

  // 3) Клик по toggle: переключаем на зеркальную страницу
  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.addEventListener("click", function () {
      const current = getPageLang(normalizePath()); // на всякий случай берём актуальное
      const next = current === "ru" ? "en" : "ru";
      goToLang(next);
    });
  }
})();