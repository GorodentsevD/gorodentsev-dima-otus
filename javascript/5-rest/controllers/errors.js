'use strict';

class RestApiError extends Error {
    /**
     *
     * @param {string} message
     * @param {number|string} [code="unknown"]
     * @param {number} [statusCode==500]
     */
    constructor(message, code = 'unknown', statusCode = 500) {
        super(message);
        this.code = code;
        this.statusCode = statusCode
    }
}

module.exports =  {
    RestApiError
}