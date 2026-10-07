import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const root = fileURLToPath(new URL('.', import.meta.url))

/* Сайт — пять отдельных html в корне, точки входа равноправны.
   Без этого списка сборка забирает только index.html, остальные четыре
   страницы в dist не попадают, и вся навигация ведёт в 404.
   Список читается из папки, чтобы новая страница подхватывалась сама
   и про неё не нужно было помнить. */
const pages = Object.fromEntries(
  readdirSync(root)
    .filter((name) => name.endsWith('.html'))
    .map((name) => [name.slice(0, -'.html'.length), new URL(name, import.meta.url).pathname]),
)

export default defineConfig({
  /* пути в сборке относительные: сайт должен открываться из папки
     и деплоиться перетаскиванием, абсолютный /assets/ это ломает */
  base: './',
  build: {
    rollupOptions: { input: pages },
  },
})
