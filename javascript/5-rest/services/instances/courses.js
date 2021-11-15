'use strict';

// Service for interaction with courseStudents model
module.exports = (core) => {
    const Courses = core.models.courses;

    return {
        async create(data, creatorId) {
            const course = await Courses.create({
                user_id: creatorId,
                name: data.name,
                description: data.description
            });

            await course.save();

            return course;
        },

        get(id) {
            return Courses.findOne({id});
        },

        async update(id, data) {
            return Courses.updateOne({id}, data);
        },

        delete(id) {
            return Courses.deleteOne({id});
        },

        getUserCourses(userId) {
            return Courses.find({user_id: userId});
        }
    }
}
