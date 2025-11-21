# POS Terminal

Multi-tenant Point of Sale система, построена с FastAPI (backend) и React (frontend).

---

## Структура на проекта

```
pos-terminal/
├── backend/          # FastAPI REST API
├── frontend/         # React + Vite SPA
├── docker-compose.yml
└── README.md
```

---

## Изисквания

- **Python** 3.10+
- **Node.js** 18+
- **PostgreSQL** 15+ (или Docker)

---

## 1. Backend (FastAPI)

REST API за всички операции - автентикация, продукти, продажби, инвентар, отчети.

### Инсталация

```bash
cd backend

# Създай виртуална среда
python -m venv venv

# Активирай (Linux/Mac)
source venv/bin/activate

# Активирай (Windows)
venv\Scripts\activate

# Инсталирай зависимости
pip install -r requirements.txt
```

### Конфигурация

Създай `.env` файл в `backend/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pos_db
SECRET_KEY=your-secret-key-change-in-production
```

### Стартиране

```bash
# Първо създай базата данни в PostgreSQL:
# CREATE DATABASE pos_db;

# Изпълни миграциите
alembic upgrade head

# Стартирай сървъра (порт 8000)
uvicorn app.main:app --reload --port 8000
```

### API Документация

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 2. Frontend (React + Vite)

Single Page Application за POS интерфейса.

### Инсталация

```bash
cd frontend

# Инсталирай зависимости
npm install
```

### Стартиране

```bash
# Стартирай dev сървъра (порт 3001)
npm run dev
```

Отвори http://localhost:3001 в браузъра.

---

## 3. Docker (препоръчително)

Най-лесният начин да стартираш всичко заедно.

### Стартиране

```bash
# Стартирай всички услуги
docker-compose up -d

# Изпълни миграциите
docker-compose exec backend alembic upgrade head

# Спри всички услуги
docker-compose down
```

### Портове

| Услуга | Порт | URL |
|--------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| Backend API | 8000 | http://localhost:8000 |
| PostgreSQL | 5432 | localhost:5432 |

---

## 4. Тестове

```bash
cd backend

# Изпълни тестовете
pytest -v

# С покритие
pytest --cov=app
```

---

## API Endpoints

### Автентикация (`/api/v1/auth`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/register` | Регистрация на нов бизнес |
| POST | `/login` | Вход |
| GET | `/me` | Текущ потребител |
| POST | `/users` | Създай потребител (само owner) |

### Продукти (`/api/v1/products`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/` | Списък продукти |
| GET | `/search?q=` | Търсене |
| POST | `/` | Създай продукт |
| PUT | `/{id}` | Редактирай |
| DELETE | `/{id}` | Изтрий |

### Продажби (`/api/v1/sales`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| POST | `/` | Нова продажба |
| GET | `/` | Списък продажби |
| GET | `/{id}` | Детайли |

### Инвентар (`/api/v1/inventory`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/` | Наличности |
| GET | `/low-stock` | Ниски наличности |
| POST | `/adjust` | Корекция |
| GET | `/history/{id}` | История |

### Отчети (`/api/v1/reports`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/daily` | Дневен отчет |
| GET | `/by-product` | По продукти |
| GET | `/range` | За период |

### Настройки (`/api/v1/settings`)
| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/` | Всички настройки |
| GET/PUT | `/business` | Бизнес информация |
| GET/PUT | `/vat-rates` | ДДС ставки |
| GET/PUT | `/receipt` | Шаблон касова бележка |

---

## Потребителски роли

| Роля | Права |
|------|-------|
| **Owner** | Пълен достъп |
| **Manager** | Продукти, продажби, инвентар, отчети |
| **Cashier** | Само POS операции |

---

## Лиценз

MIT
