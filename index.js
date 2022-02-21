const http = require('http');
const path = require('path');
const fs = require('fs');

let dirCatalog = '';
let fullPath = process.cwd();

function getCatalog(pth) {
    dirCatalog = ''
    const fileList = fs.readdirSync(pth);
    fileList.forEach(el => {
        dirCatalog += `<div><a href="${el}">${el}</a></div> `
    })
};

const server = http.createServer((req, res) => {
    let fileName = '';
    if (req.url === '/') {
        fullPath = process.cwd();
        getCatalog(fullPath);
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.write('<a href="/up">../</a> \n');
        res.end(`<html><body>${dirCatalog}</body></html>`);
    } else if (req.url === '/up') {
        let dirNameArr = [];
        if (fullPath !== process.cwd()) {
            dirNameArr = fullPath.split("\\");
            dirNameArr.pop();
            fullPath = dirNameArr.join("\\");
            getCatalog(fullPath);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write('<a href="/up">../</a> \n');
            res.end(`<html><body>${dirCatalog}</body></html>`);
        }
    } else {
        fileName = req.url.slice(1);
        fullPath = path.join(fullPath, fileName);
        if (fs.lstatSync(fullPath).isDirectory()) {
            getCatalog(fullPath);
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.write('<a href="/up">../</a> \n');
            res.end(`<html><body>${dirCatalog}</body></html>`);
        } else {
            const data = fs.readFileSync(fullPath, 'utf-8');
            res.end(data);
        }
        console.log(fullPath);
    }
});
server.listen(8080);