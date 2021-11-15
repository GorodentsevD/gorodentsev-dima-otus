'use strict';

const {RestApiError} = require("../errors");
const jwt = require('jsonwebtoken');
const rsaPublic = require('fs').readFileSync('../../keys/jwtRS256.key.pub');

module.exports = (core) => {
    const Users = core.services.users;

    return async (req, res, next) => {
        try {
            const token = req.headers.Authorization;
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