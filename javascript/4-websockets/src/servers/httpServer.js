'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/public', express.static(path.join(__dirname, '..', 'static')));

app.get('/', (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname + '/../static/index.html'));
    } catch (e) {
        console.log('Express error:', e);
    }
});

module.exports = app;
