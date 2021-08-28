'use strict';
const { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://127.0.0.1:27017/');

module.exports = {
    async run() {
        try {
            // Connect the client to the server
            await client.connect();
            // Establish and verify connection
            await client.db("ws-otus").command({ping: 1});
            console.log('Connected successfully to mongodb server');

            return client;
        } catch (e) {
            console.log('Mongo connection failed: ', e);
        }
    }
}