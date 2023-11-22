import React from 'react';
import { useState } from 'react';
import Map from '../pages/map';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom'
import '../index.css';
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
    const [rounds, setRounds] = useState(5); // default number of rounds is 5
    //const [test, setTest] = useState(2);
    const [currentRound, setCurrentRound] = useState(1);
    const [latGuessed, setLatGuessed] = useState(34.068920);
    const [lonGuessed, setLonGuessed] = useState(-118.445183);
    const [gameImages, setGameImages] = useState([]); // an array with image paths
    const [gameAnswers, setGameAnswers] = useState([]);
    const [score, setScore] = useState(0); 
    const [gameOver, setGameOver] = useState(false);
    

    const handleStartGame = () => {
        setGameImages(["testPics/pic1.jpeg","testPics/pic2.jpeg","testPics/pic3.jpeg","testPics/pic4.jpeg","testPics/pic5.jpeg"]);
        // TODO: need image links in URL form

        setGameAnswers([
            {lat: 45.464664, lon: 9.188540},
            {lat:34.018116, lon:-6.835709},
            {lat:33.738045, lon:73.084488},
            {lat:-23.742489, lon:-65.491692},
            {lat:-21.178986, lon:-175.198242}

            // TODO: need answers in (latitude, longitude) form from backend 
        ]);
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
        } else {
            setGameOver(true);
        }
    };

    function handleNewLatLng(lat, lng){
        setLatGuessed(lat);
        setLonGuessed(lng);
    }

    return (
    
        <div className="gamePage">
            {/* <Navbar></Navbar> */}
            {!gameOver ? (
                <>
                    <input type="number" value={rounds} onChange={e => setRounds(e.target.value)} />
                    <Button onClick={handleStartGame}>Start</Button>
                    {gameImages.length > 0 && (
                        <>
                            <p>Round {currentRound} of {rounds}</p>
                            <img src={gameImages[currentRound - 1]} alt="Guess Location" />
                            <Map newlatlng={handleNewLatLng}/>
                            <p>Current Score: {score}</p>
                            <Button onClick={() => handleGuess({ lat: latGuessed, lng: lonGuessed })}>Guess and goto next round</Button>
                        </>
                    )}
                </>
            ) : ( 
                <div>
                <p>End of game! Your final score is: {score}</p>
                <Link to="/"><button>Return to lobby</button></Link>
                </div>
            )}
        </div>
    );
}

