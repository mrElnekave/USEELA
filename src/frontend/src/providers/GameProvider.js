// This file provides game start data
import React, {createContext, useState} from "react";
//import {db} from 
// import locations from
export const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [lonGuessed, setLonGuessed] = useState(0);
    const [latGuessed, setLatGuessed] = useState(0);

    const setLocationGuessed = (lat, lon) =>{
        setLonGuessed(lon);
        setLatGuessed(lat);
    };

    return (
        <GameContext.Provider 
            value={{
                lonGuessed,
                latGuessed,
                setLocationGuessed,
            }}
        >
            {children}
        </GameContext.Provider>
    )
};
