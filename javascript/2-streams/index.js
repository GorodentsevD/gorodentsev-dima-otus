const fs = require('fs');
const {Readable} = require('stream');

const fileName = 'file.txt'; // TODO: get fileName from node params
const maxFileSize = 20 * 1024 * 1024;

/**
 * Split large file to multiple files by size 
 * TODO: @return ReadStream[]
 */
const splitFile = () => {
    const {size: fileBytes} = fs.statSync(fileName);
    
    if (fileBytes / (1024 * 1024) < 20) return fs.createReadStream('fileName');


    fs.mkdirSync('tmp');
    for (let start = 0, i = 0; start < fileBytes; start += maxFileSize + 1, i++) {
        const readStream = fs.createReadStream('file.txt', {
            encoding: null,
            start: start,
            end: start + maxFileSize
        });
        
        fs.writeFileSync(`tmp/file${i}.txt`, '');

        readStream.pipe(fs.createWriteStream(`tmp/file${i}.txt`));
    }
};


splitFile();