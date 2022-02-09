const fs = require('fs');
const { Transform } = require('stream');
const ACCESS_LOG = './access.log';
const ip = [
    '89.123.1.41',
    '34.48.240.111'
]

const searchIp = fs.createSearchIp(ACCESS_LOG, 'utf-8')
ip.forEach(element => {
    const writeIp = fs.createWriteIp(`${element}_requests.log`, {
        encoding: 'utf-8',
        flags: 'a',
    })
    const transformIp = new Transform({
        transform(chunk, encoding, callback) {
            const transformedData = chunk.toString().match(new RegExp(`^${element}(.+)$`, 'gm'));

            transformedData.forEach(el => {
                this.push(el + '\n')
            })
            callback();
        }
    })
    searchIp.pipe(transformIp).pipe(writeIp);
});