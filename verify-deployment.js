// 🚀 Deployment Verification Script
// Use this script to ensure your Vercel deployment works the same as your localhost setup

const LOCALHOST_BACKEND = 'http://localhost:8000';
const LOCALHOST_FRONTEND = 'http://localhost:3000';

// 🔗 Replace these with your actual Vercel deployment URLs
const VERCEL_BACKEND = 'https://your-backend-name.vercel.app';
const VERCEL_FRONTEND = 'https://your-frontend-name.vercel.app';

async function verifyEndpoint(url, description) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`✅ ${description}: ${response.status} - ${response.ok ? 'SUCCESS' : 'FAILED'}`);
    return response.ok;
  } catch (error) {
    console.log(`❌ ${description}: ERROR - ${error.message}`);
    return false;
  }
}

async function verifyDeployment() {
  console.log('🔍 Starting Deployment Verification...\n');
  
  // 📍 Localhost checks (baseline validation)
  console.log('📍 Checking Localhost Environment:');
  await verifyEndpoint(`${LOCALHOST_BACKEND}/health`, 'Backend Health Check (Local)');
  await verifyEndpoint(`${LOCALHOST_BACKEND}/debug/test-detection`, 'Debug Endpoint (Local)');
  
  console.log('\n📍 Checking Vercel Deployment:');
  await verifyEndpoint(`${VERCEL_BACKEND}/health`, 'Backend Health Check (Vercel)');
  await verifyEndpoint(`${VERCEL_BACKEND}/debug/test-detection`, 'Debug Endpoint (Vercel)');
  
  console.log('\n🎯 Core Features to Validate:');
  console.log('- Deepfake detection for videos');
  console.log('- Deepfake detection for images');
  console.log('- Per-face analysis (7 categories)');
  console.log('- Frame-by-frame visualization');
  console.log('- Real-time progress tracking');
  console.log('- High-sensitivity detection thresholds');
  
  console.log('\n📋 Manual Testing Checklist:');
  console.log(`1. Open: ${VERCEL_FRONTEND}`);
  console.log('2. Upload a sample video → ensure all frames are displayed');
  console.log('3. Upload a sample image → verify face detection and analysis');
  console.log('4. Confirm individual face crops are shown');
  console.log('5. Validate confidence scores and detailed insights');
}

// 👉 After deployment, uncomment this line to run verification
// verifyDeployment();

console.log('📝 Setup Instructions:');
console.log('1. Deploy your project to Vercel (refer to LOCALHOST_TO_VERCEL.md)');
console.log('2. Update VERCEL_BACKEND and VERCEL_FRONTEND with your live URLs');
console.log('3. Run the script using: node verify-deployment.js');