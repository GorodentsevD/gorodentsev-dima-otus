'use strict';

const path = require('path');
const fs = require('fs');
const {RestApiError} = require("./errors");

const router = require('express').Router();

// Init controllers of application
module.exports = (core) => {
    const ctrlPath = path.join(__dirname, 'routers');

    fs.readdirSync(ctrlPath).forEach(file => {
        require(`./routers/${file}`)(router, core);
    });

    return router;
}
