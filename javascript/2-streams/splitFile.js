const fs = require('fs');
const readline = require('readline');

/**
 *
 * @param {string} fileName
 * @param {number[]} data
 * @return AsyncIterator - readline iterator of new file
 */
const createAndWriteFile = (fileName, data) => {
    fs.writeFileSync(
        fileName,
        data.sort((a, b) => a - b).join('\n')
    );

    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    });

    console.log(`File ${fileName} created. Size: ${fs.statSync(fileName).size / (1024 * 1024)} MB`);

    return rl[Symbol.asyncIterator]();
}

/**
 * Split large file to multiple files by size
 * @param {string} fileName
 * @param {number} maxFileSizeBytes
 * @return Promise<AsyncIterator[]> - array of readline iterators of sub-files
 */
module.exports = async (fileName, maxFileSizeBytes = 20 * 1024 * 1024) => {
    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    });

    const mainFileIterator = rl[Symbol.asyncIterator]()

    if (fs.existsSync('tmp')) fs.rmdirSync('tmp', { recursive: true });

    fs.mkdirSync('tmp');

    const fileIterators = [];
    for (let i = 0; ; i++) {
        // Cycle of writing data to sub-files
        const lines = []; // Init line buffer for sub-file
        let subFileSizeBytes = 0;

        const subFileName = `tmp/file${i}.txt`;
        while (true) {
            // Cycle of reading numbers from main file
            if (subFileSizeBytes >= maxFileSizeBytes) {
                // line buffer >= maximum file size, create a new file and write line buffer to it
                fileIterators.push(createAndWriteFile(subFileName, lines.sort((a, b) => a - b)));
                break;
            }

            const line = await mainFileIterator.next();
            if (line.done) {
                // Main file is completely read, create a new file and write line buffer to it
                fileIterators.push(createAndWriteFile(subFileName, lines.sort((a, b) => a - b)));
                return fileIterators; // return sub-file AsyncIterators
            }

            subFileSizeBytes += line.value.length + 1; // Number string bytes + 1 byte (\n symbol)
            lines.push(parseInt(line.value));
        }
    }
};