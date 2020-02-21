const Sentry = require('./sentry');

console.log('[SYSTEM] Setup and override console.log and console.error');

(function(){
    let _error = console.error;

    console.error = function (error) {
        console.log(`[SYSTEM] Whooops! An error ocurred => ${error.message}`);

        try {
            if (process.env.SENTRY_DSN !== "") {
                Sentry.captureException(error);
            }
        } catch (e) {
            console.log(`[SYSTEM] Whooops! An error ocurred => ${e}`);
        }

        _error.apply(console, arguments);
    };

    let _log = console.log;

    console.log = function (message) {
        arguments[0] = `[SYSTEM] ${arguments[0]}`;

        _log.apply(console, arguments);
    };
})();