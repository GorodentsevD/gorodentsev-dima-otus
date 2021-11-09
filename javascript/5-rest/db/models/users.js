'use strict';

module.exports = (mongoose) => {
    const usersSchema = new mongoose.Schema({
        id: Number,
        name: String,
        login: String,
        password: String,
    });

    usersSchema.methods.isCourseAvailable = (courseId) => {

    };

    usersSchema.methods.getAvailableCourses = () => {

    };

    return mongoose.model('Users', usersSchema);
}