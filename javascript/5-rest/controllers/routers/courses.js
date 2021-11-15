'use strict';

const {RestApiError} = require('../errors');

module.exports = (router, core) => {
    const Courses = core.services.courses;

    const auth = require('../middlewares/auth')(core);

    // Get course data
    router.get('/courses/:id', auth, async (req, res) => {
        try {
            
            const course = await Courses.get(req.params.id);
            if (!course) return res.response(new RestApiError('Course not found', 'not_found', 404));
            return res.response(course);
        } catch (e) {
            console.log(e);
            return res.response(e);
        }
    });

    /**
     * Create a course
     * @param {string} req.body.name
     * @param {string} req.body.description
     */
    router.post('/courses', async (req, res) => {
        try {
            const course = await Courses.create(req.body);
            return res.response(course);
        } catch (e) {
            return res.response(e);
        }
    });

    /**
     * Change course data
     */
    router.patch('/courses/:id', async (req, res) => {
        try {
            await Courses.update(req.body);
            res.response(null);
        } catch (e) {
            res.response(e);
        }
    });

    /**
     * Delete a course with it lessons
     */
    router.delete('/courses/:id', async (req, res) => {
        try {
            // todo: permissions
            await Courses.delete(req.params.id);
            res.response(null);
        } catch (e) {
            res.response(e);
        }
    });
}
