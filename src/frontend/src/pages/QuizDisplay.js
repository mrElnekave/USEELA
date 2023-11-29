import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function QuizTest() {
    const [gameData, setGameData] = useState(null);

    const gameId = (useParams().quizId);
    
    const fetchGame = async () => {
        // Call to getGame API
        const response = await fetch(`/api/game_info/${gameId}`);
        if (!response.ok) {
            console.log("error fetching data");
            return;
        }
        const data = await response.json();
        setGameData(data);
    };

    fetchGame();

    const handleClick = () => {
        window.location.href = `/game/${gameId}`;
    };

    return (
        <div>
            {gameData && (
            <div>
                <div>
                    <h3>{gameData.name}</h3>
                    <p>{gameData.description}</p>
                </div>
                <button onClick={handleClick}>Play Game</button>
            </div>
            )}
        </div>
    );
}

export default QuizTest;