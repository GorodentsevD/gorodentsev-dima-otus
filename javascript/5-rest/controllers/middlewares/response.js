'use strict';


module.exports = res => (data, statusCode = 200) => {
    if (!data) return res.sendStatus(204);

    if (data instanceof Error) {
        return res.status(data.statusCode || 500).json({
            error: {
                code: data.code || 'unknown',
                message: data.message || 'Internal Server Error'
            }
        })
    }

    return res.status(statusCode).json(data);
};