import React, {useContext, useState, useEffect} from "react";
import Map from "./map.js";
import { GameContext } from "../providers/GameProvider.js";
const mongoose = require('mongoose');
const Quiz =  require("../../../backend/models/Quiz.js")

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2){
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon /2)* Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R*c;
    return Promise.resolve(d);
}

function deg2rad(deg){
    return deg * (Math.PI / 180);
}

export default function GamePage(props){
    // * const {currentUser} = useContext();
    const {setLocationGuessed, lonGuessed, latGuessed} = useContext(GameContext);
    
    // * const history = 
    // * const lobbyID =
    const [timeLimit, setTimeLimit] = useState(null);
    const [rounds, setRounds] = useStates(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    // * const [isParticipant, setIsParticipant] = useState(false);
    const [gameData, setGameData] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    
    // set some values for timelimits and rounds temporarily, get data from db later
    setTimeLimit(300);
    setRounds(5);
    let arrayData = []; // this array stores lats&lons of different rounds
    for (let i = 0; i < 5; i++){
        let data = {
            lat: 16*(i+1),
            lon: 32*(i+1),
        };
        arrayData.push(data);
    }
    setGameData(arrayData);
    // end temporary set

    useEffect( () => {
        if (isGameStarted){
            setCurrentTime(timeLimit-1);
        }else{
            // if the game ended, reset the data
            setCurrentRound(currentRound+1);
            setLocationGuessed(0,0);
            setCurrentTime(timeLimit);
        }
    }, [isGameStarted]);

    useEffect(() => {
        if (isGameStarted) {
          setTimeout(() => {
            // console.log('countdown currenttime : ' + currentTime);
            // Code in here
            if (currentTime == 1) {
              //handle end round
              handleEndRound();
            } else if (currentTime != timeLimit) {
              setCurrentTime(currentTime - 1);
            }
          }, 1000);
        }
      }, [currentTime]);
    
    const handleNextRound = () =>{
        setIsGameStarted(true);
    };

    const handleendRound = ()=>{
        setIsGameStarted(false);

        getDistanceFromLatLonInKm(
            parseFloat(latGuessed),
            parseFloat(lonGuessed),
            parseFloat(gameData[currentRound - 1].lat),
            parseFloat(gameData[currentRound - 1].lon)
          )
            .then((res) => {
              let distance = parseInt(res);
              let points = 0;
              let timeToAnswer = timeLimit - currentTime;
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
      
              points = points - parseInt(((timeToAnswer / timeLimit) * 100) / 5);
              if (points < 0) points = 1;
              //set current data on db
              addGuessedLoc(
                // * currentUser.uid,
                // * currentUser.username,
                // * lobbyID,
                currentRound,
                latGuessed,
                lonGuessed,
                points
              );
            })
            .then(() => {
              //check if game is finished
              if (currentRound == rounds) {
                //game is finished, show result page.
                setIsGameFinished(true);
              }
            });
    };

    return isGameFinished ? (
        // this need to be changed to:
        // <ResultScreen lobbyid={lobbyID}/>
        <p>The game is finished!</p>
        ) : gameData.length > 0 ? (
          !isGameStarted ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              {currentRound == 0 ? (
                <p style={{ fontSize: "2rem", fontFamily: "Montserrat" }}>
                  When you're ready start the game.
                </p>
              ) : (
                <p style={{ fontSize: "2rem", fontFamily: "Montserrat" }}>
                  Round {currentRound} out of {rounds}.
                </p>
              )}
              <Button onClick={handleNextRound}>Start Round</Button>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/*  Game Utilities */}
                <div
                  style={{
                    border: "1px solid black",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    width: "400px",
                    height: "50px",
                    alignItems: "center",
                    position: "absolute",
                    top: "60px",
    
                    minTop: "50px",
                    right: "0",
                    borderRadius: "0 0  0 10px",
                    zIndex: "2",
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "5px",
                    boxShadow: "0px 0px 10px -2px black",
                  }}
                >
                  <p
                    style={{
                      paddingLeft: "10px",
                      width: "40%",
                      fontSize: "1.2rem",
                      fontFamily: "Montserrat",
                      WebkitTextStroke: "1px rgba(0,0,0,0.5)",
                      color: "#4D96E5",
                    }}
                  >
                    {" "}
                    Round :{" "}
                    <span style={{ display: "inline", color: "#FF2F12" }}>
                      {currentRound}
                    </span>
                  </p>
                  <p
                    style={{
                      paddingRight: "10px",
                      width: "60%",
                      marginTop: "0px",
                      fontSize: "1.2rem",
                      fontFamily: "Montserrat",
                      WebkitTextStroke: "1px rgba(0,0,0,0.5)",
                      color: "#4D96E5",
                    }}
                  >
                    {" "}
                    Time remaining :{" "}
                    <span style={{ display: "inline", color: "#FF2F12" }}>
                      {currentTime}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    zIndex: "2",
                    position: "absolute",
                    right: "15px",
                    bottom: "330px",
                  }}
                >
                  {currentRound == rounds ? (
                    <Button
                      style={{
                        fontSize: "1.5em",
                        marginTop: "5px",
                        boxShadow: "0px 3px 10px  black",
                      }}
                      color="red"
                      onClick={handleEndRound}
                    >
                      Finish Game
                    </Button>
                  ) : (
                    <Button
                      style={{
                        fontSize: "1.5em",
                        marginTop: "5px",
                        boxShadow: "0px 3px 10px  black",
                      }}
                      color="blue"
                      onClick={handleEndRound}
                    >
                      Next Round
                    </Button>
                  )}
                </div>
                {
                  <MapWrapper
                    lat={gameData[currentRound - 1].lat}
                    lon={gameData[currentRound - 1].lon}
                  />
                }
              </div>
            </>
          )
        ) : (
          <p>Loading...</p>
    );
}