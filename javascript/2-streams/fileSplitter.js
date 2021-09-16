const fs = require('fs');
const {Readable, Transform} = require('stream');
const mergeSort = require('./mergeSort');

/**
 * Transform Stream for sorting
 */
class SortTransform extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const resultString = mergeSort(chunk.toString().split(/\s+/).map(el => +el));
            callback(null, resultString.join(' '));
        } catch (err) {
            callback(err);
        }
    }
}

/**
 * Split large file to multiple files by size
 * Sort new files
 * @param {string} fileName - Name of file for splitting
 * @param {number} maxFileSize - Max file size in bytes
 * @return {ReadStream[]}
 */
const splitFile = (fileName, maxFileSize) => {
    const {size: fileBytes} = fs.statSync(fileName);

    if (fileBytes < maxFileSize) {
        return [fs.createReadStream('fileName')];
    }

    if (fs.existsSync('tmp')) { // Remove old tmp files
        fs.rmdirSync('tmp', {recursive: true});
    }

    const readStreams = []; // readStreams array of tmp files

    fs.mkdirSync('tmp'); // Create dir for temp files
    let i = 0;
    for (let start = 0; start < fileBytes; start += maxFileSize + 1, i++) {
        const readStream = fs.createReadStream('file.txt', {
            encoding: 'utf-8',
            start: start,
            end: start + maxFileSize
        });

        // Create temp file
        fs.writeFileSync(`tmp/file${i}.txt`, '');

        readStream
            //.pipe(new SortTransform) // Sort file data
            .pipe(fs.createWriteStream(`tmp/file${i}.txt`));

        readStreams.push(readStream);
    }

    for (; i >=0; i--) {
        const filePath = `tmp/file${i}.txt`;
        const fileData = fs.readFileSync(filePath).toString().split(/\s+\n?/).map(el => +el);
        const result = mergeSort(fileData);
        fs.writeFileSync(filePath, result.join(' '));
    }

    return readStreams;
};

module.exports = splitFile;