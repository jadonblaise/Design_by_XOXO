# Render Deployment Guide

This guide will help you deploy the Design by XOXO application to Render.

## Prerequisites

1. A GitHub account with this repository
2. A Render account (sign up at https://render.com)

## Deployment Steps

### Step 1: Prepare Your Repository

1. Push your code to GitHub (if not already done)
2. Ensure all files are committed and pushed

### Step 2: Deploy Backend (Django API)

1. Go to your Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `design-by-xoxo-api`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install -r backend/requirements.txt && cd backend && python manage.py collectstatic --noinput
     ```
   - **Start Command**: 
     ```bash
     cd backend && gunicorn fashion_store.wsgi:application
     ```
   - **Root Directory**: Leave empty (or set to `backend` if needed)

5. **Environment Variables** (Add these in Render dashboard):
   ```
   DEBUG=False
   SECRET_KEY=<generate-a-secure-random-key>
   ALLOWED_HOSTS=design-by-xoxo-api.onrender.com
   CORS_ALLOWED_ORIGINS=https://design-by-xoxo-frontend.onrender.com
   DATABASE_URL=<will-be-set-automatically-if-using-render-database>
   ```

6. **Add PostgreSQL Database**:
   - Click **"New +"** → **"PostgreSQL"**
   - Name it: `design-by-xoxo-db`
   - Copy the **Internal Database URL** and add it to your backend service's `DATABASE_URL` environment variable

7. Click **"Create Web Service"**

### Step 3: Run Migrations

After the backend is deployed:

If you can't access the Render Shell (common on Free plans), you can still create an admin user automatically on deploy.

#### Option A (Recommended): Auto-create admin user via env vars (no Shell required)

We include a management command that runs during `backend/build.sh`:
- `python manage.py ensure_admin`

Set these environment variables in your **backend Render service**:

```
CREATE_SUPERUSER=True

# You can use either naming style:
ADMIN_USERNAME=admin
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<choose-a-strong-password>

# ...or (also supported):
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=you@example.com
DJANGO_SUPERUSER_PASSWORD=<choose-a-strong-password>
```

Then redeploy the backend. The deploy will create (or update) the superuser automatically.

#### Option B: Use Shell (if available)

1. Go to your backend service in Render
2. Open the **Shell** tab
3. Run:
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py load_sample_data
```

### Step 4: Deploy Frontend (React App)

1. Go to your Render Dashboard
2. Click **"New +"** → **"Static Site"** (or **"Web Service"** for Node)
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `design-by-xoxo-frontend`
   - **Environment**: `Node`
   - **Build Command**: 
     ```bash
     cd frontend && npm install && npm run build
     ```
   - **Publish Directory**: `frontend/build`
   - **Root Directory**: Leave empty

5. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://design-by-xoxo-api.onrender.com/api
   ```

6. Click **"Create Static Site"** (or **"Create Web Service"**)

### Step 5: Update CORS Settings

1. Go back to your backend service
2. Update the `CORS_ALLOWED_ORIGINS` environment variable:
   ```
   CORS_ALLOWED_ORIGINS=https://design-by-xoxo-frontend.onrender.com
   ```
3. Redeploy the backend service

## Using render.yaml (Alternative Method)

If you prefer using the `render.yaml` file:

1. Push `render.yaml` to your repository
2. In Render Dashboard, click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will automatically detect and configure services from `render.yaml`
5. Update environment variables in the dashboard as needed

## Environment Variables Reference

### Backend Service

| Variable | Description | Example |
|----------|-------------|---------|
| `DEBUG` | Debug mode (always False in production) | `False` |
| `SECRET_KEY` | Django secret key | Generate secure random string |
| `ALLOWED_HOSTS` | Allowed hostnames | `design-by-xoxo-api.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | Frontend URL(s) | `https://design-by-xoxo-frontend.onrender.com` |
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Render |

### Frontend Service

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://design-by-xoxo-api.onrender.com/api` |

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Database migrations completed
- [ ] Static files collected
- [ ] Frontend is built and deployed
- [ ] CORS settings updated with frontend URL
- [ ] Environment variables set correctly
- [ ] Test API endpoints
- [ ] Test frontend connection to backend
- [ ] Create superuser for admin access
- [ ] Load sample data (optional)

## Troubleshooting

### Backend Issues

**Static files not loading:**
- Ensure `collectstatic` runs in build command
- Check WhiteNoise middleware is enabled
- Verify `STATIC_ROOT` is set correctly

**Database connection errors:**
- Verify `DATABASE_URL` is set correctly
- Check database is running and accessible
- Ensure `psycopg2-binary` is in requirements.txt

**CORS errors:**
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check URL format (include `https://`)
- Restart backend service after updating

### Frontend Issues

**API connection errors:**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend URL is accessible
- Ensure CORS is configured on backend

**Build failures:**
- Check Node version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

## Custom Domain Setup

1. In Render dashboard, go to your service
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain
4. Update DNS records as instructed
5. Update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` with new domain

## Monitoring

- Check Render logs for errors
- Monitor service health in dashboard
- Set up alerts for service downtime
- Review application logs regularly

## Cost Considerations

- **Free tier**: Limited resources, services sleep after inactivity
- **Starter plan**: Better performance, always-on services
- **Professional plan**: Production-ready with auto-scaling

For production, consider upgrading from free tier.

## Security Notes

- Never commit `.env` files
- Use Render's environment variables
- Generate strong `SECRET_KEY`
- Keep dependencies updated
- Enable HTTPS (automatic on Render)
- Regularly review and update security settings

---

**Need Help?** Check Render's documentation: https://render.com/docs
