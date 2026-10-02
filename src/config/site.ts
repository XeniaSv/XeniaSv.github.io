/**
 * Единая точка правки контента шапки/главной.
 * Всё, что помечено TODO — заглушки, их нужно заменить реальными значениями (см. docs/TODO.md).
 */
export const site = {
  name: 'Ксения Насибуллина',
  nameLines: ['Ксения', 'Насибуллина'],
  title: 'Ксения Насибуллина — UI/UX дизайнер',
  description:
    'Портфолио UI/UX дизайнера с бэкграундом в frontend-разработке: лендинги, e-commerce, корпоративные сайты, дизайн-системы.',
  hero: {
    subtitle: ['UI/UX дизайнер с бэкграундом', 'в frontend-разработке'],
    description:
      'Специализируюсь на коммерческих веб-проектах: лендинги, e-commerce, корпоративные сайты. Создаю дизайн-системы, активно использую нейросети в рабочем процессе. Превращаю сложные бизнес-задачи в понятные и удобные интерфейсы.',
    primaryCta: { label: 'Смотреть работы', href: '#realized' },
    secondaryCta: { label: 'Скачать резюме', href: '/resume.pdf', fileName: 'Насибуллина Ксения Андреевна.pdf' }, // файл — public/resume.pdf
  },
  /** Ссылки навигации; `hash` — id секции на главной. */
  nav: [
    { label: 'Реализованные проекты', hash: 'realized' },
    { label: 'Ведение проектов', hash: 'managed' },
    { label: 'Концепты', hash: 'concepts' },
    { label: 'Учебные работы', hash: 'learning' },
  ],
  contacts: [
    { id: 'max', label: 'MAX', href: 'https://max.ru/u/f9LHodD0cOKKI91RF6hI8-vI6gqp6lwiut9yYl77vnwyIVubnQcxQ8qv_x8' },
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/XeniaNas' },
    { id: 'email', label: 'Email', href: 'mailto:xenia.nasibullina@mail.ru' },
  ],
} as const;
