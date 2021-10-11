'use strict';

const fs = require('fs');

if (!fs.existsSync('result.txt')) {
    console.log('Result file `result.txt` does not exist');
    return;
}

console.log('Result check started...')

try {
    fs.readFileSync('result.txt').toString()
        .split('\n')
        .map(str => parseInt(str))
        .reduce((p, c) => {
            if (p > c) throw new Error('Result is wrong');
            return c;
        });
} catch (e) {
    console.log(e.message);
}

console.log('Result check Success');