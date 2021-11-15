'use strict';

const fs = require('fs');
const path = require('path');

// Init services
module.exports = async (core) => {
    const servicesPath = path.join(__dirname, 'instances');
    const services = {};
    fs.readdirSync(servicesPath).forEach(file => {
        services[file.split('.')[0]] = require(`./instances/${file}`)(core);
    });

    return services;
}