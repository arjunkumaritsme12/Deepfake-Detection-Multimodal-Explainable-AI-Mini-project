# 🚀 Quick Vercel Deployment Guide

## Step 1: Deploy Frontend

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your repository: `urvashi-agrawal-dev/Deepfake-video-image-detection`
   - Click "Import"

3. **Configure Frontend**
   - **Framework Preset**: Next.js
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Add Environment Variable**
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.vercel.app` (we'll get this in step 2)
   - For now, use: `http://localhost:8000`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://deepfake-detection-abc123.vercel.app`)

## Step 2: Deploy Backend

1. **Create New Project**
   - Click "New Project" again
   - Select the same repository: `urvashi-agrawal-dev/Deepfake-video-image-detection`

2. **Configure Backend**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Output Directory**: `.`

3. **Add Environment Variables**
   ```
   PYTHONPATH=/var/task
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   PORT=8000
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://deepfake-backend-xyz789.vercel.app`)

## Step 3: Update Frontend Environment

1. **Go to Frontend Project Settings**
   - Open your frontend project in Vercel dashboard
   - Go to "Settings" → "Environment Variables"

2. **Update API URL**
   - Edit `NEXT_PUBLIC_API_URL`
   - Set value to your backend URL: `https://deepfake-backend-xyz789.vercel.app`

3. **Redeploy Frontend**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

## Step 4: Test Your Deployment

1. **Visit Your Frontend URL**
   - Open `https://your-frontend-url.vercel.app`
   - Try uploading a test image or video

2. **Check Backend Health**
   - Visit `https://your-backend-url.vercel.app/health`
   - Should return JSON with status information

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Make sure `ALLOWED_ORIGINS` in backend includes your frontend URL
   - Check that frontend `NEXT_PUBLIC_API_URL` points to correct backend

2. **Backend Build Fails**
   - Ensure `requirements.txt` is in the backend directory
   - Check that all Python dependencies are compatible with Vercel

3. **Frontend Can't Connect to Backend**
   - Verify environment variable `NEXT_PUBLIC_API_URL` is set correctly
   - Check browser network tab for actual API calls

### Debug Commands:

```bash
# Test backend locally
curl https://your-backend-url.vercel.app/health

# Check environment variables
console.log(process.env.NEXT_PUBLIC_API_URL)
```

## 📱 Final URLs

After successful deployment, you'll have:

- **Frontend**: `https://your-frontend-url.vercel.app`
- **Backend API**: `https://your-backend-url.vercel.app`
- **API Docs**: `https://your-backend-url.vercel.app/docs`
- **Health Check**: `https://your-backend-url.vercel.app/health`

## 🎉 Success!

Your Deepfake Detection System is now live and ready to use! 

Share your frontend URL with users to start detecting deepfakes in real-time.