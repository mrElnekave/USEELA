import React, { useState } from 'react';

function QuizTest() {
    const [gameId, setGameId] = useState('');
    const [gameData, setGameData] = useState(null);

    const fetchGames = async () => {
        // Call to getGames API
        const response = await fetch('/api/game_info');
        const data = await response.json();
        console.log(data); // 
        setGameData(data);
    };

    const fetchGame = async () => {
        // Call to getGame API
        const response = await fetch(`/api/game_info/${gameId}`);
        const data = await response.json();
        console.log(data)
        setGameData(data);
    };

    const fetchRandomGame = async () => {
        // Call to randomGame API
        // suppose randomGame API's URL is '/api/game_info/random'
        const response = await fetch('/api/game_info/random');
        const data = await response.json();
        console.log(data)
     //   console.log(data.)
        setGameData(data);
    };

    return (
        <div>
            <button onClick={fetchGames}>Get All Games</button>
            <input 
                type="text" 
                value={gameId} 
                onChange={(e) => setGameId(e.target.value)} 
                placeholder="Enter Game ID"
            />
            <button onClick={fetchGame}>Get Game</button>
            <button onClick={fetchRandomGame}>Get Random Game</button>
            {gameData && <div>{JSON.stringify(gameData)}</div>}
            {gameData && (
            <div>
                <h3>{gameData.name}</h3>
                <p>{gameData.description}</p>
                {gameData.images && gameData.images.map((image, index) => (
                    <div key={index}>
                        <img src={image.url} alt={`Game Image ${index}`} style={{ maxWidth: "100%" }} />
                    </div>
                ))}
            </div>
        )}
        </div>
    );
}

export default QuizTest;