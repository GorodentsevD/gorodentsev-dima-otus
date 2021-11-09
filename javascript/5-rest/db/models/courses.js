'use strict';

module.exports = (mongoose) => {
    const courseSchema = new mongoose.Schema({
        id: Number,
        user_id: Number, // Id of course creator
        name: String,
        description: String
    });

    courseSchema.methods.getLessons = () => {

    };

    courseSchema.methods.getLesson = (lessonId) => {

    };

    // Get public data of course, description, list of lessons with its descriptions
    courseSchema.methods.getPublicData = () => {

    }

    return mongoose.model('Courses', courseSchema);
}
