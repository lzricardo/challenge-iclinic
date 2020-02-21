class RequestHelper {
    static processError(error) {
        try {
            if (error.hasOwnProperty('statusCode')) {
                return error.statusCode;
            } else {
                return 500;
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = RequestHelper;