'use strict';

const express = require('express');
const app = express();
const {version} = require('./package.json');
const {RestApiError} = require("./controllers/errors");
const response = require('./controllers/middlewares/response');

// Init express server
module.exports = (port, core) => {
    app.use(express.json());

    app.use((req, res, next) => {
        res.response = response(res);

        // Response for pre-flight requests
        if (req.method === 'HEAD' || req.method === 'OPTIONS') {
            return res.response(null);
        }

        next();
    });

    app.get('/', (req, res) => {
        try {
            res.response({
                name: 'Otus rest API HomeWork',
                version
            });
        } catch (e) {
            console.log(e);
            res.json(e);
        }
    });

    // Init controllers
    app.use('/', require('./controllers')(core));

    // Process unhandled errors
    app.use((err, req, res, next) => {
        response(res)(err instanceof SyntaxError ? new RestApiError('Invalid JSON', 'bad_request', 400) : err);
    });

    // 404 error handling middleware
    app.use((req, res) => {
        response(res)(new RestApiError('Resource Not Found', 'not_found', 404));
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}