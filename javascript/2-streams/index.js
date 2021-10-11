const splitFile = require('./splitFile');
const fs = require('fs');

/**
 * Prevents backpressure when writing to stream
 * @param {NodeJS.WritableStream} writer
 * @param {string} data
 * @return {Promise<void>}
 */
const write = (writer, data) =>
    new Promise((resolve) => !writer.write(data) ? writer.once('drain', resolve) : resolve());

(async () => {
    const mainFileName = 'file.txt';
    const resultFileName = 'result.txt';

    if (!fs.existsSync(mainFileName)) {
        console.log('File file.txt does not exist');
        return;
    }

    console.log('File splitting started...');
    const subFileIterators = await splitFile(mainFileName);
    console.log('File splitting success');

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

        await write(resultFileWriteStream, `${minVal}\n`);
    }

    resultFileWriteStream.end('\n');
    fs.rmdirSync('tmp', {recursive: true});
    console.log(`Sort finished, tmp files removed, result in file ${resultFileName}.\nUse "npm run-script testResult" for check result`);
})();