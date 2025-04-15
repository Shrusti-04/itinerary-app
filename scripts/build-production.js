const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Load environment variables
require('dotenv').config();

async function buildFrontend() {
  console.log('Building frontend...');
  try {
    await execPromise('cd client && npm run build');
    console.log('Frontend build completed');
  } catch (error) {
    console.error('Frontend build failed:', error);
    throw error;
  }
}

async function prepareForGlitch() {
  console.log('Preparing for Glitch deployment...');
  try {
    // Create production env file for Glitch
    const envContent = `
NODE_ENV=production
PORT=3000
MONGODB_URI=${process.env.MONGODB_URI}
B2_APPLICATION_KEY_ID=${process.env.B2_APPLICATION_KEY_ID}
B2_APPLICATION_KEY=${process.env.B2_APPLICATION_KEY}
B2_BUCKET_NAME=${process.env.B2_BUCKET_NAME}
B2_BUCKET_ID=${process.env.B2_BUCKET_ID}
WEATHER_API_KEY=${process.env.WEATHER_API_KEY}
    `.trim();

    await fs.writeFile(path.join(__dirname, '..', '.env.production'), envContent);

    // Create start script for Glitch
    const startScript = 'npm start';
    await fs.writeFile(path.join(__dirname, '..', 'start.sh'), startScript);
    await fs.chmod(path.join(__dirname, '..', 'start.sh'), '755');

    console.log('Glitch preparation completed');
  } catch (error) {
    console.error('Glitch preparation failed:', error);
    throw error;
  }
}

async function main() {
  try {
    // Build frontend
    await buildFrontend();

    // Run the deploy script to upload to B2
    require('./deploy');

    // Prepare for Glitch
    await prepareForGlitch();

    console.log('Production build completed successfully!');
  } catch (error) {
    console.error('Production build failed:', error);
    process.exit(1);
  }
}

main();
