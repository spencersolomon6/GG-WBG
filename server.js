const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

// express setup
const app = express();
const portNumber = process.env.PORT || 4000;

app.use(cors());

// socket.io setup
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Makes a connection to socket.io and listens for emits
io.on('connection', (socket) => {

    console.log(`User Connected: ${socket.id}`)

    // Listens for emit and then joins the room the user inputed
    socket.on('join_room', (data) => {
        console.log('Joining Room: ' + data)
        socket.join(data);
    });

    // Sends a message to the room the user
    socket.on("send_message", (data) => {
        console.log('Message Received in server: ' + data.message);

        // Emits a message to user listening
        socket.to(data.room).emit('receive_message', data);
    })
});

// Starts up server on portNumber
server.listen(portNumber, () => {
    console.log('Server listinging listening on localhost:' + portNumber + '...');
});