'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = async (dbConfig) => {
    await mongoose.createConnection(dbConfig.url);

    const modelsPath = path.join(__dirname, 'models');

    const models = {};
    fs.readdirSync(modelsPath).forEach(file => {
        models[file] = require(`./models/${file}`)(mongoose);
    });

    return models;
}