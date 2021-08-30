'use strict';

const EXPRESS_PORT = 8081;
const WEBSOCKET_PORT = 8082;
const MONGO_URL = 'mongodb://127.0.0.1:27017/';

const fs = require('fs');
const path = require('path');

const cert = fs.readFileSync(path.resolve(__dirname + '/../keys/cert.pem'));
const key = fs.readFileSync(path.resolve(__dirname + '/../keys/key.pem'));

let mongoClient;

async function start() {
    // Create mongo connection
    mongoClient = await require('./db/mongo').run(MONGO_URL);

    // Start Express server
    const app = require('./servers/httpServer');
    const server = require('https').createServer({cert, key}, app);

    // Start Websocket server
    require('./servers/wsServer')(WEBSOCKET_PORT, mongoClient);

    server.listen(EXPRESS_PORT, () => console.log(`Server started on ${EXPRESS_PORT} port`));
}

start().catch(e => console.log('Error:', e));

process.on('exit', () => mongoClient && mongoClient.close());