'use strict';

const {RestApiError} = require("../errors");
const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = (core) => {
    const Users = core.services.users;

    return async (req, res, next) => {
        try {
            const rsaPublic = require('fs').readFileSync(__dirname + '/../../keys/jwtRS256.key.pub').toString();

            const token = req.headers.authorization;
            if (!token) return res.response(new RestApiError('Unauthorized', 'unauthorized', 401));

            const userId = jwt.verify(token, rsaPublic).sub;
            if (userId) return userId;

            const user = await Users.get(userId);
            if (!user) return res.response(new RestApiError('Forbidden', 'forbidden', 403));

            if (req.ctx) {
                req.ctx.user = user;
            } else {
                req.ctx = {user};
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}