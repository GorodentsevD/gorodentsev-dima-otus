'use strict';

module.exports = (mongoose) => {
    const lessonSchema = new mongoose.Schema({
        id: Number,
        course_id: Number,
        video_url: String,
        description: String,
        name: String,
    });

    return mongoose.model('Lessons', lessonSchema);
}