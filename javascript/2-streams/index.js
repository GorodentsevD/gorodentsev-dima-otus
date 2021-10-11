const splitFile = require('./splitFile');
const generateFile = require('./generateFile');
const fs = require('fs');

(async () => {
    const mainFileName = 'file.txt';
    const resultFileName = 'result.txt';

    if (!fs.existsSync(mainFileName)) generateFile(mainFileName);
    const subFileIterators = await splitFile(mainFileName);

    const resultFileWriteStream = fs.createWriteStream(resultFileName);

    console.log('Sort started...');

    // Init numbers collection by first numbers of sub-files
    const numbers = {};
    for (const [key, iterator] of subFileIterators.entries()) {
        const line = await iterator.next();
        if (!line.done) numbers[key] = parseInt(line.value);
    }

    while (true) {
        if (!Object.keys(numbers).length) break;

        let minVal = numbers[0], minKey = 0;
        for (let key in numbers) {
            if (minVal === undefined || numbers[key] < minVal) {
                minVal = numbers[key];
                minKey = key;
            }
        }

        const nextLine = await subFileIterators[minKey].next();
        if (nextLine.done) {
            delete numbers[minKey];
        } else {
            numbers[minKey] = parseInt(nextLine.value);
        }

        resultFileWriteStream.write(`${minVal}\n`);
    }

    resultFileWriteStream.end('\n');

    console.log(`Sort finished, result in file ${resultFileName}`);

    fs.rmdirSync('tmp', { recursive: true });
})();