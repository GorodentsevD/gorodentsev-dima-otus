'use strict';

const ws = require('ws');


module.exports = (port, mongoClient) => {
    const wss = new ws.WebSocketServer({port});

    const collection = mongoClient.db('ws-otus').collection('geo');

    wss.on('connection', ws => {
        ws.on('message', (message) => {
            const geo = JSON.parse(message.toString());
            console.log('received: ', geo);

            collection.insertOne(geo, (e, r) => {
                if (e) return console.log('Mongo insertOne error:', e)
                console.log('Geo inserted:', r);
            });
        });
        ws.send('something');
    });
}
