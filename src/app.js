const express = require('express');

if (process.env.NODE_ENV === 'test') {
    require('./config/environment');
    global.sequelizeConn = require('./singletons/sequelize');
}

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes/index'));
        // this.express.use('/v1', require('./routes/v1'));
        this.express.use('/v2', require('./routes/v2'));
    }
}

module.exports = new AppController().express;