'use strict';

const {RestApiError} = require("../errors");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = (router, core) => {

    // Get list of available courses
    router.get('/users/courses/', async (req, res) => {

    });

    router.get('/users/:id', async (req, res) => {
        try {
            const user = await core.services.users.get(req.params.id);
            res.response(user);
        } catch (e) {
            console.log(e);
            res.response(e);
        }
    });
    
    router.post('/users/register', async (req, res) => {
        try {
            const data = {
                username: req.body.username,
                password: req.body.password
            }
            if (!data.username || !data.password) return res.response(new RestApiError('Bad request', 'bad_request', 400));

            const exists = await core.services.users.find({username: data.username});
            if (exists) return res.response(new RestApiError('Duplicate username', 'duplicate', 400));

            const user = await core.services.users.create(data);
            return res.response({id: user._id});
        } catch (e) {
            console.log(e);
            res.response(e);
        }
    });

    router.post('/users/login', async (req, res) => {
        try {
            const data = {
                username: req.body.username,
                password: req.body.password
            }

            if (!data.username || !data.password) return res.response(new RestApiError('Bad request', 'bad_request', 400));

            const user = await core.services.users.login(data.username, data.password);
            if (!user) return res.response(new RestApiError('Incorrect login or/and password', 'unauthorized', 401));

            const rsaPrivate = fs.readSync(path.join(__dirname, '..', '..', 'keys', 'private')).toString();

            const token =  jwt.sign({}, rsaPrivate, {
                algorithm: 'RS256',
                expiresIn: 480000000,
                subject: '' + user._id
            });

            return res.response({id: user._id, token});
        } catch (e) {
            console.log(e);
            res.response(e);
        }
    });
}