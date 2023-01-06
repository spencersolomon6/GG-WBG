import React from 'react'
import { useEffect, useState } from 'react';

const Game = (props) => {
    
    // game states
    const [gameNumber, setGameNumber] = useState(0);
    const [gameOver, setGameOver] = useState(false);
  
    // Game "Loop"
    useEffect(() => {
        if (!gameOver && props.startGame) {
            const interval = setInterval(() => {
                let newNumber = gameNumber;
                if (newNumber === -10) {
                    newNumber += 1;
                } else {
                    if (Math.random() < 0.5) {
                        newNumber++;
                    } else {
                        newNumber--;
                    }
                }
                setGameNumber(newNumber);
                if (newNumber === 5) {
                    setGameOver(true);
                    props.setWinner(props.socket.id);
                    props.socket.emit('winner', props.winner);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameNumber, gameOver]);

    return (
        <div className='flex flex-col justify-center items-center'>


            <h1 className="text-5xl font-bold text-gray-900 mt-4">
                {'Score: ' + gameNumber}
            </h1>

            {gameOver ? (<div>
                <h1 className="text-2xl font-bold text-gray-900 mt-4">Game Over!</h1>
                <h1 className="text-2xl font-bold text-gray-900 mt-4">{props.winner === props.socket.id ? `You win!` : `You Lost! Player ${props.winner} won.`}</h1>
            </div>
            ) : (<div></div>)}

        </div>
    )
}

export default Game