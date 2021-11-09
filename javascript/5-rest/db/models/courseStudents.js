'use strict';

module.exports = (mongoose) => {
    const csSchema = new mongoose.Schema({
        id: Number,
        user_id: Number, // Id of student
        course_id: Number,
        activated: Boolean
    });

    // Grant access to course
    csSchema.methods.grantAccess = (creatorId, courseId, studentId) => {

    }

    // Block access to course
    csSchema.methods.blockAccess = (creatorId, courseId, studentId) => {

    }

    return mongoose.model('CourseStudents', csSchema);
}