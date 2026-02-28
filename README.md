
# Простой сайт (RU + EN)

Минималистичный статический сайт с переключением между русским и английским языком без использования фреймворков.  
Выбор языка сохраняется в localStorage, при первом посещении происходит авто-редирект по языку браузера.

## Основные возможности

- Две полные версии сайта: русская (`/`) и английская (`/en/`)
- Красивый переключатель языка в виде слайдера с флагами (RU / GB)
- Сохранение выбранного языка в localStorage (ключ: `site_lang`)
- Автоматическое определение языка браузера при первом заходе
- Теги `<link rel="alternate" hreflang="...">` для SEO
- Адаптивный дизайн в стиле glassmorphism (прозрачное стекло + blur)
- Тестовые страницы (test1, test2, test3) на обоих языках
- Пример интеграции комментариев Giscus (на русской версии test1.html)

## Структура проекта
.
├── .gitignore
├── index.html                  ← главная страница (RU)
├── launch_site.txt             ← инструкция как запустить локально
├── en/
│   ├── index.html              ← главная страница (EN)
│   └── pages/
│       ├── test1.html
│       ├── test2.html
│       └── test3.html
├── img/
│   └── flags/
│       ├── ru.svg
│       └── gb.svg
├── pages/                      ← русские дополнительные страницы
│   ├── test1.html              ← с примером Giscus
│   ├── test2.html
│   └── test3.html
├── scripts/
│   └── lang.js                 ← логика переключения языка
└── styles/
    └── style.css               ← стили (glassmorphism + адаптив)

## Как запустить локально

1. Открой терминал / PowerShell
2. Перейди в папку проекта:

```powershell

Запусти встроенный веб-сервер Python:

cd E:\Site                                   # или любой другой путь, куда ты скопировал проект
PowerShellpython -m http.server 8000

Открой в браузере:

http://localhost:8000

Основные адреса
Русская версия
http://localhost:8000/
http://localhost:8000/pages/test1.html

Английская версия
http://localhost:8000/en/
http://localhost:8000/en/pages/test1.html

Как добавить новую страницу

Создай два файла:
pages/новая.html               ← русская версия
en/pages/новая.html            ← английская версия

В обоих файлах укажи правильные пути к css и js:

HTML<link rel="stylesheet" href="../styles/style.css">
<script src="../scripts/lang.js"></script>
<!-- для en/ страниц будет ../../ -->

Добавь в навигацию ссылку:

HTML<a href="новая.html">Новая страница</a>

(желательно) добавь теги alternate:

HTML<link rel="alternate" hreflang="ru" href="/pages/новая.html">
<link rel="alternate" hreflang="en" href="/en/pages/новая.html">

Переключение языка — как работает

Клик по слайдеру → переход на зеркальную страницу того же раздела
Выбор сохраняется в localStorage
При открытии сайта:
Смотрит localStorage
Если пусто — смотрит navigator.language
Если предпочтение отличается от текущей страницы → редирект


Технологии

HTML + CSS (vanilla)
JavaScript (vanilla, ~100 строк)
SVG-флаги
Glassmorphism (backdrop-filter: blur)
Giscus (GitHub Discussions) — пример на /pages/test1.html

Полезные команды
Bash# запуск сервера
python -m http.server 8000

# посмотреть сохранённый язык (в консоли браузера)
localStorage.getItem("site_lang")

# очистить выбор языка
localStorage.removeItem("site_lang")