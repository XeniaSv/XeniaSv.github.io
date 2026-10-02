import type { ImageMetadata } from 'astro';

/** Все картинки карточек: src/assets/works/<раздел>/<проект>/<N>-<имя>.jpg. */
const workImages = import.meta.glob<ImageMetadata>('../assets/works/**/*.jpg', {
  eager: true,
  import: 'default',
});

/**
 * Картинки папки `works/<dir>` по порядку имён файлов (1-…, 2-…): первая — превью карточки,
 * остальные вместе с ней — миниатюры-галерея. Одна картинка — карточка без миниатюр.
 */
export function workGallery(dir: string): ImageMetadata[] {
  const prefix = `../assets/works/${dir}/`;
  const images = Object.keys(workImages)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => workImages[path]);
  if (images.length === 0) throw new Error(`home.ts: в src/assets/works/${dir}/ нет картинок`);
  return images;
}

/**
 * Карточка на главной.
 *  - `project` (slug из src/content/projects) — заголовок, описание, категория, превью и ссылка
 *    берутся из frontmatter детальной страницы; здесь можно переопределить только раскладку.
 *  - Иначе карточка описывается здесь: тексты, `gallery` (папка с картинками) и `href` — внешняя
 *    ссылка на живой сайт / видео-презентацию (без `href` карточка не кликабельна).
 */
export interface HomeCard {
  project?: string;
  gallery?: string;
  href?: string;
  /** Надпись у кнопки при наведении. По умолчанию «Перейти к кейсу» (для внешних ссылок задавайте). */
  ctaText?: string;
  /** Явная раскладка; по умолчанию карточки в секции чередуются (см. `startMirrored`). */
  mirrored?: boolean;
  cta?: 'arrow' | 'none';
  title?: string;
  category?: string;
  tag?: string;
  description?: string;
  /** object-position превью, если рамка 1012×534 обрезает важное (например, `50% 30%`). */
  previewPosition?: string;
}

export interface HomeSection {
  /** id секции — на него ведут ссылки навигации (#realized и т.д.) */
  id: string;
  label: string;
  labelAlign: 'start' | 'end';
  /** Первая карточка секции зеркальная (карточка слева, превью справа). */
  startMirrored?: boolean;
  cards: HomeCard[];
}

const SITE = 'Перейти на сайт';
const VIDEO = 'Посмотреть концепт';

