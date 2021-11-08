'use strict';

const users = {
    '119d215b-ea7e-4272-904c-1e3375ad35d2': {
        name: 'Ivan Ivanov',
        permissions: {
            products: 15
        }
    },
    'eebc7976-27db-4d88-8a4d-11114a677b38': {
        name: 'Maria Fedorova',
        permissions: {
            products: 1
        }
    }
}

/**
 * Get user data object with permissions by auth token
 * @param {string} authToken
 * @return {object|null} user object
 */
module.exports = (authToken) => {
    return users[authToken] || null;
}