const express = require('express');
const { Server } = require('socket.io');
const app = express();
const portNumber = 4000;
const http = require('http');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on('join_room', (data) => {
        console.log('Joining Room: ' + data)
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        console.log('Message Received in server: ' + data.message);
        socket.to(data.room).emit('receive_message', data);
    })
});


server.listen(portNumber, () => {
    console.log('Server listinging listening on localhost:' + portNumber + '...');
});