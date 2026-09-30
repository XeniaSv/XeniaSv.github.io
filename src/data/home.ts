import type { ImageMetadata } from 'astro';

import preview1 from '../assets/home/preview-1.jpg';
import preview2 from '../assets/home/preview-2.jpg';
import preview3 from '../assets/home/preview-3.jpg';
import preview4 from '../assets/home/preview-4.jpg';
import thumb11 from '../assets/home/thumb-1-1.jpg';
import thumb12 from '../assets/home/thumb-1-2.jpg';
import thumb13 from '../assets/home/thumb-1-3.jpg';
import thumb14 from '../assets/home/thumb-1-4.jpg';
import thumb21 from '../assets/home/thumb-2-1.jpg';
import thumb22 from '../assets/home/thumb-2-2.jpg';
import thumb23 from '../assets/home/thumb-2-3.jpg';
import thumb24 from '../assets/home/thumb-2-4.jpg';

/**
 * Карточка на главной.
 *  - Если указан `project` (slug из src/content/projects), заголовок, описание, категория,
 *    превью и ссылка берутся из frontmatter проекта — здесь нужно задать только раскладку.
 *  - Если `project` не указан — это карточка-заглушка со своим контентом (без ссылки).
 */
export interface HomeCard {
  project?: string;
  mirrored?: boolean;
  cta?: 'arrow' | 'more' | 'none';
  title?: string;
  category?: string;
  tag?: string;
  description?: string;
  preview?: ImageMetadata;
  thumbs?: ImageMetadata[];
}

export interface HomeSection {
  /** id секции — на него ведут ссылки навигации (#realized и т.д.) */
  id: string;
  label: string;
  labelAlign: 'start' | 'end';
  cards: HomeCard[];
}

// TODO: тексты и картинки заглушек (Finbridge и др.) заменить на реальные проекты — см. docs/TODO.md
const placeholderText = {
  category: 'ФИНТЕХ',
  tag: 'Имиджевый сайт',
  description:
    'Разработка UI/UX для платформы технологического партнерства и эдвайзинга финтех-компаний. Превратила сложный спектр B2B-услуг (от венчурных инвестиций до онлайн-платежей) в структурированный, современный и вызывающий доверие интерфейс.',
};

export const homeSections: HomeSection[] = [
  {
    id: 'realized',
    label: 'Реализованные проекты',
    labelAlign: 'end',
    cards: [
      {
        ...placeholderText,
        title: 'Finbridge',
        preview: preview1,
        thumbs: [thumb11, thumb12, thumb13, thumb14],
      },
      {
        ...placeholderText,
        title: 'Finbridge',
        mirrored: true,
        preview: preview2,
        thumbs: [thumb21, thumb22, thumb23, thumb24],
      },
    ],
  },
  {
    id: 'managed',
    label: 'Ведение проектов',
    labelAlign: 'end',
    cards: [{ ...placeholderText, title: 'Finbridge', preview: preview3 }],
  },
  {
    id: 'concepts',
    label: 'Концепты',
    labelAlign: 'start',
    cards: [
      { ...placeholderText, title: 'Finbridge', mirrored: true, cta: 'none', preview: preview4 },
    ],
  },
  {
    id: 'learning',
    label: 'Учебные проекты',
    labelAlign: 'start',
    cards: [{ project: 'avito', mirrored: true, cta: 'more' }],
  },
];
