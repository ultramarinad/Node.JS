const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

let userList = [];

io.on('connection', (client) => {
    let userName = '';
    client.on('userNameConnect', (name) => {
        userName = name;
        userList.push(userName);
        const data = {
            message: `User ${userName} has connected`
        }

        client.broadcast.emit('server-msg', data);
        client.emit('user-check', userList)
        client.broadcast.emit('user-check', userList);
    });

    client.on('disconnect', () => {
        const data = {
            message: `User ${userName} has disconnected`
        }

        client.broadcast.emit('server-msg', data);
        userList.splice(userList.indexOf(userName), 1)
        client.emit('user-check', userList)
        client.broadcast.emit('user-check', userList);
    });

    client.on('reconnect', () => {
        client.broadcast.emit('server-msg', data);
    });

    client.on('client-msg', (data) => {
        client.broadcast.emit('user-msg', data);
        client.emit('user-msg', data);
    });

});

server.listen(8080);