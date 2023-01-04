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
        //! Important use your own ip address and not localhost so you can connect on phone this way too
        origin: "http://192.168.1.43:3000",
        methods: ["GET", "POST"]
    }
});

//creates connection to a socket and listens for emits
io.on('connection', (socket) => {

    console.log(`User Connected: ${socket.id}`)

    // listens for emit and then call join on the socket to subscribe the socket to a given channel
    socket.on('join_room', (data) => {
        console.log('Joining Room: ' + data);
        socket.join(data);
    });

    // sends a message to the room of the user
    socket.on("send_message", (data) => {
        console.log('Message Received in server: ' + data.message);

        // emits a message to user listening on same room
        socket.to(data.room).emit('receive_message', data);
    })

    // to all clients in room1 example
    // io.to("room1").emit(/*...*/);
});

//-----------------
// express sample
// app.get('/', function(req, res){
//     res.send("hello world!");
// });
//-----------------  

// starts up server on portNumber
server.listen(portNumber, () => {
    console.log('Server listinging listening on localhost:' + portNumber + '...');
});