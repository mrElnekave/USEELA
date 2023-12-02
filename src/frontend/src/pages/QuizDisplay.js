import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button} from '@mui/material';
import { useParams } from 'react-router-dom';

function QuizTest() {
    const [gameData, setGameData] = useState(null);

    const gameId = (useParams().quizId);
    
    const fetchGame = async () => {
        // Call to getGame API
        console.log("fetching data");
        const response = await fetch(`/api/game_info/${gameId}`);
        console.log(response);
        if (!response.ok) {
            console.log("error fetching data");
            return;
        }
        const data = await response.json();
        setGameData(data);
    };

    useEffect(()=>{
        fetchGame();
    }, []);

    const handleClick = () => {
        window.location.href = `/game/${gameId}`;
    };

    return (
        <Container sx={{
            display: 'inline',
        }}>
            <button onClick={() => { window.location.href = '/lobby'; }}>U See LA</button>
            {gameData && (
            <>
            <button onClick={handleClick}>Start Game</button>
            <div>{gameData.description}</div>
            </>
            
            )}
        </Container>
    );
}

export default QuizTest;