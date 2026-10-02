# Портфолио — Ксения Насибуллина

Адаптивный сайт-портфолио UI/UX дизайнера. Главная страница + детальные страницы проектов, собранные по одному шаблону. Статический сайт (Astro), публикуется на GitHub Pages.

Макеты: [Figma — Portfolio](https://www.figma.com/design/KkKl7hBIxrS5pe477oRo65/Portfolio) (Главная `2054:30`, Авито `2077:755`, Метр2 `2077:1265`, ТБанк `2077:1345`, Касперский `2077:1425`).

## Стек

- [Astro](https://astro.build) 7 (`output: 'static'`) + MDX для текстов проектов
- Чистый CSS с токенами (`src/styles/tokens.css`), без CSS-фреймворков
- Шрифт Inter (самохостинг, `@fontsource-variable/inter`)
- Минимум JS: бургер-меню, галерея миниатюр, подсветка раздела в оглавлении, автозапуск видео в кадре
- Деплой: GitHub Actions → GitHub Pages

## Быстрый старт

Нужен Node.js ≥ 22.12.

```bash
npm install
npm run dev        # http://localhost:4321 — dev-сервер с hot reload
npm run build      # сборка в dist/
npm run preview    # локальный просмотр собранного сайта
npm run check:links  # проверка внутренних ссылок и ассетов в dist/ (после build)
```

## Структура

```
src/
  config/site.ts          имя, тексты hero, навигация, контакты, ссылка на резюме
  data/home.ts            секции и карточки главной страницы (тексты, ссылки на сайты, папки с картинками)
  content/projects/*.mdx  один файл = одна страница проекта (frontmatter + текст статьи)
  content.config.ts       схема frontmatter проектов (zod)
  layouts/                BaseLayout, ProjectLayout (шаблон детальной страницы)
  components/             Header, ProjectShowcase, Toc, Figure, RelatedProjects, BackBar, …
  pages/index.astro       главная
  pages/projects/[slug].astro  генерирует /projects/<slug>/ из коллекции projects
  styles/                 tokens.css, global.css
  assets/                 картинки и видео (картинки оптимизируются Astro при сборке):
                          works/ — карточки главной, projects/<slug>/ — детальные страницы
public/                   favicon, resume.pdf, .nojekyll
docs/                     ADD_PROJECT.md, DESIGN_TOKENS.md, TODO.md
```

## Добавить новый проект

Кратко: создать `src/content/projects/<slug>.mdx` с frontmatter и текстом, положить картинки в `src/assets/projects/<slug>/`, при необходимости добавить карточку в `src/data/home.ts`. Подробная инструкция — [docs/ADD_PROJECT.md](docs/ADD_PROJECT.md).

## Деплой на GitHub Pages

Сайт настроен как **пользовательский** (`https://<user>.github.io/`, корневой путь).

> **Репозиторий переименован:** `XeniaSv/portfolio` → [`XeniaSv/XeniaSv.github.io`](https://github.com/XeniaSv/XeniaSv.github.io) (нужно для пользовательского сайта). Адрес сайта — `https://xeniasv.github.io/`. Remote обновлён: `git remote set-url origin https://github.com/XeniaSv/XeniaSv.github.io.git` (старый адрес GitHub перенаправляет, но лучше использовать новый). Локальная папка может называться как угодно.

1. Репозиторий должен называться `<user>.github.io` (для пользовательского сайта) — уже сделано, см. выше.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push в `main` запускает `.github/workflows/deploy.yml` (сборка → проверка ссылок → публикация).

**Проектный сайт** (`https://<user>.github.io/<repo>/`): в `deploy.yml` раскомментируйте `BASE_PATH: /<repo>`; локально — `BASE_PATH=/<repo> npm run build`. Все внутренние ссылки строятся через хелпер `url()` (`src/lib/url.ts`), поэтому дополнительных правок не требуется.

Адрес сайта для canonical/OG задаётся переменной `SITE_URL` (по умолчанию `https://xeniasv.github.io`, см. `astro.config.mjs`).

## Что осталось заполнить

Заглушки (контакты, резюме, тексты и картинки карточек) собраны в [docs/TODO.md](docs/TODO.md).

## Документация для агентов

Правила работы с репозиторием для AI-агентов — в [AGENTS.md](AGENTS.md).
