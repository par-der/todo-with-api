# 📝 Todo with API  
**React + TypeScript + Vite**

- Мини‑малистичное, но функциональное приложение‑трекер задач с категориями, пагинацией и “живыми” счётчиками, построенное на стеке React 19 + TanStack Query 5 + shadcn/ui (Radix Primitives + Tailwind CSS).
- Для бэкенда используется `Django`.

---

## ✨ Основные возможности
|  | |
|---|---|
| 📋 **CRUD‑задачи** | Создание, редактирование, завершение, удаление — всё через удобные модальные окна (Radix Dialog). |
| 🗂 **Категории** | HEALTH / WORK / MENTAL_HEALTH / STUDY. Быстрый фильтр + цветные бейджи. |
| 📊 **Realtime‑статистика** | Карточки сверху показывают количество задач в каждой категории и обновляются *мгновенно* благодаря оптимистичным мутациям TanStack Query. |
| 🔄 **Пагинация** | Отдельный хук `usePaginationParams` хранит `page` и `pageSize` в Query‑string; страница сбрасывается в `1` только при смене категории. |
| ⚡ **GSAP‑анимации** | Плавное появление списков и карточек. |
| 🎨 **UI/UX** | shadcn/ui + Tailwind CSS 4. |
| 🔐 **Простейшая авторизация** | Логин/логаут/регистрация через Zustand‑store. |
| 🛠 **Строгий ESLint + Prettier** | AirBnB TS‑конфиг, проверка перед коммитом. |

---

- Проект можно посмотреть по этой ссылке на ютубе
https://youtu.be/Ya8q48TF_oA
