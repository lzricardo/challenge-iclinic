const RequestHelper = require('../../src/helpers/request');

describe('Request helper\'s', () => {
    it('should be process request errors', () => {
        let error404 = new Error('Not found');
        error404.statusCode = 404;

        expect(RequestHelper.processError(error404)).toBe(404);

        let error500 = new Error('Internal server error');
        error500.statusCode = 500;

        expect(RequestHelper.processError(error500)).toBe(500);

        let error400 = new Error('Bad request');
        error400.statusCode = 400;

        expect(RequestHelper.processError(error500)).toBe(500);

        let commonError = new Error('Common error');

        expect(RequestHelper.processError(commonError)).toBe(500);
    });
});