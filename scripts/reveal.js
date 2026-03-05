// scripts/reveal.js
(function () {
  const items = document.querySelectorAll(".story-block, .story-photo, .story-text");

  // добавляем класс reveal
  items.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // один раз показали — больше не трогаем
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px"
  });

  items.forEach(el => io.observe(el));
})();