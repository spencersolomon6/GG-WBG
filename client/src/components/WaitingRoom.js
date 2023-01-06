import React from 'react'

const WaitingRoom = (props) => {

    const runGame = () => {
        console.log('Waiting....');
        props.socket.emit('startGame', props.room);
        props.setLoggedOut(false);
        props.setJoinWaitingRoom(false);
        props.setHostWaitingRoom(false);

    }


    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-blue-500">Waiting Room</h1>


            {props.hostWaitingRoom ? (<button onClick={runGame}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-7">
                Start Game!
            </button>) : (<div></div>)}
        </div>
    )
}

export default WaitingRoom