const cacheRequest = require('../config/cache-request');
const rp = require('request-plus');

class PatientService {
    constructor() {
        try {
            this.request = rp({
                defaults: {
                    baseUrl: process.env.PATIENTS_API_URI,
                    headers: {
                        'Accept': 'Accept: application/json',
                        'Authorization': `Bearer ${process.env.PATIENTS_API_TOKEN}`
                    },
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
            });
        } catch (e) {
            console.error(e);
        }
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                this.request({
                    url: `patients/${id}`
                })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } catch (e) {
                console.error(e);
            }
        });
    }
}

module.exports = new PatientService;