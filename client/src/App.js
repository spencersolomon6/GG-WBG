import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Main from './components/Main';
import Game from './components/Game';
import WaitingRoom from './components/WaitingRoom';

//! Important - when trying to test on mobile use your own ip address and not localhost
const DOMAIN = 'http://localhost:4000'

// connects to backend server io
const socket = io.connect(DOMAIN);

function App() {

  // loggedout state
  const [loggedOut, setLoggedOut] = useState(true);

  // waiting room states
  const [joinWaitingRoom, setJoinWaitingRoom] = useState(false);
  const [hostWaitingRoom, setHostWaitingRoom] = useState(false);

  // game state
  const [startGame, setStartGame] = useState(false);
  const [winner, setWinner] = useState("");

  // room state
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on('winner', (w) => {
      setWinner(w);
    })

    socket.on('start', () => {
      setStartGame(true);
      setJoinWaitingRoom(false);
      setHostWaitingRoom(false);
      setLoggedOut(false);
    })
  }, [socket])

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 py-4 px-6 rounded-lg shadow-lg h-screen">

      {loggedOut ? (
        <div>
          <h1 className="text-4xl font-bold text-blue-500">Web Based Game</h1>
          <Main 
            socket={socket}
            room = {room}
            setRoom={setRoom}
            setLoggedOut={setLoggedOut}
            setJoinWaitingRoom={setJoinWaitingRoom}
            setHostWaitingRoom={setHostWaitingRoom} />
        </div>
      ) : (<div></div>)}

      {joinWaitingRoom ? (<WaitingRoom

        socket={socket} 
        room={room}
        setRoom={setRoom}
        hostWaitingRoom={hostWaitingRoom}  
        setLoggedOut = {setLoggedOut}
        setStartGame = {setStartGame}
        setJoinWaitingRoom = {setJoinWaitingRoom}
        setHostWaitingRoom = {setHostWaitingRoom}

        />) : (<div></div>)}

      {startGame ? (<Game socket={socket}
        startGame={startGame}
        setStartGame={setStartGame}
        setLoggedOut={setLoggedOut}
        setJoinWaitingRoom={setJoinWaitingRoom}
        setHostWaitingRoom={setHostWaitingRoom} 
        setWinner={setWinner}
        winner={winner}
        />
      ) : (<div></div>)}
    </div>
  );
}

export default App;
