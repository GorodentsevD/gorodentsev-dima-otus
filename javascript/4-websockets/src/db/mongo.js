'use strict';
const { MongoClient } = require("mongodb");

module.exports = {
    async run(mongoUrl) {
        try {
            const client = new MongoClient(mongoUrl);

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