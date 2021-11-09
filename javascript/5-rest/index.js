'use strict';

const config = require('./config.json');
const database = require('./db');
const controllers = require('./controllers');
const server = require('./server');

// Init app core
(async () => {
    const core = {};

    // Init models of application
    core.models = await database(config.db);

    // Init controllers of app
    const router = controllers(core);

    // Init server start
    server(config.server.port, router);

    return core;
})().then(() => console.log('App started'))
    .catch((e) => {
        console.log(e);
        process.exit(-1);
    });