'use strict';

const express = require('express');
const app = express();
const {version} = require('./package.json');

// Init express server
module.exports = (port, router) => {
    app.use(router);

    app.get('/', (req, res) => {
        res.json({
           name: 'Otus rest API HomeWork',
           version
        });
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}