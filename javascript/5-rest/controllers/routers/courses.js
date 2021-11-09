'use strict';

module.exports = (router, core) => {

    // Get course data
    router.get('/courses/:id', async (req, res) => {

    });

    /**
     * Create a course
     * @param {string} req.body.name
     * @param {string} req.body.description
     */
    router.post('/courses', async (req, res) => {

    });

    /**
     * Change course data
     */
    router.patch('/courses/:id', async (req, res) => {

    });

    /**
     * Delete a course with it lessons
     */
    router.delete('/courses/:id', async (req, res) => {

    });
}
