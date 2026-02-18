# Блог на Laravel + React (Docker)

## Описание проекта

Полноценное SPA-приложение блога с **русскоязычным интерфейсом**. Поддерживает просмотр статей, создание контента и комментариев **без авторизации**.

**Архитектура:** Laravel API + React Frontend + MySQL + Docker

## Содержание

## 1. Технологический стек

| Компонент | Технология | Версия |
|-----------|------------|--------|
| Backend | Laravel | 11.x |
| Frontend | React + Vite | 18.x |
| База данных | MySQL | 8.0 |
| Контейнеры | Docker Compose v2 | 2.x |
| Веб-сервер | Nginx | 1.25 |

## 2. Функционал приложения

- **Главная страница** – список всех статей
- **Карточка статьи** – просмотр с комментариями
- **Создание статей** – форма добавления (без регистрации)
- **Комментарии** – добавление к любой статье
- **Тестовые данные** – 5 статей + комментарии (автогенерация)

## 3. Системные требования

```bash
# Обязательно
Docker 20.10+
Docker Compose v2 (docker compose)
Git

# Для сборки фронтенда (один раз)
Node.js 18+
npm/yarn/pnpm
```

## 4. Быстрый запуск (5 минут)

### 4.1. Клонирование и подготовка

```bash
git clone <ваш-репозиторий>
cd blog-laravel-react
```

### 4.2. Сборка фронтенда

```bash
cd frontend
npm ci
npm run build
cd ..
```

### 4.3. Запуск контейнеров

```bash
docker compose up -d
```

**Создано 3 контейнера:**
- `blog_db` – MySQL 8.0
- `blog_app` – PHP 8.2 + Laravel
- `blog_web` – Nginx + статика

### 4.4. Инициализация БД

```bash
docker compose exec app php artisan migrate:fresh --seed
```

### 4.5. Проверка

```
Frontend: http://localhost:8080
API:      http://localhost:8080/api/articles
```

## 5. API документация

### 5.1. Список статей `GET /api/articles`

```bash
curl http://localhost:8080/api/articles
```

**Ответ:**
```json
[
  {
    "id": 1,
    "title": "Первая статья",
    "content": "Содержимое...",
    "created_at": "2026-02-18T12:00:00Z"
  }
]
```

### 5.2. Статья с комментариями `GET /api/articles/{id}`

```bash
curl http://localhost:8080/api/articles/1
```

### 5.3. Создать статью `POST /api/articles`

```bash
curl -X POST http://localhost:8080/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Моя статья","content":"Текст статьи"}'
```

### 5.4. Добавить комментарий `POST /api/articles/{id}/comments`

```bash
curl -X POST "http://localhost:8080/api/articles/1/comments" \
  -H "Content-Type: application/json" \
  -d '{"author_name":"Алексей","content":"Отличная статья!"}'
```

## 6. Управление контейнерами

| Команда | Действие |
|---------|----------|
| `docker compose up -d` | Запуск в фоне |
| `docker compose down` | Остановка |
| `docker compose down -v` | Полная очистка (БД удалится) |
| `docker compose logs app` | Логи Laravel |

## 7. Структура проекта

```
blog-laravel-react/
├── backend/              # Laravel 11 API
│   ├── app/
│   │   ├── Models/
│   │   └── Http/Controllers/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
├── frontend/             # React 18 + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── dist/           
│   └── vite.config.js
├── docker/
│   ├── nginx/default.conf
│   └── php/Dockerfile
├── docker-compose.yml
└── README.md
```

## 8. Полезные команды разработки

```bash
# Пересборка фронтенда
cd frontend && npm run build && cd ..

# Логи всех контейнеров
docker compose logs -f

# Зайти в контейнер Laravel
docker compose exec app bash

# Тест API
docker compose exec app php artisan test
```


***

Нравится ли такая структура? Хотите добавить раздел с **скриншотами интерфейса** или **настроить CI/CD** для автоматической деплоя?
