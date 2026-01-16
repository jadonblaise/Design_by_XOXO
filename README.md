# Design by XOXO - Fashion E-Commerce Platform

A modern, full-stack e-commerce platform for a fashion store featuring African prints, casual wear, and event dresses. Built with Django REST Framework backend and React frontend with Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse products by category (African Prints, Casual Wear, Event Wear)
- 🛒 **Shopping Cart**: Add products to cart with quantity management
- 💱 **Multi-Currency Support**: USD, EUR, and NGN with real-time conversion
- 🔍 **Search Functionality**: Search products by name, description, or category
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 📧 **Contact Form**: Customer inquiry submission system
- ⚡ **Fast & Modern**: Built with latest technologies

## Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite (Development)
- django-cors-headers

### Frontend
- React 19.2
- Tailwind CSS 3.4
- Axios for API calls
- Lucide React (Icons)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** and npm ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/downloads))

## Project Structure

```
Design_by_XOXO/
├── backend/                 # Django REST API
│   ├── api/                # Main API app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # API routes
│   ├── fashion_store/      # Django project settings
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables (create this)
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── utils/          # Utility functions
│   ├── package.json        # Node dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md              # This file
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Design_by_XOXO
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

**On macOS/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

**On Windows:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env  # On Windows: type nul > .env
```

Add the following content to `.env`:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Note:** Replace `your-secret-key-here` with a secure random string. You can generate one using:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Run Database Migrations

```bash
python manage.py migrate
```

#### Load Sample Data (Optional)

To populate the database with sample products and categories:

```bash
python manage.py load_sample_data
```

#### Create Superuser (Optional)

To access the Django admin panel:

```bash
python manage.py createsuperuser
```

#### Start the Backend Server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to Frontend Directory

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Configure Environment (Optional)

The frontend is configured to use a proxy to connect to the backend. The proxy is already set in `package.json`. If you need to change the backend URL, create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
PORT=3000
```

#### Start the Frontend Development Server

```bash
npm start
```

The frontend will open automatically in your browser at `http://localhost:3000`

**Note:** If port 3000 is already in use, the app will prompt you to use another port. To force port 3000, ensure the `.env` file has `PORT=3000` set.

## Running the Application

1. **Start the Backend Server** (Terminal 1):
   ```bash
   cd backend
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   python manage.py runserver
   ```

2. **Start the Frontend Server** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Django Admin: http://localhost:8000/admin (if superuser created)

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/products/` - List all products
- `GET /api/products/?category=<slug>` - Filter products by category
- `GET /api/products/<id>/` - Get product details
- `GET /api/categories/` - List all categories
- `GET /api/search/?q=<query>` - Search products
- `POST /api/checkout/` - Create an order
- `POST /api/contact/` - Submit contact form
- `GET /api/` - API root with endpoint information

## Common Issues & Troubleshooting

### Port Already in Use

If port 3000 is already in use:

**Kill the process:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Or use a different port:**
Create/update `frontend/.env`:
```env
PORT=3001
```

### CORS Errors

If you see CORS errors in the browser console:

1. Ensure the backend `.env` includes your frontend URL in `CORS_ALLOWED_ORIGINS`
2. Restart the Django server after changing `.env`
3. Check that the frontend is using the proxy (configured in `package.json`)

### Database Issues

If you encounter database errors:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Module Not Found Errors

**Backend:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Development

### Backend Development

- API documentation: Visit `http://localhost:8000/api/` for API root
- Admin panel: `http://localhost:8000/admin/`
- To add new products: Use Django admin or create a management command

### Frontend Development

- The app uses Tailwind CSS for styling
- Components are in `frontend/src/components/`
- API calls are handled in `frontend/src/services/api.js`
- Hot reload is enabled by default

## Building for Production

### Backend

```bash
cd backend
python manage.py collectstatic
python manage.py migrate
# Use a production WSGI server (e.g., gunicorn)
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/build/` directory.

## Deployment to Render

This project includes configuration files for deploying to Render. See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Start:**
1. Push your code to GitHub
2. Connect your repository to Render
3. Use the `render.yaml` file for automatic configuration
4. Set environment variables in Render dashboard
5. Deploy!

**Files included for Render:**
- `render.yaml` - Render service configuration
- `backend/Procfile` - Process file for backend
- `backend/build.sh` - Build script
- `backend/fashion_store/settings_production.py` - Production settings

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DEBUG` | Enable/disable debug mode | `True` |
| `SECRET_KEY` | Django secret key | `your-secret-key` |
| `ALLOWED_HOSTS` | Allowed hostnames | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `/api` (uses proxy) |
| `PORT` | Frontend port | `3000` |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues and questions, please contact the development team or open an issue in the repository.

---

**Happy Coding! 🎉**

