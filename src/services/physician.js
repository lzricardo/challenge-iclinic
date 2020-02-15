const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class PhysicianService {
    constructor() {
        this.request = rp(({
            defaults: {
                baseUrl: process.env.PHYSICIANS_API_URI,
                headers: {
                    'Accept': 'Accept: application/json',
                    'Authorization': `Bearer ${process.env.PHYSICIANS_API_TOKEN}`
                },
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
        }));
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `physicians/${id}`
            })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = new PhysicianService;