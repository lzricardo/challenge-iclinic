const request = require('supertest');
const app = require('../../src/app');

describe('Health Checker', () => {
    it('should be response status code 200 on /health endpoint', async () => {
        const response = await request(app)
            .get('/health');

        expect(response.status).toBe(200)
    });
});