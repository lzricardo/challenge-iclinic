const errorMessageMap = [
    {'RE400': {error: { message: 'malformed request', code: '01'}}},
    {'PH404': {error: { message: 'physician not found', code: '02'}}},
    {'PA404': {error: { message: 'patient not found', code: '03'}}},
    {'ME500': {error: { message: 'metrics service not available', code: '04'}}},
    {'PH500': {error: { message: 'physicians service not available', code: '05'}}},
    {'PA500': {error: { message: 'patients service not available', code: '06'}}},
    {'SE500': {error: { message: 'internal server error', code: '07'}}}
];

class ErrorMessageHelper {
    static process(entity, statusCode) {
        let label = entity + statusCode;
        let errorMessage = this._search(label);

        return (errorMessage.length > 0) ? errorMessage[0][label] : null;
    }

    static _search(label) {
        return errorMessageMap
            .filter(errorMessage => {
                return errorMessage.hasOwnProperty(label)
            });
    }
}

module.exports = ErrorMessageHelper;