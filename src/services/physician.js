const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class PhysicianService {
    constructor() {
        try {
            this.request = rp({
                defaults: {
                    baseUrl: process.env.PHYSICIANS_API_URI,
                    headers: {
                        'Accept': 'Accept: application/json',
                        'Authorization': `Bearer ${process.env.PHYSICIANS_API_TOKEN}`
                    },
                    json: true,
                    rejectUnauthorized: (process.env.APP_ENV !== 'development'),
                    timeout: process.env.PHYSICIANS_API_TIMEOUT,
                    retry: {
                        attempts: process.env.PHYSICIANS_API_RETRIES,
                    },
                    cache: {
                        cache: cacheRequest,
                        cacheOptions: {
                            ttl: process.env.PHYSICIANS_API_TTL
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    getById(id) {
        try {
            return new Promise((resolve, reject) => {
                this.request({
                    url: `/physicians/${id}`
                })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new PhysicianService;