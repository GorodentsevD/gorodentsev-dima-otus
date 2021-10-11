const fs = require('fs');

const min = 0;
const max = 999999999;

/**
 * Generate string of numbers
 * @returns {string} string with 10 000 numbers, joined by space
 */
const generateNum = () => {
    const arr = [];

    for (let i = 0; i < 1000; i++) {
        arr.push('' + Math.floor(Math.random() * (max - min) + min));
    }

    return arr.join('\n');
};

module.exports = (fileName) => {
    console.log('Generate file...');
    fs.writeFileSync(fileName, '');

    console.log('Generating started...');

    while (true) {
        const {size: fileBytes} = fs.statSync(fileName);

        if (fileBytes / (1024 * 1024) >= 100) {
            // file size more or equal 100 MB, stop execution
            break;
        }

        fs.appendFileSync(fileName, generateNum());
    }

    console.log('Generating finished');
}