'use strict';

// Service for interaction with lesson model
module.exports = (core) => {
    const Lesson = core.models.lessons;

    return {
        // Get list of lessons of course
        getCourseLessons(courseId) {
            return Lesson.find({course_id: courseId});
        },

        // Get full data of lesson (description, video and etc)
        get(id) {
            return Lesson.find({id});
        },

        async create(courseId, data) {
            const lesson = await Lesson.create({
                course_id: courseId,
                name: data.name,
                description: data.description,
                video_url: data.video_url
            });

            await lesson.save();

            return lesson;
        },

        delete(id) {
            return Lesson.deleteOne({id});
        },

        update(id, data) {
            return Lesson.updateOne({id}, data);
        }
    }
}
