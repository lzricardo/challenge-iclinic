const Sentry = require('@sentry/node');

console.log('[SYSTEM] Initialize Sentry\'s client');

try {
    if (process.env.SENTRY_DSN !== "") {
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
    } else {
        console.log('[SYSTEM] Sentry DSN not found');
    }

} catch (e) {
    console.log(`[SYSTEM] Whooops! An error ocurred => ${e}`);
}

module.exports = Sentry;