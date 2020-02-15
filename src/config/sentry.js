const Sentry = require('@sentry/node');

console.log('[SENTRY] Initialize client');

try {
    Sentry.init({
        dsn: process.env.APP_SENTRY_DSN,
        environment: process.env.APP_ENV,
        beforeSend(event) {
            if (process.env.APP_ENV === 'development') {
                return false;
            }

            return (event);
        }
    });
} catch (e) {
    console.log(`[SYSTEM] Whooops! An error ocurred => ${e}`);
}


console.log('[SENTRY] Setup and override console.error');

(function(){
    let _error = console.error;

    console.error = function (message) {
        console.log(`[SYSTEM] Whooops! An error ocurred => ${message}`);

        try {
            Sentry.captureException(message);
        } catch (e) {
            console.log(`[SYSTEM] Whooops! An error ocurred => ${e}`);
        }

        _error.apply(console, arguments);
    };
})();