const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

if (process.env.NODE_ENV === 'test') {
    require('./config/environment');
}

class AppController {
    constructor() {
        console.log('Initialize app');

        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        console.log('Setup middlewares');

        this.express.use(helmet());
        this.express.use(morgan('combined'));
        this.express.use(express.json());
    }

    routes() {
        console.log('Setup routes');

        this.express.use(require('./routes/index'));
        // this.express.use('/v1', require('./routes/v1'));
        this.express.use('/v2', require('./routes/v2'));
    }
}

module.exports = new AppController().express;