'use strict';

module.exports = (router, core) => {

    // Get course lessons
    router.get('/courses/:id/lessons', async (req, res) => {

    });

    // Get lesson data
    router.get('/courses/:id/lessons/:id', async (req, res) => {

    });


    /**
     * Create a lesson
     * @param {string} req.body.name - Name of lesson
     * @param {string} req.body.description - Description of lesson
     * @param {string} req.body.video_url - Link to video of lesson
     */
    router.post('/courses/:id/lessons', async (req, res) => {

    });

    /**
     * Change a lesson data
     * @param {string} req.body.name - Name of lesson
     * @param {string} req.body.description - Description of lesson
     * @param {string} req.body.video_url - Link to video of lesson
     */
    router.patch('/courses/:id/lessons/:id', async (req, res) => {

    });

    /**
     * Delete a lesson
     */
    router.delete('/courses/:id/lessons/:id', async (req, res) => {

    })
}