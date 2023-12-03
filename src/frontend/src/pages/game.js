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
        console.log("fetching game");
        // Call to getGame API
        try{
            const response = await fetch(`/api/game_info/${gameId}`);
            if (!response.ok) {
                console.log("error fetching data");
                return;
            }
            const data = await response.json();
            console.log("data", data)
            setGameData(data);
        }
        catch (error) {
            console.log("error fetching data");
            console.log(error);
        }
    };

    const fetchRandomGame = async () => {
        // Call to randomGame API
        // suppose randomGame API's URL is '/api/game_info/random'
        const response = await fetch('/api/game_info/random');
        const data = await response.json();
        console.log("random")
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
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerPosition, setAnswerPosition] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [ddistance, setDistance] = useState(0);
    const [sendScore, setSendScore] = useState(false);

    const gameId = useParams().gameId;
    const [gameEnded, setGameEnded] = useState(false);
    useEffect(()=>{
        if (gameId) { 
            console.log("gameId: " + gameId);
            fetchGame();
        }else{
            // make get a random game
            console.log("no gameId");
            fetchRandomGame();
        }
    }, []);

    useEffect(()=>{
        if (gameOver) {
            setGameEnded(true);
        }
    }, [gameOver]);

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
        if (countdown === 0 && !showGo && gameData){
            // only if we already got the game data otherwise wait for it
            handleStartGame();
            
        }
    },[countdown, showGo, gameData]);

    useEffect (()=>{
        if (gameEnded) {
            // const userId = localStorage.getItem('userId');
            // fetch(`/api/user_info/${userId}`, {
            //     method: 'PATCH',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({score: score})
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success: ', data);
            //     setGameEnded(false);
            // })
            // .catch(error => {console.error('Error: ', error);});

            const userObj = JSON.parse(localStorage.getItem('userobj'));
            const userId = userObj.response.data._id;
            const userScore = userObj.response.data.score + score;
            userObj.response.data.score = userScore;
            localStorage.setItem('userobj', JSON.stringify(userObj));
            console.log(userObj);
            fetch(`/api/user_info/${userId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({score: userScore})
            })
            .then(response=>response.json())
            .then(data=> {console.log("Success: " + data); setGameEnded(false);})
            .catch(error => {console.error('Error: ', error);});
        }
    }, [gameEnded, score]);

    useEffect(()=>{
        if (currentRound < rounds && gameImages[currentRound]){
            setBackgroundImageUrl(gameImages[currentRound]);
        }        
    }, [currentRound, gameImages, rounds]);

    const handleStartGame = () => {
        if (!gameData || !gameData.images){
            console.log("No game data");
            return;
        }
        const ImageUrls = gameData.images.map(image => image.url);
        preloadImages(ImageUrls);
        setGameImages(ImageUrls);
        setGameAnswers(gameData.gpsData.map(gps=>({lat: gps.latitude || 34.068920, lon: gps.longitude || -118.445183})));
        setRounds(ImageUrls.length);
        setResetTimer(prev => !prev);
        if (ImageUrls.length > 0){
            setBackgroundImageUrl(ImageUrls[0]);
        }
    };

    function preloadImages(urls){
        urls.forEach(url=>{
            const img = new Image();
            img.src = url;
            img.style.display = 'none';
            document.body.appendChild(img);
        });
    }


    const handleGuess = (latLng) => {
        setLatGuessed(latLng.lat);
        setLonGuessed(latLng.lng);
        const roundData = gameAnswers[currentRound - 1];
        setAnswerPosition({lat: roundData.lat, lng: roundData.lon});
        setShowAnswer(true);

        getDistanceFromLatLonInM(
            latLng.lat, latLng.lng, 
            roundData.lat, roundData.lon
        ).then((res) => {
            let distance = parseInt(res);
            setDistance(distance);
            let points = 0;
            let newPoints = 0;

            newPoints = 100/(1+(0.01*distance)**2);
            newPoints = Math.round(newPoints);
            console.log("ans lat: " + roundData.lat + " ");
            console.log("ans lon: "+roundData.lon);
            console.log("distance: "+distance);
            console.log("guessed lat: "+latLng.lat);
            console.log("guessed lon: "+latLng.lng);
            console.log("newPoints: "+newPoints);

            setScore(score + newPoints);

        });
        setIsFullScreen(true);
        setTimeout(()=>{
            setShowAnswer(false);
            setIsFullScreen(false);
            if (currentRound < rounds) {
                setCurrentRound(currentRound + 1);
                setResetTimer(prev=>!prev);
            } else {
                setGameOver(true);
                setSendScore(prev=>!prev);
            }
        }, 3000);
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

                            backgroundImage: `url(${backgroundImageUrl})`, // TODO: get portrait images to work
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
                                <Map newlatlng={handleNewLatLng} showAnswer={showAnswer} answerPosition={answerPosition} isFullScreen={isFullScreen} dist={ddistance} />
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

