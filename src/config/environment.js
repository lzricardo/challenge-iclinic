console.log('[SYSTEM] Setup environment variables');

const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

if (process.env.APP_ENV === 'development') {
    console.log(`[DEBUG_DEVELOPMENT] Environment variables=> ${JSON.stringify(result.parsed)}` );
}