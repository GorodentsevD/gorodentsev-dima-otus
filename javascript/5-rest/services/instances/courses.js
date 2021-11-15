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

        async get(id) {
            return Courses.findOne({id});
        },

        async update(id, data) {
            return Courses.updateOne({id}, data);
        },

        async delete(id) {
            return Courses.deleteOne({id});
        },

        async getUserCourses(userId) {
            return Courses.find({user_id: userId});
        }
    }
}
