'use strict';

module.exports = (router, core) => {
    /**
     * Get list of students of course
     */
    router.get('/courses/:id/students', async (req, res) => {

    });

    /**
     * Get list of requests to a course
     */
    router.get('/courses/:id/requests', async (req, res) => {

    });

    // Grant access to a course
    router.post('/courses/:id/students/:id/activate', async (req, res) => {

    });

    // Block access to a course
    router.post('/courses/:id/students/:id/deactivate', async (req, res) => {

    });

    // Request access to a course
    router.post('/courses/:id/students/request', async (req, res) => {

    });
}
