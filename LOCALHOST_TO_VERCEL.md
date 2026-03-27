# 🚀 Deploy Localhost to Vercel - Exact Same Functionality

This guide ensures you deploy the **exact same working functionality** from localhost to Vercel.

## ✅ Current Localhost Setup (Working)

- **Frontend**: http://localhost:3000 (Next.js)
- **Backend**: http://localhost:8000 (FastAPI)
- **Features Working**:
  - ✅ Video deepfake detection
  - ✅ Image deepfake detection  
  - ✅ Individual face analysis
  - ✅ Frame-by-frame display
  - ✅ Real-time progress tracking
  - ✅ Detailed confidence scoring

## 🎯 Vercel Deployment Steps

### Step 1: Deploy Backend First

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Repository for Backend**
   - Click "New Project"
   - Select: `urvashi-agrawal-dev/Deepfake-video-image-detection`
   - **IMPORTANT**: Set Root Directory to `backend`

3. **Backend Configuration**
   ```
   Framework Preset: Other
   Root Directory: backend
   Build Command: pip install -r requirements.txt
   Output Directory: .
   Install Command: pip install -r requirements.txt
   ```

4. **Backend Environment Variables**
   ```
   PYTHONPATH=/var/task
   ALLOWED_ORIGINS=*
   PORT=8000
   ```

5. **Deploy Backend**
   - Click "Deploy"
   - Wait for completion
   - **Copy your backend URL**: `https://your-backend-name.vercel.app`

### Step 2: Deploy Frontend

1. **Create New Vercel Project**
   - Click "New Project" again
   - Select same repository: `urvashi-agrawal-dev/Deepfake-video-image-detection`
   - **Root Directory**: `.` (default - for frontend)

2. **Frontend Configuration**
   ```
   Framework Preset: Next.js
   Root Directory: . (leave empty)
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Frontend Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.vercel.app
   ```
   ⚠️ **Replace with your actual backend URL from Step 1**

4. **Deploy Frontend**
   - Click "Deploy"
   - Wait for completion
   - **Your app is live**: `https://your-frontend-name.vercel.app`

### Step 3: Update CORS (Important!)

1. **Go to Backend Project Settings**
   - Open your backend project in Vercel
   - Go to Settings → Environment Variables

2. **Update ALLOWED_ORIGINS**
   ```
   ALLOWED_ORIGINS=https://your-frontend-name.vercel.app,http://localhost:3000
   ```
   ⚠️ **Replace with your actual frontend URL**

3. **Redeploy Backend**
   - Go to Deployments tab
   - Click "..." on latest deployment → "Redeploy"

## 🧪 Test Your Deployment

### 1. Backend Health Check
Visit: `https://your-backend-name.vercel.app/health`

Should return:
```json
{
  "status": "healthy",
  "model": "Vision Transformer",
  "ml_available": true,
  "face_detection": "multi_scale_opencv"
}
```

### 2. Frontend Test
1. Visit: `https://your-frontend-name.vercel.app`
2. Upload a test image or video
3. Verify all features work:
   - ✅ File upload
   - ✅ Progress tracking
   - ✅ Results display
   - ✅ Individual frames
   - ✅ Face analysis

## 🔧 Troubleshooting

### Issue: CORS Error
**Solution**: Update `ALLOWED_ORIGINS` in backend with your frontend URL

### Issue: API Not Found
**Solution**: Check `NEXT_PUBLIC_API_URL` in frontend environment variables

### Issue: Backend Build Fails
**Solution**: Ensure `requirements.txt` is in backend directory

### Issue: Frontend Can't Connect
**Solution**: Verify backend URL is correct and accessible

## 📋 Final Checklist

- [ ] Backend deployed and health check passes
- [ ] Frontend deployed and loads correctly
- [ ] CORS configured with frontend URL
- [ ] Test video upload works
- [ ] Test image upload works
- [ ] Individual face analysis displays
- [ ] Frame-by-frame results show
- [ ] Progress tracking works
- [ ] Confidence scores display

## 🎉 Success URLs

After deployment:
- **Your App**: `https://your-frontend-name.vercel.app`
- **API Health**: `https://your-backend-name.vercel.app/health`
- **API Docs**: `https://your-backend-name.vercel.app/docs`

## 💡 Pro Tips

1. **Keep localhost working**: Don't change local environment variables
2. **Test thoroughly**: Upload both images and videos to verify
3. **Monitor logs**: Check Vercel function logs if issues occur
4. **Update README**: Add your live URLs to the README

Your localhost functionality will be **exactly replicated** on Vercel! 🚀