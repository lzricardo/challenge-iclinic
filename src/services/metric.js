const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class MetricService {
    constructor() {
        this.request = rp(({
            defaults: {
                baseUrl: process.env.PATIENTS_API_URI,
                headers: {
                    'Accept': 'Accept: application/json',
                    'Authorization': `Bearer ${process.env.PATIENTS_API_TOKEN}`
                },
                method: 'post',
                json: true,
                rejectUnauthorized: (process.env.APP_ENV !== 'development'),
                timeout: process.env.PATIENTS_API_TIMEOUT,
                retry: {
                    attempts: process.env.PATIENTS_API_RETRIES,
                },
                cache: {
                    cache: cacheRequest,
                    cacheOptions: {
                        ttl: process.env.PATIENTS_API_TTL
                    }
                }
            }
        }));
    }

    send(metric) {
        return new Promise((resolve, reject) => {
            this.request({
                url: `api/metrics`,
                body: metric
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

module.exports = new MetricService;