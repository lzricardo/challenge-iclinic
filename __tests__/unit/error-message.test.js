const ErrorMessageHelper = require('../../src/helpers/error-message');

describe('Error message helper\'s process', () => {
    it('should check error\'s payload', () => {
        expect(ErrorMessageHelper.process('RE', 400)).toEqual({
            error: {
                message: "malformed request",
                code: "01"
            }
        });

        expect(ErrorMessageHelper.process('PA', 500)).toEqual({
            error: {
                message: "patients service not available",
                code: "06"
            }
        });

        expect(ErrorMessageHelper.process('SE', 500)).toEqual({
            error: {
                message: "internal server error",
                code: "07"
            }
        });

        expect(ErrorMessageHelper.process('EE', 333)).toBeNull();
    });
});