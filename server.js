const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const { randomUUID } = require('crypto');

//! Important - when trying to test on mobile use your own ip address and not localhost
const DOMAIN = 'http://localhost:3000'

// express setup
const app = express();
const portNumber = process.env.PORT || 4000;

app.use(cors());

// socket.io setup
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: DOMAIN,
        methods: ["GET", "POST"]
    }
});

// Instance Variables

const rooms = {};

//creates connection to a socket and listens for emits
io.on('connection', (socket) => {

    console.log(`User Connected: ${socket.id}`)

    // host a room
    socket.on('host_room', (roomName) => {
        console.log(`Host room: ` + roomName);
        socket.join(roomName);
    
    })

    // listens for emit and then call join on the socket to subscribe the socket to a given channel
    socket.on('join_room', (roomName) => {
        console.log('Joining Room: ' + roomName);
        socket.join(roomName);
    });

    socket.on('ready', () => {
        console.log(socket.id, 'is ready!');
    })

    socket.on('startGame', (room) => {
        console.log(socket.id, 'is starting a game!');
        io.in(room).emit('start');
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// starts up server on portNumber
server.listen(portNumber, () => {
    console.log('Server listinging listening on localhost:' + portNumber + '...');
});