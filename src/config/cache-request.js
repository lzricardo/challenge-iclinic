const cacheManager = require('cache-manager');
const cache = cacheManager.caching({
    store: 'memory',
    max: 500
});

module.exports = cache;