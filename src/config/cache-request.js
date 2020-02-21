const cacheManager = require('cache-manager');
const cache = cacheManager.caching({
    store: process.env.CACHE_REQUEST_STORE,
    max: process.env.CACHE_REQUEST_MAX
});

module.exports = cache;