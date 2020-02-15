// setup a cache object
const cacheManager = require('cache-manager');
const cache = cacheManager.caching({
    store: 'memory',
    max: 500 // keep maximum 500 different URL responses
});

module.exports = cache;