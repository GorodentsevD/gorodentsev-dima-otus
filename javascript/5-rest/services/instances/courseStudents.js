'use strict';

// Service for interaction with course model
module.exports = (core) => {
    const cs = core.models.courseStudents;
    const Course = core.models.courses;

    return {
        // Grant access to course
        async grantAccess(creatorId, courseId, studentId) {
            return cs.updateOne({
                id: courseId, user_id: studentId
            }, {activated: true});
        },

        // Block access to course
        async blockAccess(creatorId, courseId, studentId) {
            return cs.updateOne({
                id: courseId,
                user_id: studentId
            }, {activated: false});
        },

        // Get list of students of course
        async getCourseStudents(courseId, creatorId) {
            return cs.find({
                id: courseId,
                activated: true
            });
        },

        // Get list of requests of course
        async getCourseRequests(courseId) {
            return cs.find({
                id: courseId,
                activated: false
            });
        },

        // Request access to a course
        async requestAccess(courseId, userId) {
            const course = await Course.findOne({id: courseId});
            if (!course) throw new Error('Unknown course');

            const request = await cs.create({
                course_id: courseId,
                user_id: userId,
                activated: false,
            });

            await request.save();

            return request;
        }
    }
}
