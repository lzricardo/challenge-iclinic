const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class MetricService {
    constructor() {
        try {
            this.request = rp({
                defaults: {
                    baseUrl: process.env.METRICS_API_URI,
                    headers: {
                        'Accept': 'Accept: application/json',
                        'Authorization': `Bearer ${process.env.METRICS_API_TOKEN}`
                    },
                    method: 'post',
                    json: true,
                    rejectUnauthorized: (process.env.APP_ENV !== 'development'),
                    timeout: process.env.METRICS_API_TIMEOUT,
                    retry: {
                        attempts: process.env.METRICS_API_RETRIES,
                    },
                    cache: {
                        cache: cacheRequest,
                        cacheOptions: {
                            ttl: process.env.METRICS_API_TTL
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    send(metric) {
        return new Promise((resolve, reject) => {
            try {
                this.request({
                    url: `api/metrics`,
                    body: metric
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            } catch (e) {
                console.error(e);
            }
        });
    }
}

module.exports = new MetricService;