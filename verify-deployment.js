// Deployment Verification Script
// Run this to verify your Vercel deployment matches localhost functionality

const LOCALHOST_BACKEND = 'http://localhost:8000';
const LOCALHOST_FRONTEND = 'http://localhost:3000';

// Replace these with your Vercel URLs after deployment
const VERCEL_BACKEND = 'https://your-backend-name.vercel.app';
const VERCEL_FRONTEND = 'https://your-frontend-name.vercel.app';

async function verifyEndpoint(url, description) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`✅ ${description}: ${response.status} - ${response.ok ? 'OK' : 'FAILED'}`);
    return response.ok;
  } catch (error) {
    console.log(`❌ ${description}: ERROR - ${error.message}`);
    return false;
  }
}

async function verifyDeployment() {
  console.log('🔍 Verifying Deployment...\n');
  
  // Test localhost (should work)
  console.log('📍 Testing Localhost:');
  await verifyEndpoint(`${LOCALHOST_BACKEND}/health`, 'Localhost Backend Health');
  await verifyEndpoint(`${LOCALHOST_BACKEND}/debug/test-detection`, 'Localhost Debug Info');
  
  console.log('\n📍 Testing Vercel Deployment:');
  await verifyEndpoint(`${VERCEL_BACKEND}/health`, 'Vercel Backend Health');
  await verifyEndpoint(`${VERCEL_BACKEND}/debug/test-detection`, 'Vercel Debug Info');
  
  console.log('\n🎯 Expected Features:');
  console.log('- Video deepfake detection');
  console.log('- Image deepfake detection');
  console.log('- Individual face analysis (7 categories)');
  console.log('- Frame-by-frame display');
  console.log('- Real-time progress tracking');
  console.log('- Ultra-sensitive detection thresholds');
  
  console.log('\n📋 Manual Tests Required:');
  console.log(`1. Visit: ${VERCEL_FRONTEND}`);
  console.log('2. Upload a test video - verify all frames display');
  console.log('3. Upload a test image - verify face analysis works');
  console.log('4. Check individual face crops appear');
  console.log('5. Verify confidence scores and detailed analysis');
}

// Uncomment and update URLs after deployment
// verifyDeployment();

console.log('📝 Instructions:');
console.log('1. Deploy to Vercel following LOCALHOST_TO_VERCEL.md');
console.log('2. Update VERCEL_BACKEND and VERCEL_FRONTEND URLs above');
console.log('3. Run: node verify-deployment.js');