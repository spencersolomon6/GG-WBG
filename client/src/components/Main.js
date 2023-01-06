import React from 'react'
import { useState } from 'react';

const Main = (props) => {
    // username state
    const [username, setUsername] = useState("");

 
    // runs when join room button is clicked. Calls join_room in backend, passing the room.
    const joinRoom = () => {
        if (props.room !== "" && username !== "") {
            props.socket.emit("join_room", props.room);
            props.socket.emit("ready");
            props.setLoggedOut(false);
            props.setJoinWaitingRoom(true);
        }
    };

    const hostRoom = () => {
        if (props.room !== "" && username !== "") {
            props.socket.emit("host_room", props.room);
            props.socket.emit("ready");
            props.setLoggedOut(false);
            props.setJoinWaitingRoom(true);
            props.setHostWaitingRoom(true);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <input
                placeholder='Username'
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mt-6 mb-2 inline"
            />

            <input
                placeholder='Room Number'
                onChange={(event) => {
                    props.setRoom(event.target.value);
                }}
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mt-6 mb-2 inline"
            />

            <div>
                <button onClick={joinRoom}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Join Room
                </button>

                <button onClick={hostRoom}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Host Room
                </button>
            </div>
        </div>
    )
}

export default Main