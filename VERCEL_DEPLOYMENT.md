# Vercel Deployment Guide for Interview Prep AI Backend

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub account with your project pushed
- MongoDB Atlas cluster (for MONGO_URI)
- Google Generative AI API key

## Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "Make backend deployment ready for Vercel"
git push origin main
```

## Step 2: Deploy on Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Choose "backend" folder as root directory
5. Click "Deploy"

## Step 3: Set Environment Variables on Vercel
After deployment, go to your project settings:

1. Click on your project in Vercel dashboard
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGO_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `GOOGLE_API_KEY` | Your Google Generative AI key | Your actual API key |
| `JWT_SECRET` | A secure random string | `your-secure-random-string-here` |
| `FRONTEND_URL` | Your frontend URL | `https://yourapp.vercel.app` |

4. After adding all variables, redeploy:
   - Click "Deployments" tab
   - Click on your latest deployment
   - Click "Redeploy"

## Step 4: Update Frontend API URL
In your frontend, update the API base URL to point to your Vercel deployment:

**File:** `frontend/interview-prep-ai/src/utils/axiosInstance.js`

Change from:
```javascript
baseURL: 'http://localhost:8000'
```

To:
```javascript
baseURL: process.env.REACT_APP_API_URL || 'https://your-backend-url.vercel.app'
```

Then add environment variable in `.env`:
```
REACT_APP_API_URL=https://your-backend-name.vercel.app
```

## Step 5: Important Notes About File Uploads

⚠️ **Serverless Limitation:** Files uploaded to `/uploads` won't persist on Vercel (serverless environment).

**Solution:** Move to cloud storage. If using image uploads:
1. Install AWS SDK or cloud storage package
2. Upload to services like:
   - AWS S3
   - MongoDB GridFS
   - CloudFront
   - Cloudinary (recommended for images)

## Step 6: Test Your Deployment
```bash
# Test authentication
curl -X POST https://your-backend.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Check if server is running
curl https://your-backend.vercel.app/api/auth/login
```

## Common Issues

### Issue: "MONGO_URI is undefined"
**Solution:** Add `MONGO_URI` to Environment Variables in Vercel settings

### Issue: "Connection refused" or timeout
**Solution:** Check if MongoDB Atlas allows Vercel IPs:
- Go to MongoDB Atlas → Network Access
- Add IP 0.0.0.0/0 (allow all) OR add Vercel's IP ranges

### Issue: CORS errors on frontend
**Solution:** Ensure `FRONTEND_URL` is set correctly in environment variables

### Issue: "deploymentId is not defined"
Usually caused by environment variables not being set. Re-add them and redeploy.

## Next Steps
1. Set all environment variables on Vercel ✓
2. Redeploy after setting variables ✓
3. Update frontend API URL ✓
4. Test all API endpoints ✓
5. (Optional) Migrate file uploads to cloud storage ✓
