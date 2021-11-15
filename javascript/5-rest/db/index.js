'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = async (dbConfig) => {
    await mongoose.connect(dbConfig.url, {
        dbName: 'rest',
        autoCreate: true
    });

    const modelsPath = path.join(__dirname, 'models');

    const models = {};
    fs.readdirSync(modelsPath).forEach(file => {
        models[file.split('.')[0]] = require(`./models/${file}`)(mongoose);
    });

    return models;
}