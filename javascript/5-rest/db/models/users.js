'use strict';

const bcrypt = require('bcrypt');
const {salt} = require('../../config.json');

module.exports = (mongoose) => {
    const UserSchema = new mongoose.Schema({
        id: Number,
        username: { type: String, required: true, index: { unique: true } },
        password: { type: String, required: true }
    });

    UserSchema.pre('save', function (next) {
        const user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(salt, (e, salt) => {
            if (e) return next(e);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, (e, hash) => {
                if (e) return next(e);
                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    UserSchema.methods.comparePassword = async (candidatePassword) => {
        return bcrypt.compare(candidatePassword, this.password);
    };

    UserSchema.methods.isCourseAvailable = (courseId) => {

    };

    UserSchema.methods.getAvailableCourses = () => {

    };

    return mongoose.model('Users', UserSchema);
}