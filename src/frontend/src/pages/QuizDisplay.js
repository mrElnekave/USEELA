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

    return (
        <div>
            {gameData && (
            <div>
                <h3>{gameData.name}</h3>
                <p>{gameData.description}</p>
            </div> // TODO: add play game button
            
        )}
        </div>
    );
}

export default QuizTest;