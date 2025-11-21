# POS Terminal

Multi-tenant Point of Sale system built with FastAPI and React.

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register new business
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/users` - Create user (owner only)

## User Roles
- **Owner**: Full access
- **Manager**: Products, sales, inventory, reports
- **Cashier**: POS operations only
