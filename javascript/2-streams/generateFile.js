const fs = require('fs');

const min = 0;
const max = 999999999;
const fileName = 'file.txt';

/**
 * Generate string of numbers
 * @returns {string} string with 10 000 numbers, joined by space
 */
const generateNum = () => {
    const arr = [];

    for (let i = 0; i < 10000; i++) {
        arr.push('' + Math.floor(Math.random() * (max - min) + min) + ' ')
    }

    return arr.join(' ');
};

console.log('Generate/clean file...');
fs.writeFileSync(fileName, '');

console.log('Generating started...');

while (true) {
    const {size: fileBytes} = fs.statSync(fileName);
    
    if (fileBytes / (1024*1024) >= 100) {
        // file size more or equal 100 MB, stop execution
        return;
    }

    fs.appendFileSync(fileName, generateNum());
}

console.log('Generating finished');