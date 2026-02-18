# Блог на Laravel + React (Docker)

## Описание проекта

Полноценное SPA-приложение блога с **русскоязычным интерфейсом**. Поддерживает просмотр статей, создание контента и комментариев **без авторизации**.

**Архитектура:** Laravel API + React Frontend + MySQL + Docker

## Содержание

- [1. Технологический стек](#1-технологический-стек)
- [2. Функционал приложения](#2-функционал-приложения)
- [3. Системные требования](#3-системные-требования)
- [4. Быстрый запуск (5 минут)](#4-быстрый-запуск-5-минут)
  - [4.1. Клонирование и подготовка](#41-клонирование-и-подготовка)
  - [4.2. Сборка фронтенда](#42-сборка-фронтенда)
  - [4.3. Запуск контейнеров](#43-запуск-контейнеров)
  - [4.4. Инициализация БД (миграции и сидеры)](#44-инициализация-бд-миграции-и-сидеры)
  - [4.5. Проверка работы](#45-проверка-работы)
- [5. API документация](#5-api-документация)
  - [5.1. Список статей](#51-список-статей-get-apipostarticles)
  - [5.2. Статья с комментариями](#52-статья-с-комментариями-get-apipostid)
  - [5.3. Создать статью](#53-создать-статью-post-apipost)
  - [5.4. Добавить комментарий](#54-добавить-комментарий-post-apipostidcomments)
- [6. Управление контейнерами](#6-управление-контейнерами)
- [7. Структура проекта](#7-структура-проекта)
- [8. Полезные команды разработки](#8-полезные-команды-разработки)

## 1. Технологический стек

| Компонент     | Технология        | Версия   |
|---------------|-------------------|----------|
| Backend       | Laravel           | 11.x     |
| Frontend      | React + Vite      | 18.x     |
| База данных   | MySQL             | 8.0      |
| Контейнеры    | Docker Compose v2 | 2.x      |
| Веб-сервер    | Nginx             | 1.25     |

## 2. Функционал приложения

- **Главная страница** – список всех статей
- **Карточка статьи** – просмотр с комментариями
- **Создание статей** – форма добавления (без регистрации)
- **Комментарии** – добавление к любой статье
- **Тестовые данные** – автоматическая генерация 5 статей + комментариев (используются фабрики и сидеры Laravel)

## 3. Системные требования

```bash
# Обязательно
Docker 20.10+
Docker Compose v2 (команда `docker compose`)
Git

# Для сборки фронтенда (достаточно одного раза)
Node.js 18+
npm / yarn / pnpm
```

## 4. Быстрый запуск (5 минут)

### 4.1. Клонирование и подготовка

```bash
git clone <URL вашего репозитория>
cd blog-laravel-react
```

### 4.2. Сборка фронтенда

Создаём статические файлы, которые будет отдавать Nginx.

```bash
cd frontend
npm ci               # или npm install
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

### 4.4. Инициализация БД (миграции и сидеры)

Выполните миграции и наполнение тестовыми данными:

```bash
docker compose exec app php artisan migrate --seed
```

Если нужно пересоздать таблицы и заново заполнить:

```bash
docker compose exec app php artisan migrate:fresh --seed
```

### 4.5. Проверка работы

- **Фронтенд:** откройте в браузере [http://localhost:8080](http://localhost:8080) – вы увидите список статей.
- **API:** базовый URL API – [http://localhost:8080/api](http://localhost:8080/api)

## 5. API документация

### 5.1. Список статей `GET /api/articles`

```bash
curl http://localhost:8080/api/articles
```

**Пример ответа:**

```json
[
  {
    "id": 1,
    "title": "Первая статья",
    "content": "Содержимое...",
    "created_at": "2026-02-18T12:00:00.000000Z",
    "updated_at": "2026-02-18T12:00:00.000000Z"
  }
]
```

### 5.2. Статья с комментариями `GET /api/articles/{id}`

```bash
curl http://localhost:8080/api/articles/1
```

Ответ включает поле `comments` с массивом комментариев.

### 5.3. Создать статью `POST /api/articles`

```bash
curl -X POST http://localhost:8080/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Моя статья","content":"Текст статьи"}'
```

**Ответ:** созданная статья с присвоенным `id`.

### 5.4. Добавить комментарий `POST /api/articles/{id}/comments`

```bash
curl -X POST http://localhost:8080/api/articles/1/comments \
  -H "Content-Type: application/json" \
  -d '{"author_name":"Алексей","content":"Отличная статья!"}'
```

## 6. Управление контейнерами

| Команда                      | Действие                                |
|------------------------------|-----------------------------------------|
| `docker compose up -d`       | Запуск контейнеров в фоне               |
| `docker compose down`        | Остановка контейнеров                   |
| `docker compose down -v`     | Остановка и удаление томов (БД очистится) |
| `docker compose logs -f`     | Просмотр логов всех контейнеров         |
| `docker compose logs app`    | Логи только контейнера Laravel          |
| `docker compose exec app bash` | Войти в контейнер Laravel              |

## 7. Структура проекта

```
blog-laravel-react/
├── backend/                 # Laravel 11 API
│   ├── app/
│   │   ├── Models/          # Article, Comment
│   │   └── Http/Controllers/# API контроллеры
│   ├── database/
│   │   ├── migrations/       # Схемы таблиц
│   │   └── seeders/          # Сидеры (DatabaseSeeder)
│   ├── routes/
│   │   └── api.php           # Маршруты API
│   └── .env.example
├── frontend/                # React 18 + Vite
│   ├── src/
│   │   ├── components/       # ArticleList, Article, CommentForm
│   │   ├── api.js            # Функции для запросов к API
│   │   └── App.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker/
│   ├── nginx/
│   │   └── default.conf      # Конфигурация Nginx
│   └── php/
│       ├── Dockerfile        # Сборка PHP-образа
│       └── local.ini         # Настройки PHP
├── docker-compose.yml
└── README.md
```

## 8. Полезные команды разработки

```bash
# Пересборка фронтенда (после изменений)
cd frontend && npm run build && cd ..

# Просмотр логов в реальном времени
docker compose logs -f

# Вход в контейнер с Laravel
docker compose exec app bash

# Запуск тестов Laravel (если есть)
docker compose exec app php artisan test

# Очистка кеша Laravel
docker compose exec app php artisan optimize:clear
```
