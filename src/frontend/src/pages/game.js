import React from 'react';
import { useState, useEffect } from 'react';
import Map from '../pages/map';
import { Button } from 'rsuite';
import { Link, useParams } from 'react-router-dom'
import '../index.css';
import {Box, Fab, Typography} from '@mui/material';
import Timer from '../components/timer';
import Navbar from '../components/Navbar'

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon /2)* Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R*c;
    d = d * 1000;
    return Promise.resolve(d);
}

function deg2rad(deg){
    return deg * (Math.PI / 180);
}

export default function GamePage() {
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

    const [rounds, setRounds] = useState(0); // default number of rounds is 5
    //const [test, setTest] = useState(2);
    const [currentRound, setCurrentRound] = useState(1);
    const [latGuessed, setLatGuessed] = useState(34.068920);
    const [lonGuessed, setLonGuessed] = useState(-118.445183);
    const [gameImages, setGameImages] = useState([]); // an array with image paths
    const [gameAnswers, setGameAnswers] = useState([]);
    const [score, setScore] = useState(0); 
    const [gameOver, setGameOver] = useState(false);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [resetTimer, setResetTimer] = useState(false);
    const [gameData, setGameData] = useState(null);
    const [countdown, setCountdown] = useState(4);
    const [showGo, setShowGo] = useState(false);


    const gameId = (useParams().gameId);

    useEffect(()=>{
        if (gameId) { 
            console.log("gameId: " + gameId);
            fetchGame();
        }else{
            // make get a random game
            console.log("no gameId");
            fetchRandomGame();
        }
    }, [gameId]);

    useEffect(()=>{
        let timer;
        if (countdown > 0){
            timer = setTimeout(()=> setCountdown(countdown-1), 1000);
        }else if (countdown === 0 && !showGo){
            setShowGo(true);
            timer = setTimeout(() => {
                //handleStartGame();
                setShowGo(false);
            }, 1000);
        }
        return ()=> clearTimeout(timer);
    }, [countdown, showGo]);
    
    useEffect(()=>{
        if (countdown === 0 && !showGo){
            handleStartGame();
        }
    },[countdown, showGo]);

    const handleStartGame = () => {
        const Image = gameData.images.map(image => image.url);
        setGameImages(Image);

        setGameAnswers(gameData.gpsData.map(gps=>({lat: gps.latitude || 34.068920, lon: gps.longtitude || -118.445183})));

        setRounds(Image.length);

        setResetTimer(prev => !prev);
    };


    const handleGuess = (latLng) => {
        setLatGuessed(latLng.lat);
        setLonGuessed(latLng.lng);
        const roundData = gameAnswers[currentRound - 1];
        getDistanceFromLatLonInM(
            latLng.lat, latLng.lng, 
            roundData.lat, roundData.lon
        ).then((res) => {
            let distance = parseInt(res);
            let points = 0;
            if (distance <= 2) {
                points = 100;
            } else if (distance <= 5 && distance > 2) {
                points = 90;
            } else if (distance <= 20 && distance > 5) {
                points = 85;
            } else if (distance <= 50 && distance > 20) {
                points = 70;
            } else if (distance <= 100 && distance > 50) {
                points = 50;
            } else if (distance <= 500 && distance > 100) {
                points = 35;
            } else if (distance <= 2500 && distance > 500) {
                points = 20;
            } else if (distance <= 7000 && distance > 2500) {
                points = 10;
            } else if (distance > 7000) {
                points = 1;
            }
            setScore(score + points);

        });

        if (currentRound < rounds) {
            setCurrentRound(currentRound + 1);
            setResetTimer(prev=>!prev);
        } else {
            setGameOver(true);
        }
    };

    function handleNewLatLng(lat, lng){
        setLatGuessed(lat);
        setLonGuessed(lng);
    }

    useEffect(() => {
        // 当 currentRound 更新时，更新背景图片 URL
        if(gameImages[currentRound - 1]) {
          setBackgroundImageUrl(gameImages[currentRound - 1]);
        }
      }, [currentRound, gameImages]);

    return (
        <Box className="gamePage">
            {!gameOver ? (
                <>
                    {gameImages.length === 0 && (
                        <Box className="countdown-container">
                            {countdown == 1
                                ? <Typography variant="h1" className="countdown-text">Go!</Typography>
                                : <Typography variant="h1" className="countdown-text">{countdown-1}</Typography>
                            }
                        </Box>
                    )}
                    
                    {gameImages.length > 0 && (
                        <Box sx={{
                            position: 'relative', // for absolute positioning of child elements
                            width: '100%', height: '100vh', // full viewport height
                            backgroundImage: `url(${backgroundImageUrl})`, // replace with your background image path
                            backgroundSize: 'cover', // cover the entire viewport
                        }}>
                            <Box sx={{
                                 position: 'absolute', top: 0, left: '50%', // Set left to 50% to start from center
                                 transform: 'translateX(-50%)', // Translate -50% to truly center the element
                                 width: 'auto', // Auto width to shrink-wrap content
                                 display: 'flex', flexDirection: 'column', alignItems: 'center', // Center children
                                 padding: '20px',
                                 zIndex: 1,
                            }}>
                                <Typography variant="h5" sx={{ color: 'black' }}>Round {currentRound} of {rounds}</Typography>
                                <Box sx={{ position: 'relative', mt: 3 }}>
                                    <Timer onTimeUp={() => handleGuess({ lat: latGuessed, lng: lonGuessed })} resetSignal={resetTimer}/>
                                </Box>
                            </Box>


                            <Box sx={{
                                position: 'absolute', bottom: '10px', right: '10px',
                                opacity: 0.3, transform: 'scale(0.5)', transformOrigin: 'bottom right', transition: 'opacity 0.3s, transform 0.3s', 
                                '&:hover':{
                                    opacity: 1,
                                    transform: 'scale(1)',
                                }
                            }}>
                                <Map newlatlng={handleNewLatLng} />
                            </Box>

                            <Box sx={{
                                position: 'absolute', bottom: '20px', left: '50%',
                                transform: 'translateX(-50%)',
                            }}>
                                <Button onClick={() => handleGuess({ lat: latGuessed, lng: lonGuessed })}>Guess and go to next round</Button>
                            </Box>

                            <Box sx={{position: 'absolute', top: '20px', right: '20px'}}>
                                <Typography variant='h6' sx={{color: 'black', mt: 1}}>Current Score: {score}</Typography>
                            </Box>
                        </Box>
                    )}
                </>
            ) : ( 
                <>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white', textAlign: 'center',
                    }}>
                        <Typography variant="h4">End of game! Your final score is: {score}</Typography>
                        <Button variant="contained" onClick={() => { window.location.href = '/lobby'; }}>Return to lobby</Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

