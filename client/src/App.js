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
    <div className="flex flex-col justify-center items-center bg-gray-200 py-4 px-6 rounded-lg shadow-lg h-screen">
      <h1 className="text-2xl font-bold text-blue-500">Web Based Game</h1>
      <input
        placeholder='Room Number'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mt-6 mb-2 inline"
      />
      <button onClick={joinRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Join Room</button>
      <br /><br />
      <input
        placeholder='Message'
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4"
      />
      <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-2">Send Message</button>
      <h1 className="text-xl font-bold text-gray-900 mt-4">{'Message : ' + messageReceived}</h1>
    </div>
  );
}

export default App;
