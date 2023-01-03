import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

// connects to backend server io
//! Important use your own ip address and not localhost so you can connect on phone this way too
const socket = io.connect("http://192.168.1.43:4000");

function App() {

  // room State
  const [room, setRoom] = useState("");

  // messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // runs when join room button is clicked. Calls join_room in backend, passing the room.
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // runs when send message button is clicked. Calls send_message in backend, passing the message and room.
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  // listens for a receive_message call from backend. Updates messageRecieved with the message. 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      console.log(data.message);
    })
  }, [socket])

  return (
    <div className="App">

      <h1>Web Based Game</h1>

      <input
        placeholder='Room Number'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />

      <button onClick={joinRoom}>Join Room</button>

      <br /><br />

      <input
        placeholder='Message'
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />

      <button onClick={sendMessage}>Send Message</button>

      <h1>{'Message : ' + messageReceived}</h1>
      
    </div>
  );
}

export default App;
