class RequestHelper {
    static processError(error) {
        if (error.hasOwnProperty('statusCode')) {
            return error.statusCode;
        } else {
            return 500;
        }
    }
}

module.exports = RequestHelper;