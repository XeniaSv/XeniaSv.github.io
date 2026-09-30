import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Проекты портфолио. Один файл `src/content/projects/<slug>.mdx` = одна детальная страница
 * (/projects/<slug>/). Как добавить проект — docs/ADD_PROJECT.md.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** H1 страницы; `\n` = перенос строки. */
      title: z.string(),
      /** Название для хлебных крошек и блока «Другие проекты». По умолчанию — title без переносов. */
      shortTitle: z.string().optional(),
      /** Название на карточке главной («Авито»). По умолчанию — shortTitle. */
      cardTitle: z.string().optional(),
      category: z.string(),
      tag: z.string(),
      /** Описание для карточки на главной и <meta description>. */
      description: z.string(),
      /** Превью карточки на главной и миниатюры. */
      preview: image(),
      thumbs: z.array(image()).default([]),
      /** Большая картинка справа в hero (16:9). */
      lead: image(),
      /**
       * Кадрирование lead внутри рамки 626×520: ширина/сдвиги в % от рамки
       * (значения снимаются с Figma: w = ширина картинки, left/top = смещение).
       */
      leadCrop: z
        .object({ width: z.number(), left: z.number(), top: z.number() })
        .default({ width: 200, left: -50, top: -20 }),
      /** Логотип, лежащий поверх lead. Значения в % от рамки lead. */
      leadLogo: z
        .object({
          src: image(),
          alt: z.string(),
          left: z.number(),
          top: z.number(),
          width: z.number(),
        })
        .optional(),
      /** slug'и связанных проектов для блока «Другие проекты» (cross-ссылки). */
      related: z.array(z.string()).default([]),
      /** Порядок в списках (меньше = выше). */
      order: z.number().default(100),
    }),
});

export const collections = { projects };
