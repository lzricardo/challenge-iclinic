console.log('[SYSTEM] Listen uncaughtException and unhandledRejection');

process.on('uncaughtException', err => {
    console.log('[ERROR] Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('[ERROR] Unhandled Rejection: ', reason);
});