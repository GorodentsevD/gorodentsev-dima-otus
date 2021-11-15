'use strict';

// Service for interaction with user model
module.exports = (core) => {
    const User = core.models.users;

    return {
        async create(data) {
            const user = await new User({
                username: data.username,
                password: data.password
            });

            await user.save();

            return user;
        },

        async get(id) {
            const user = await User.findOne({id});
            return user || null;
        },

        async login(username, password) {
            const user = await User.findOne({username});
            if (!user || !user.comparePassword(password)) {
                console.log(user ? 'incorrect password' : 'unknown user');
                return null
            }

            return user;
        },

        /**
         * Find user
         * @param {object} data
         * @returns {Promise<object|null>}
         */
        async find(data) {
            const user = await User.findOne(data);
            return user || null;
        },

        async update(id, data) {
            return User.updateOne({id}, data);
        }
    }
}