export const homeSections: HomeSection[] = [
  {
    id: 'realized',
    label: 'Реализованные проекты',
    labelAlign: 'end',
    cards: [
      {
        title: 'Джент',
        category: 'Фармацевтика',
        tag: 'Корпоративный сайт',
        description:
          'Разработка конверсионного лендинга для фармацевтического продукта. Основной фокус на создании доверительного и тактичного интерфейса: структурированная подача сложной информации, соблюдение медицинской этики в дизайне и четкие UX-сценарии для целевой аудитории.',
        gallery: 'realized/jent',
        href: 'https://jent.men/',
        ctaText: SITE,
      },
      {
        title: 'Finbridge',
        category: 'Fintech',
        tag: 'Имиджевый сайт',
        description:
          'Проектирование интерфейса для платформы технологического партнерства и эдвайзинга. Превратил сложный спектр B2B-услуг (от венчурных инвестиций до онлайн-платежей) в структурированный, современный и вызывающий доверие цифровой продукт.',
        gallery: 'realized/finbridge',
        href: 'https://finbridge.ru/',
        ctaText: SITE,
      },
      {
        title: 'САВА',
        category: 'B2B',
        tag: 'Корпоративный сайт',
        description:
          'Один из ведущих российских производителей ингредиентов из садовых ягод и дикоросов Сибири. Дизайн сайта для ведущего производителя натуральных ингредиентов из Сибири. Задача — передать премиальность и экологичность бренда через визуальный язык, сохранив при этом строгую B2B-структуру каталога и удобство навигации для оптовых партнеров.',
        gallery: 'realized/sava',
        href: 'https://ruseabuckthorn.com/',
        ctaText: SITE,
      },
      {
        title: 'Букмарк',
        category: 'Edtech',
        tag: 'Интернет-магазин',
        description:
          'Издательство интерактивных книг. Создание UI/UX для платформы интерактивных книг. Акцент на вовлекающем пользовательском опыте: интуитивная навигация по цифровым продуктам, игровые механики в интерфейсе и адаптивный дизайн, обеспечивающий комфортное чтение на любых устройствах.',
        gallery: 'realized/bookmark',
        href: 'https://bookmark.topman.site/',
        ctaText: SITE,
      },
      {
        title: 'Эксенза',
        category: 'Фармацевтика',
        tag: 'Корпоративный сайт',
        description:
          'Разработка дизайн-системы и макетов для медицинского продукта. Решение задачи по балансировке между маркетинговой привлекательностью и строгими требованиями к размещению медицинской информации. Чистая типографика и визуальная иерархия для быстрого сканирования контента.',
        gallery: 'realized/exenza',
        href: 'https://xsenza.ru/',
        ctaText: SITE,
      },
      {
        title: 'Шаблон для сервисов услуг',
        category: 'UI/UX',
        tag: 'Шаблон',
        description:
          'Создание масштабируемого UI-кита и модульного шаблона для бизнесов сферы услуг. Фокус на переиспользуемости компонентов, гибкой сетке и подготовке макетов, которые frontend-разработчики могут внедрить с минимальными доработками.',
        gallery: 'realized/service-template',
        href: 'http://layout.topman.site/service/',
        ctaText: SITE,
      },
      {
        title: 'Коммерцбанк',
        category: 'Fintech',
        tag: 'Корпоративный портал',
        description:
          'АО «Коммерцбанк (Евразия)». Редизайн/разработка разделов корпоративного сайта банка. Работа в рамках строгого брендбука: обеспечение максимальной читабельности финансовых данных, доступности (accessibility) интерфейса и формирования ощущения надежности и безопасности.',
        gallery: 'realized/commerzbank',
        href: 'https://commerzbank.topman.site/',
        ctaText: SITE,
      },
      {
        title: 'Ahmad Tea',
        category: 'FMCG / Ритейл',
        tag: 'Промо-страница',
        description:
          'Посадочная страница Ahmad Tea. Дизайн промо-лендинга для новой линейки зеленого чая с жасмином. «Сенсорный» дизайн: использование крупных фотографий, выразительной типографики и воздушной композиции для передачи вкуса и аромата продукта, с четким призывом к действию (CTA).',
        gallery: 'realized/ahmad-tea',
        href: 'https://ahmadtea.ru/jasmine-green-tea/',
        ctaText: SITE,
      },
    ],
  },
  {
    id: 'managed',
    label: 'Ведение проектов',
    labelAlign: 'end',
    cards: [
      {
        title: 'Topman Digital',
        category: 'Digital-агентство',
        tag: 'Корпоративный сайт',
        description:
          'Разработка и поддержка сайта digital-агентства полного цикла. Создание прозрачной структуры услуг (SEO, контекст, разработка) с акцентом на демонстрацию результатов клиентов через кейсы и метрики. Чистый B2B-интерфейс, формирующий доверие и экспертность.',
        gallery: 'managed/topman',
        href: 'https://topman.dev/',
        ctaText: SITE,
      },
      {
        title: 'Димексид Гель',
        category: 'Фармацевтика',
        tag: 'Корпоративный сайт',
        description:
          'Долгосрочное ведение и развитие сайта безрецептурного лекарственного препарата. Фокус на образовательном контенте и тактичной коммуникации: структурированная подача медицинских показаний, SEO-оптимизация статей, удобная навигация по аптечным сетям. Соблюдение всех требований к рекламе лекарственных средств.',
        gallery: 'managed/dimexid',
        href: 'https://dimexid.ru/',
        ctaText: SITE,
      },
      {
        title: 'Валемидин',
        category: 'Фармацевтика',
        tag: 'Корпоративный сайт',
        description:
          'Поддержка сайта линейки седативных препаратов растительного происхождения. Разработка интерактивных механик (тест подбора продукта), интеграция промо-активностей и сезонных кампаний. Баланс между медицинской строгостью и доступным языком для массовой аудитории.',
        gallery: 'managed/valemidin',
        href: 'https://valemidin.ru/',
        ctaText: SITE,
      },
    ],
  },
  {
    id: 'concepts',
    label: 'Концепты',
    labelAlign: 'start',
    startMirrored: true,
    cards: [
      {
        title: 'Davines',
        category: 'Beauty',
        tag: 'Бренд-сайт',
        description:
          'Сайт для бренда косметики Davines. Концепт сайта для бренда профессиональной косметики. Мягкая природная палитра, крупные фотографии, нестандартная модульная сетка и выразительные графические элементы формируют легкий, современный визуальный образ и делают каталог удобным для восприятия.',
        gallery: 'concepts/davines',
        previewPosition: '50% 38%',
        href: 'https://rutube.ru/video/private/248d97f0b5ad000d583f73e0146919c4/?p=HSYNd0XnDue7fn4xZAoVRQ&r=plwd',
        ctaText: VIDEO,
      },
      {
        title: 'Интернет-магазин премиальной одежды',
        category: 'Fashion',
        tag: 'E-commerce',
        description:
          'Концепт мультибрендового сайта с акцентом на премиальную визуальную подачу. Крупные фотографии, выразительная типографика, сдержанная палитра и лаконичная композиция создают атмосферу бутика и подчеркивают статус представленных брендов.',
        gallery: 'concepts/fashion-shop',
        href: 'https://rutube.ru/video/private/ae81cdad8c4618d03bc31e21804e7507/?p=Erz2q6XWtO5fpU1HydwxKQ&r=plwd',
        ctaText: VIDEO,
      },
      {
        title: 'timent.pro',
        category: 'Строительство',
        tag: 'Продуктовый сайт',
        description:
          'Концепт сайта с акцентом на современный минимализм, контрастную цветовую палитру и продуманную визуальную иерархию. Чистый интерфейс, плавные анимации и выразительная типографика делают знакомство с продукцией простым и комфортным.',
        gallery: 'concepts/timent',
        href: 'https://rutube.ru/video/private/67b9438fb7efe54d08cd275f8e7db5e3/?p=6gNsqh2ycvFGjKNgX7tcRQ&r=plwd',
        ctaText: VIDEO,
      },
      {
        title: 'Инверс',
        category: 'B2B',
        tag: 'Корпоративный сайт',
        description:
          'Лаконичный дизайн сайта для компании «Инверс». В основе — минимализм, светлая цветовая палитра и акцент на реальном оборудовании. Интерфейс получился понятным и структурным, помогая быстро находить нужную техническую информацию.',
        gallery: 'concepts/inverse',
        href: 'https://rutube.ru/video/0d8092d31851051be980a04b3e6e7af8/?r=plwd',
        ctaText: VIDEO,
      },
    ],
  },
  {
    id: 'learning',
    label: 'Учебные проекты',
    labelAlign: 'start',
    startMirrored: true,
    cards: [
      { project: 'avito' },
      { project: 'kaspersky' },
      { project: 'metr2' },
      { project: 'tbank' },
    ],
  },
];
