const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class ClinicService {
    constructor() {
        this.request = rp(({
            defaults: {
                baseUrl: process.env.CLINICS_API_URI,
                headers: {
                    'Accept': 'Accept: application/json',
                    'Authorization': `Bearer ${process.env.CLINICS_API_TOKEN}`
                },
                rejectUnauthorized: (process.env.APP_ENV !== 'development'),
                timeout: process.env.CLINICS_API_TIMEOUT,
                retry: {
                    attempts: process.env.CLINICS_API_RETRIES,
                },
                cache: {
                    cache: cacheRequest,
                    cacheOptions: {
                        ttl: process.env.CLINICS_API_TTL
                    }
                }
            }
        }));
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `clinics/${id}`
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

module.exports = new ClinicService;