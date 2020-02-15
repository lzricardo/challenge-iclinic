require('./config/environment');

const app = require('./app');

app.listen(process.env.SERVER_PORT || 3000);