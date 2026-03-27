# 🚀 Deployment Guide

This guide covers multiple deployment options for the Deepfake Detection System.

## 🌐 Vercel Deployment (Recommended)

### Frontend Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import the repository: `urvashi-agrawal-dev/Deepfake-video-image-detection`

2. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```

3. **Deploy Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Backend Deployment

1. **Create Separate Vercel Project**
   - Create a new Vercel project for the backend
   - Set root directory to `backend/`

2. **Configure Build Settings**
   - Framework Preset: **Other**
   - Build Command: `pip install -r requirements.txt`
   - Output Directory: `.`

3. **Environment Variables**
   ```env
   PYTHONPATH=/var/task
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - The `vercel.json` file is already configured
   - Deploy will happen automatically

### Update Frontend with Backend URL

After backend deployment, update the frontend environment variable:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

## 🐳 Docker Deployment

### Option 1: Docker Compose (Full Stack)

```bash
# Clone the repository
git clone https://github.com/urvashi-agrawal-dev/Deepfake-video-image-detection.git
cd Deepfake-video-image-detection

# Start both services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

### Option 2: Individual Containers

**Backend:**
```bash
cd backend
docker build -f Dockerfile.backend -t deepfake-backend .
docker run -p 8000:8000 deepfake-backend
```

**Frontend:**
```bash
docker build -f Dockerfile.frontend -t deepfake-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 deepfake-frontend
```

## ☁️ Cloud Platform Deployment

### AWS Deployment

#### Using AWS App Runner

1. **Backend (FastAPI)**
   ```bash
   # Create apprunner.yaml in backend/
   version: 1.0
   runtime: python3
   build:
     commands:
       build:
         - pip install -r requirements.txt
   run:
     runtime-version: 3.11
     command: python main.py
     network:
       port: 8000
       env: PORT
   ```

2. **Frontend (Next.js)**
   - Deploy to AWS Amplify
   - Connect GitHub repository
   - Set build settings and environment variables

#### Using AWS ECS

1. **Create ECR repositories**
2. **Push Docker images**
3. **Create ECS task definitions**
4. **Deploy services**

### Google Cloud Platform

#### Using Cloud Run

**Backend:**
```bash
# Build and push to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/deepfake-backend backend/

# Deploy to Cloud Run
gcloud run deploy deepfake-backend \
  --image gcr.io/PROJECT_ID/deepfake-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Frontend:**
```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/deepfake-frontend .

# Deploy
gcloud run deploy deepfake-frontend \
  --image gcr.io/PROJECT_ID/deepfake-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Deployment

#### Using Azure Container Instances

```bash
# Create resource group
az group create --name deepfake-rg --location eastus

# Deploy backend
az container create \
  --resource-group deepfake-rg \
  --name deepfake-backend \
  --image your-registry/deepfake-backend \
  --ports 8000 \
  --dns-name-label deepfake-backend-unique

# Deploy frontend
az container create \
  --resource-group deepfake-rg \
  --name deepfake-frontend \
  --image your-registry/deepfake-frontend \
  --ports 3000 \
  --dns-name-label deepfake-frontend-unique \
  --environment-variables NEXT_PUBLIC_API_URL=http://deepfake-backend-unique.eastus.azurecontainer.io:8000
```

## 🚂 Railway Deployment

### Backend Deployment

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Select the backend folder

2. **Configure Settings**
   ```env
   # Environment Variables
   PORT=8000
   PYTHONPATH=/app
   ```

3. **Deploy**
   - Railway will automatically detect Python and install dependencies
   - The app will be available at a Railway-provided URL

### Frontend Deployment

1. **Create New Service**
   - Add frontend as a separate service
   - Set root directory to `/`

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

## 🔧 Environment Variables Reference

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
```env
PORT=8000
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
PYTHONPATH=/app
```

## 📊 Performance Optimization

### Frontend Optimizations
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement proper caching headers
- Minimize bundle size

### Backend Optimizations
- Use production ASGI server (Gunicorn + Uvicorn)
- Implement request caching
- Optimize image processing
- Use connection pooling

### Production Configuration

**Frontend (next.config.js):**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-backend-domain.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
```

**Backend (production server):**
```python
# Use in production instead of uvicorn directly
import gunicorn.app.base
from main import app

class StandaloneApplication(gunicorn.app.base.BaseApplication):
    def __init__(self, app, options=None):
        self.options = options or {}
        self.application = app
        super().__init__()

    def load_config(self):
        for key, value in self.options.items():
            self.cfg.set(key.lower(), value)

    def load(self):
        return self.application

if __name__ == '__main__':
    options = {
        'bind': '0.0.0.0:8000',
        'workers': 4,
        'worker_class': 'uvicorn.workers.UvicornWorker',
    }
    StandaloneApplication(app, options).run()
```

## 🔍 Monitoring & Logging

### Health Checks
- Frontend: `/_next/health` (if configured)
- Backend: `/health`

### Logging Configuration
```python
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

## 🛡️ Security Considerations

1. **CORS Configuration**
   - Set specific allowed origins
   - Don't use wildcard (*) in production

2. **File Upload Security**
   - Validate file types and sizes
   - Scan uploaded files
   - Use temporary storage with cleanup

3. **API Rate Limiting**
   - Implement rate limiting for API endpoints
   - Use authentication for sensitive operations

4. **HTTPS**
   - Always use HTTPS in production
   - Configure SSL certificates properly

## 📈 Scaling Considerations

1. **Horizontal Scaling**
   - Use load balancers
   - Implement stateless design
   - Use external storage for uploads

2. **Caching**
   - Implement Redis for session storage
   - Use CDN for static assets
   - Cache API responses where appropriate

3. **Database**
   - Add database for user management
   - Store analysis results
   - Implement proper indexing

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check ALLOWED_ORIGINS configuration
   - Verify frontend URL matches backend CORS settings

2. **File Upload Failures**
   - Check file size limits
   - Verify supported file formats
   - Check disk space on server

3. **Memory Issues**
   - Monitor memory usage during video processing
   - Implement proper cleanup of temporary files
   - Consider using streaming for large files

4. **Performance Issues**
   - Optimize frame extraction count
   - Use appropriate server resources
   - Implement caching for repeated requests

### Debug Commands

```bash
# Check backend logs
docker logs deepfake-backend

# Check frontend build
npm run build

# Test API endpoints
curl -X GET http://localhost:8000/health

# Check environment variables
printenv | grep NEXT_PUBLIC
```

---

For additional support, please create an issue in the GitHub repository or contact the development team.