import { useEffect, useState } from "react";

function Home(){
    const [games, setGames] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const res = await fetch('/api/game_info/653b3e2d51156be6c9f90a37'); 
            if (res.ok) {
                const data = [];
                data.push(
                    await res.json()
                );
                setGames(data);
            }
            
        }
        fetchGames();
    }, []); // empty array means only run once


    return (
        <div className="home">
            <h1>Home</h1>
            <p>Welcome to the barebones beta of the app, 
                it has functionality for backend to talk to frontend so we can all 
                individually work on our project peices.</p>
            <div className="Games">
                {games && games.map((game) => (
                    <div className="game" key={game._id}>
                        <h2>{game.name}</h2>
                        <p>{game.description}</p>
                        <p>psst... these are some locations</p>
                        <p>{game.actual_locations[0]}</p>
                        <p>{game.actual_locations[1]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;