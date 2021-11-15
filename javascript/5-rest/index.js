'use strict';

const config = require('./config.json');
const database = require('./db');
const services = require('./services');
const server = require('./server');

// Init app core
(async () => {
    const core = {};

    // Init models of application
    core.models = await database(config.db);

    // Init services of app
    core.services = await services(core);

    // Init server start
    server(config.server.port, core);

    return core;
})().then(() => {
    console.log('App started')
}).catch((e) => {
    console.log(e);
    process.exit(-1);
});