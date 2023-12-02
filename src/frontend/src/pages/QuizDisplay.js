import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button} from '@mui/material';
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

    useEffect(()=>{
        fetchGame();
    }, [gameId]);

    const handleClick = () => {
        window.location.href = `/game/${gameId}`;
    };

    return (
        <Container sx={{
            display: 'inline',
        }}>
            <button onClick={() => { window.location.href = '/lobby'; }}>U See LA</button>
            {gameData && (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography variant='h4' gutterBottom>{gameData.name}</Typography>
                <Typography variant='body1' gutterBottom sx={{
                    mt: 1,
                    mb: 1,
                }}>{gameData.description}</Typography>
                <Button onClick={handleClick} sx={{
                    fontSize: 25,
                }} gutterBottom>Play Game</Button>
            </Box>
            )}
        </Container>
    );
}

export default QuizTest;